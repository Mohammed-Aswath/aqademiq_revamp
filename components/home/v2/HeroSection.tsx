"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { IceTimer } from "@/components/ds";
import { useApp } from "@/components/site/AppProvider";
import { APP_URL } from "@/lib/config";
import { PrismEngine, PRISM_MODES, PRISM_MODE_KEYS, type PrismModeKey } from "@/lib/prism-engine";
import s from "./home.module.css";

/*
 * Hero (Home.dc.html section 1) plus the trust-badge strip that follows it in
 * the design (a plain <div>, not a <section>, so section indices stay aligned).
 *
 * The player is a 20-second taste of a focus session: the cube melts while a
 * Prism soundscape plays (lib/prism-engine.ts, as in V1's hero). Nothing plays
 * until the visitor taps. Scrolling the hero away or hiding the tab pauses a
 * running session, and unmounting closes the audio graph.
 */

type Status = "idle" | "playing" | "paused" | "done";
const DUR = 20; // seconds
const TICK_MS = 55;
const RM_QUERY = "(prefers-reduced-motion: reduce)";

function domReducedMotion(): boolean {
  try {
    if (document.documentElement.getAttribute("data-reduce-motion") === "true") return true;
  } catch {}
  return !!(window.matchMedia && window.matchMedia(RM_QUERY).matches);
}

function subscribeReducedMotion(cb: () => void): () => void {
  if (!window.matchMedia) return () => {};
  const mq = window.matchMedia(RM_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** The design's reduced(): the comfort toggle OR the OS preference. */
function useReducedMotion(): boolean {
  const { reduce } = useApp();
  const os = useSyncExternalStore(
    subscribeReducedMotion,
    () => !!(window.matchMedia && window.matchMedia(RM_QUERY).matches),
    () => false,
  );
  return reduce || os;
}

function modeBtnStyle(k: PrismModeKey, on: boolean): CSSProperties {
  const mm = PRISM_MODES[k];
  return {
    padding: "7px 13px",
    borderRadius: 100,
    fontSize: 12.5,
    fontWeight: 700,
    fontFamily: "var(--font-sans)",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "all .2s",
    border: `1.5px solid ${on ? mm.color : "rgba(0,0,0,.1)"}`,
    background: on ? mm.color + "1c" : "#fff",
    color: on ? (k === "winddown" || k === "nosound" ? "#57534d" : mm.color) : "#736f68",
  };
}

const badgeBase: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "9px 16px",
  background: "#fff",
  border: "1px solid rgba(0,0,0,.06)",
  borderRadius: 100,
  fontSize: 13.5,
  boxShadow: "0 2px 10px rgba(0,0,0,.04)",
};
const badgeIcon: CSSProperties = { ...badgeBase, gap: 7, fontWeight: 600, color: "#45423d" };

export function HeroSection() {
  const { openGetApp } = useApp();
  const red = useReducedMotion();

  const [mode, setModeState] = useState<PrismModeKey>("deepwork");
  const [status, setStatusState] = useState<Status>("idle");
  const [progress, setProgressState] = useState(0);
  const [audioLoading, setAudioLoading] = useState(false);

  // Mirrors of state for the timer / observer callbacks, which outlive a render.
  const modeRef = useRef(mode);
  const statusRef = useRef(status);
  const progressRef = useRef(progress);

  const sectionRef = useRef<HTMLElement>(null);
  const bloomRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<PrismEngine | null>(null);
  const startingRef = useRef(false); // engine.start() in flight (stems loading)
  const startedRef = useRef(false); // engine.start() has resolved once
  const loopRef = useRef<number | null>(null);
  const wakeRef = useRef<number | null>(null);
  const sessionStartRef = useRef(0);
  const mountedRef = useRef(false);

  const setMode = (m: PrismModeKey) => {
    modeRef.current = m;
    setModeState(m);
  };
  const setStatus = (st: Status) => {
    statusRef.current = st;
    setStatusState(st);
  };
  const setProgress = (p: number) => {
    progressRef.current = p;
    setProgressState(p);
  };

  useEffect(() => {
    mountedRef.current = true;
    // Restore the last sound mode the visitor picked.
    try {
      const saved = localStorage.getItem("aq-mode") as PrismModeKey | null;
      if (saved && PRISM_MODES[saved]) setMode(saved);
    } catch {}

    // Scrolling the hero away, or hiding the tab, pauses a running session.
    let io: IntersectionObserver | null = null;
    const heroEl = sectionRef.current;
    if (heroEl && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (es) => {
          es.forEach((e) => {
            if (!e.isIntersecting && statusRef.current === "playing") pauseSession();
          });
        },
        { threshold: 0.12 },
      );
      io.observe(heroEl);
    }
    const onVis = () => {
      if (document.hidden && statusRef.current === "playing") pauseSession();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      mountedRef.current = false;
      stopLoop();
      if (wakeRef.current) clearTimeout(wakeRef.current);
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      // Silence now, close once the engine's own pending timers (a mode
      // crossfade swaps its loop 450ms later) have run against a live context.
      const eng = engineRef.current;
      engineRef.current = null;
      if (eng) {
        if (eng.ctx) eng.pause();
        window.setTimeout(() => eng.close(), 500);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── audio ─────────────────────────────────────────────────────────────
  function ensureEngine(): PrismEngine {
    if (!engineRef.current) {
      engineRef.current = new PrismEngine();
      startedRef.current = false;
      startingRef.current = false;
    }
    return engineRef.current;
  }
  function setBloomColor(m: PrismModeKey) {
    const el = bloomRef.current;
    if (!el) return;
    const c = PRISM_MODES[m].color;
    el.style.background = `radial-gradient(circle, ${c}44, rgba(159,214,239,.12) 46%, transparent 70%)`;
  }
  /** Bring the engine in line with the current status + mode after an async start. */
  function syncEngine(eng: PrismEngine) {
    if (engineRef.current !== eng) return;
    const mm = PRISM_MODES[modeRef.current];
    if (statusRef.current !== "playing") eng.pause();
    else if (!mm.params) eng.setMasterGain(0.0001, 0.5);
    else eng.setMode(mm.params);
  }
  /**
   * The engine's pause()/stop() suspend the context on a timer that does not
   * know about a later resume, so a quick pause → resume can be silenced by it.
   * Wake the context back up once those timers have run.
   */
  function keepAwake(eng: PrismEngine) {
    if (wakeRef.current) clearTimeout(wakeRef.current);
    wakeRef.current = window.setTimeout(() => {
      wakeRef.current = null;
      if (engineRef.current === eng && statusRef.current === "playing" && eng.ctx?.state === "suspended") {
        eng.ctx.resume().catch(() => {});
      }
    }, 800);
  }
  /** Start (or bring back) the soundscape for a mode; loads the stems on first use. */
  function playAudio(m: PrismModeKey) {
    const mm = PRISM_MODES[m];
    if (!mm.params) return;
    const eng = ensureEngine();
    setBloomColor(m);
    if (startingRef.current) return; // syncEngine applies the latest mode when loading ends
    if (startedRef.current) {
      eng.resume().catch(() => {});
      eng.setMode(mm.params);
      keepAwake(eng);
      return;
    }
    startingRef.current = true;
    if (!eng.isLoaded) setAudioLoading(true);
    eng
      .start(mm.params)
      .then(() => {
        if (engineRef.current !== eng) return;
        startedRef.current = true;
        syncEngine(eng);
      })
      .catch(() => {})
      .finally(() => {
        if (engineRef.current === eng) startingRef.current = false;
        if (mountedRef.current) setAudioLoading(false);
      });
  }
  function setBloom(a: number) {
    const el = bloomRef.current;
    if (!el) return;
    if (domReducedMotion()) {
      el.style.transform = "translate(-50%,-50%) scale(1)";
      el.style.opacity = "0.4";
      return;
    }
    const sc = 0.85 + a * 0.55;
    el.style.transform = `translate(-50%,-50%) scale(${sc})`;
    el.style.opacity = String(0.32 + a * 0.42);
  }

  // ── session ───────────────────────────────────────────────────────────
  function stopLoop() {
    if (loopRef.current) {
      clearInterval(loopRef.current);
      loopRef.current = null;
    }
  }
  function startLoop() {
    stopLoop();
    loopRef.current = window.setInterval(tick, TICK_MS);
  }
  function tick() {
    const now = performance.now();
    const p = Math.min(1, (now - sessionStartRef.current) / (DUR * 1000));
    const eng = engineRef.current;
    const a = modeRef.current !== "nosound" && eng && startedRef.current ? eng.readAmp() : null;
    const amp = a != null ? a : 0.34 + 0.22 * Math.sin(now / 850);
    setBloom(amp);
    if (!domReducedMotion() && Math.abs(p - progressRef.current) >= 0.004) setProgress(p);
    if (p >= 1) completeSession();
  }
  function startSession() {
    playAudio(modeRef.current);
    sessionStartRef.current = performance.now() - progressRef.current * DUR * 1000;
    setStatus("playing");
    startLoop();
  }
  function pauseSession() {
    stopLoop();
    if (startedRef.current) engineRef.current?.pause();
    setStatus("paused");
  }
  function resumeSession() {
    sessionStartRef.current = performance.now() - progressRef.current * DUR * 1000;
    setStatus("playing");
    playAudio(modeRef.current);
    startLoop();
  }
  function completeSession() {
    stopLoop();
    if (startedRef.current) engineRef.current?.stop();
    setStatus("done");
    setProgress(1);
  }
  function resetSession() {
    stopLoop();
    if (startedRef.current) engineRef.current?.stop();
    setStatus("idle");
    setProgress(0);
    setBloom(0.25);
  }
  function onPlay() {
    const st = statusRef.current;
    if (st === "idle") startSession();
    else if (st === "playing") pauseSession();
    else if (st === "paused") resumeSession();
    else resetSession();
  }
  function selectMode(m: PrismModeKey) {
    setMode(m);
    try {
      localStorage.setItem("aq-mode", m);
    } catch {}
    setBloomColor(m);
    if (statusRef.current !== "playing") return; // a paused session picks the mode up on resume
    if (PRISM_MODES[m].params) playAudio(m);
    else if (startedRef.current) engineRef.current?.setMasterGain(0.0001, 0.5); // "No sound"
  }

  // ── render values (the design's renderVals) ───────────────────────────
  const m = PRISM_MODES[mode];
  const heroProgress = red ? 0 : progress;
  const frostOn = status === "paused" || (red && status !== "idle");
  const dripOn = status === "playing" && !red;
  const cubeExpr = status === "playing" ? "focused" : "happy";
  const playIcon = status === "playing" ? "pause" : status === "done" ? "replay" : "play_arrow";
  const playIconNudge = status === "playing" || status === "done" ? "0" : "3px";
  const playLabel =
    status === "playing"
      ? "Pause"
      : status === "paused"
        ? "Resume"
        : status === "done"
          ? "Play again"
          : mode === "nosound"
            ? "Try a quiet 20 seconds"
            : `Try 20 seconds of ${m.label}`;
  const caption =
    status === "playing"
      ? audioLoading && mode !== "nosound"
        ? "Warming up the sound…"
        : mode === "nosound"
          ? "Just you and the cube."
          : `${m.label}. The room goes quiet.`
      : status === "paused"
        ? "Frozen. Pick up when you’re ready."
        : status === "done"
          ? "That’s one mode of many."
          : "Nothing plays until you tap.";

  return (
    <>
      <section
        ref={sectionRef}
        id="aqHero"
        style={{
          position: "relative",
          padding: "clamp(44px,7vh,84px) clamp(20px,6vw,60px) clamp(56px,8vh,96px)",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "8%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(760px,92vw)",
            height: 520,
            background: "radial-gradient(circle,rgba(107,92,240,.1),transparent 64%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative" }} data-reveal="">
          <a className={s["aq-announce"]} href="#v2">
            <span className={s["aq-new"]}>New</span>
            <span>App freeze, Live Activities, The Core and more</span>
            <span className="material-icons-outlined" aria-hidden="true" style={{ fontSize: 17, color: "#5941d6" }}>
              arrow_forward
            </span>
          </a>
          <h1
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 800,
              fontSize: "clamp(2.5rem,6vw,4.6rem)",
              lineHeight: 1.02,
              letterSpacing: "-.032em",
              margin: "0 0 20px",
              color: "#14130f",
              textWrap: "balance",
            }}
          >
            The calm study planner that helps you actually start.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.1rem,1.5vw,1.35rem)",
              lineHeight: 1.5,
              color: "#4a4742",
              maxWidth: 600,
              margin: "0 auto 28px",
              fontWeight: 500,
            }}
          >
            Freeze the apps that pull you away. Then a melting-cube timer, focus soundscapes and an AI that breaks
            the work down help you begin.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <a
              href={APP_URL}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                padding: "16px 32px",
                background: "#111",
                color: "#fff",
                borderRadius: 100,
                fontWeight: 800,
                fontSize: 16.5,
              }}
            >
              Start studying free
            </a>
            <button
              type="button"
              onClick={openGetApp}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "16px 28px",
                background: "transparent",
                color: "#14130f",
                border: "1.5px solid rgba(20,19,15,.18)",
                borderRadius: 100,
                fontWeight: 700,
                fontSize: 15.5,
                fontFamily: "var(--font-sans)",
                cursor: "pointer",
              }}
            >
              Get the app
            </button>
          </div>
        </div>

        <div
          style={{
            maxWidth: 520,
            margin: "clamp(36px,5vh,60px) auto 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
            position: "relative",
          }}
          data-reveal=""
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 320,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              ref={bloomRef}
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 340,
                height: 340,
                transform: "translate(-50%,-50%) scale(.9)",
                background: "radial-gradient(circle,rgba(107,92,240,.30),rgba(159,214,239,.13) 46%,transparent 70%)",
                filter: "blur(20px)",
                opacity: 0.4,
                borderRadius: "50%",
                pointerEvents: "none",
              }}
            />
            <div data-breathe={status === "idle" ? "true" : "false"} style={{ position: "relative" }}>
              <IceTimer progress={heroProgress} frost={frostOn} drip={dripOn} expr={cubeExpr} size={300} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button
              type="button"
              onClick={onPlay}
              aria-label={playLabel}
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                border: "none",
                background: "#111",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 28px rgba(0,0,0,.2)",
                flexShrink: 0,
              }}
            >
              <span className="material-icons-outlined" aria-hidden="true" style={{ fontSize: 28, marginLeft: playIconNudge }}>
                {playIcon}
              </span>
            </button>
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  letterSpacing: ".04em",
                  color: "#14130f",
                  fontWeight: 600,
                }}
              >
                {playLabel}
              </div>
              <div style={{ fontSize: 13, color: "#8e8a83", lineHeight: 1.4, maxWidth: 240 }} aria-live="polite">
                {caption}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, justifyContent: "center" }}>
            {PRISM_MODE_KEYS.map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={k === mode}
                onClick={() => selectMode(k)}
                style={modeBtnStyle(k, k === mode)}
              >
                {PRISM_MODES[k].label}
              </button>
            ))}
          </div>
          {status === "done" && (
            <a
              href={APP_URL}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "11px 22px",
                background: "#6b5cf0",
                color: "#fff",
                borderRadius: 100,
                fontWeight: 800,
                fontSize: 14,
              }}
            >
              That&apos;s one mode. Start free
            </a>
          )}
        </div>
      </section>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 clamp(20px,6vw,60px) clamp(16px,3vh,32px)" }}>
        <div data-reveal="" style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
          <span style={{ ...badgeBase, gap: 8, fontWeight: 700, color: "#14130f" }}>
            <span style={{ fontFamily: "var(--font-mono)" }}>1,000+</span> students
          </span>
          <span style={badgeIcon}>
            <span className="material-icons-outlined" aria-hidden="true" style={{ fontSize: 16, color: "#5941d6" }}>
              psychology
            </span>
            Built on behavioral psychology
          </span>
          <span style={badgeIcon}>
            <span className="material-icons-outlined" aria-hidden="true" style={{ fontSize: 16, color: "#2a9d6b" }}>
              block
            </span>
            Ad-free
          </span>
        </div>
      </div>
    </>
  );
}
