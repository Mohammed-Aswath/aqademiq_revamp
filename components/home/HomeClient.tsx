"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AdaCube, IceTimer, TaskCard } from "@/components/ds";
import { useApp } from "@/components/site/AppProvider";
import { APP_URL } from "@/lib/config";
import { AudioEngine, MODES, MODE_KEYS, type ModeKey } from "@/lib/audio-engine";
import { testiRows, type TestimonialCard } from "@/lib/testimonials";
import { useReveal } from "@/lib/useReveal";
import styles from "./Home.module.css";

type Status = "idle" | "playing" | "paused" | "done";
const DUR = 20;

// Deterministic marquee data — computed once, never changes.
const ROW1: TestimonialCard[] = testiRows(0);
const ROW2: TestimonialCard[] = testiRows(5);

function domReducedMotion(): boolean {
  try {
    if (document.documentElement.getAttribute("data-reduce-motion") === "true") return true;
  } catch {}
  return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}

const plink = (href: string, label: string) => (
  <Link className={styles.plink} href={href} style={{ fontSize: 15.5 }}>
    {label}{" "}
    <span className="material-icons-outlined" style={{ fontSize: 18 }}>
      arrow_forward
    </span>
  </Link>
);

const heading2: CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontWeight: 800,
  fontSize: "clamp(1.9rem,3.6vw,2.9rem)",
  letterSpacing: "-.028em",
  lineHeight: 1.07,
  margin: "0 0 16px",
  color: "#14130f",
  textWrap: "balance",
};
const eyebrow: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  letterSpacing: ".14em",
  textTransform: "uppercase",
  color: "#8e8a83",
  fontWeight: 600,
  marginBottom: 14,
};
const lead: CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "clamp(1.02rem,1.3vw,1.18rem)",
  lineHeight: 1.55,
  color: "#4a4742",
  margin: "0 0 20px",
  maxWidth: 440,
};
const groupLabel: CSSProperties = {
  fontSize: 10,
  fontWeight: 800,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "#a8a49c",
  marginBottom: 8,
};

function modeBtnStyle(k: ModeKey, on: boolean): CSSProperties {
  const mm = MODES[k];
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

function TestiCard({ t }: { t: TestimonialCard }) {
  return (
    <div
      className={styles.tcard}
      style={{
        flexShrink: 0,
        width: 338,
        marginRight: 18,
        background: "#fff",
        border: "1px solid rgba(0,0,0,.06)",
        borderRadius: 20,
        padding: 26,
        boxShadow: "0 2px 16px rgba(0,0,0,.05)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <span
        className="material-icons-outlined"
        style={{ fontSize: 30, color: "rgba(107,92,240,.24)", marginBottom: 4 }}
      >
        format_quote
      </span>
      <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className="material-icons-outlined" style={{ fontSize: 16, color: "#e8a430" }}>
            star
          </span>
        ))}
      </div>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 14.5,
          lineHeight: 1.6,
          color: "#3f3d3a",
          margin: "0 0 20px",
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        “{t.quote}”
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto" }}>
        <Image
          src={t.image}
          alt={t.name}
          width={42}
          height={42}
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            objectFit: "cover",
            flexShrink: 0,
            background: "var(--aq-periwinkle-soft)",
          }}
        />
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontWeight: 800,
              fontSize: 14.5,
              color: "#14130f",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {t.name}
          </div>
          <div
            style={{
              fontSize: 12.5,
              color: "#736f68",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {t.major}
          </div>
          <div
            style={{
              fontSize: 12.5,
              color: "#a8a49c",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {t.university}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomeClient() {
  const { openGetApp, reduce } = useApp();

  const [mode, setModeState] = useState<ModeKey>("deepwork");
  const [status, setStatusState] = useState<Status>("idle");
  const [progress, setProgressState] = useState(0);
  const [demoProgress, setDemoProgress] = useState(0);
  const [demoDone, setDemoDone] = useState(false);
  const [adaStep, setAdaStep] = useState(0);

  const modeRef = useRef(mode);
  const statusRef = useRef(status);
  const progressRef = useRef(progress);
  const engineRef = useRef<AudioEngine | null>(null);
  const bloomRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<number | null>(null);
  const sessionStartRef = useRef(0);
  const demoTRef = useRef<number | null>(null);

  useReveal({ threshold: 0.12, rootMargin: "-6%" });

  const setMode = (m: ModeKey) => {
    modeRef.current = m;
    setModeState(m);
  };
  const setStatus = (s: Status) => {
    statusRef.current = s;
    setStatusState(s);
  };
  const setProgress = (p: number) => {
    progressRef.current = p;
    setProgressState(p);
  };

  useEffect(() => {
    // Restore saved sound mode.
    try {
      const m = localStorage.getItem("aq-mode") as ModeKey | null;
      if (m && MODES[m]) setMode(m);
    } catch {}

    // The two scroll-triggered demos + hero auto-pause + tab-hidden auto-pause.
    const observers: IntersectionObserver[] = [];
    const meltEl = document.getElementById("aqMeltDemo");
    if (meltEl) {
      const o = new IntersectionObserver(
        (es, ob) => {
          es.forEach((e) => {
            if (e.isIntersecting) {
              runMeltDemo();
              ob.disconnect();
            }
          });
        },
        { threshold: 0.35 },
      );
      o.observe(meltEl);
      observers.push(o);
    }
    const adaEl = document.getElementById("aqAdaDemo");
    if (adaEl) {
      const o = new IntersectionObserver(
        (es, ob) => {
          es.forEach((e) => {
            if (e.isIntersecting) {
              setAdaStep(1);
              ob.disconnect();
            }
          });
        },
        { threshold: 0.3 },
      );
      o.observe(adaEl);
      observers.push(o);
    }
    const heroEl = document.getElementById("aqHero");
    if (heroEl) {
      const o = new IntersectionObserver(
        (es) => {
          es.forEach((e) => {
            if (!e.isIntersecting && statusRef.current === "playing") pauseSession();
          });
        },
        { threshold: 0.12 },
      );
      o.observe(heroEl);
      observers.push(o);
    }
    const onVis = () => {
      if (document.hidden && statusRef.current === "playing") pauseSession();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stopLoop();
      observers.forEach((o) => o.disconnect());
      document.removeEventListener("visibilitychange", onVis);
      if (demoTRef.current) clearTimeout(demoTRef.current);
      engineRef.current?.close();
      engineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function ensureEngine(): AudioEngine {
    if (!engineRef.current) engineRef.current = new AudioEngine();
    return engineRef.current;
  }
  function setBloomColor(m: ModeKey) {
    const el = bloomRef.current;
    if (!el) return;
    const c = MODES[m].color;
    el.style.background = `radial-gradient(circle, ${c}44, rgba(159,214,239,.12) 46%, transparent 70%)`;
  }
  function applyMode(m: ModeKey, ramp: number) {
    const eng = engineRef.current;
    if (!eng || !eng.ctx) return;
    eng.applyMode(m, ramp);
    setBloomColor(m);
  }
  function setBloom(a: number) {
    const el = bloomRef.current;
    if (!el) return;
    if (domReducedMotion()) {
      el.style.transform = "translate(-50%,-50%) scale(1)";
      el.style.opacity = "0.4";
      return;
    }
    const s = 0.85 + a * 0.55;
    el.style.transform = `translate(-50%,-50%) scale(${s})`;
    el.style.opacity = String(0.32 + a * 0.42);
  }
  function stopLoop() {
    if (loopRef.current) {
      clearInterval(loopRef.current);
      loopRef.current = null;
    }
  }
  function startLoop() {
    stopLoop();
    loopRef.current = window.setInterval(tick, 55);
  }
  function tick() {
    const now = performance.now();
    const p = Math.min(1, (now - sessionStartRef.current) / (DUR * 1000));
    const eng = engineRef.current;
    const a = modeRef.current !== "nosound" && eng ? eng.readAmp() : null;
    const amp = a != null ? a : 0.34 + 0.22 * Math.sin(now / 850);
    setBloom(amp);
    if (!domReducedMotion() && Math.abs(p - progressRef.current) >= 0.004) setProgress(p);
    if (p >= 1) completeSession();
  }
  function startSession() {
    if (modeRef.current !== "nosound") {
      const eng = ensureEngine();
      eng.init(modeRef.current);
      eng.resume();
      applyMode(modeRef.current, 0.5);
      eng.setMasterGain(0.18, 0.5);
    }
    sessionStartRef.current = performance.now() - progressRef.current * DUR * 1000;
    setStatus("playing");
    startLoop();
  }
  function pauseSession() {
    stopLoop();
    const eng = engineRef.current;
    if (eng && eng.ctx) {
      eng.setMasterGain(0.0001, 0.3);
      window.setTimeout(() => {
        if (statusRef.current === "paused" && eng.state === "running") eng.suspend();
      }, 360);
    }
    setStatus("paused");
  }
  function resumeSession() {
    sessionStartRef.current = performance.now() - progressRef.current * DUR * 1000;
    if (modeRef.current !== "nosound") {
      const eng = ensureEngine();
      eng.init(modeRef.current);
      eng.resume();
      eng.setMasterGain(0.18, 0.4);
    }
    setStatus("playing");
    startLoop();
  }
  function completeSession() {
    stopLoop();
    const eng = engineRef.current;
    if (eng && eng.ctx) {
      eng.setMasterGain(0.0001, 0.7);
      window.setTimeout(() => {
        if (eng.state === "running") eng.suspend();
      }, 800);
    }
    setStatus("done");
    setProgress(1);
  }
  function resetSession() {
    stopLoop();
    const eng = engineRef.current;
    if (eng && eng.ctx) eng.setMasterGain(0.0001, 0.2);
    setStatus("idle");
    setProgress(0);
    setBloom(0.25);
  }
  function onPlay() {
    const s = statusRef.current;
    if (s === "idle") startSession();
    else if (s === "playing") pauseSession();
    else if (s === "paused") resumeSession();
    else resetSession();
  }
  function selectMode(m: ModeKey) {
    setMode(m);
    try {
      localStorage.setItem("aq-mode", m);
    } catch {}
    const s = statusRef.current;
    if (s === "playing" || s === "paused") {
      if (m !== "nosound") {
        const eng = ensureEngine();
        eng.init(m);
        eng.resume();
        applyMode(m, 0.5);
        eng.setMasterGain(0.18, 0.5);
      } else {
        engineRef.current?.setMasterGain(0.0001, 0.5);
      }
    } else {
      setBloomColor(m);
    }
  }
  function runMeltDemo() {
    if (domReducedMotion()) {
      setDemoProgress(0.55);
      setDemoDone(true);
      return;
    }
    const dur = 4600,
      start = performance.now();
    const step = () => {
      const p = Math.min(1, (performance.now() - start) / dur);
      setDemoProgress(p);
      if (p < 1) demoTRef.current = window.setTimeout(step, 60);
      else setDemoDone(true);
    };
    step();
  }

  // ── Derived render values (renderVals) ──────────────────────────────
  const red = reduce;
  const m = MODES[mode];
  const heroProgress = red ? 0 : progress;
  const frostOn = status === "paused" || (red && status !== "idle");
  const dripOn = status === "playing" && !red;
  const cubeExpr: "focused" | "happy" = status === "playing" ? "focused" : "happy";
  const playIcon = status === "playing" ? "pause" : status === "done" ? "replay" : "play_arrow";
  const playIconNudge = status === "playing" ? "0" : status === "done" ? "0" : "3px";
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
      ? mode === "nosound"
        ? "Just you and the cube."
        : `${m.label}. The room goes quiet.`
      : status === "paused"
        ? "Frozen. Pick up when you’re ready."
        : status === "done"
          ? "That’s one mode of many."
          : "Nothing plays until you tap.";
  const demoDrip = demoProgress > 0.04 && demoProgress < 0.97 && !red;
  const demoTaskDone = demoDone || demoProgress > 0.95;
  const adaVis = (i: number): CSSProperties => ({
    transition: `opacity .5s ${0.1 + i * 0.13}s, transform .5s ${0.1 + i * 0.13}s`,
    opacity: adaStep >= 1 ? 1 : 0,
    transform: adaStep >= 1 ? "none" : "translateY(10px)",
  });

  return (
    <div style={{ background: "var(--aq-paper)", overflowX: "clip" }}>
      <section
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
              maxWidth: 560,
              margin: "0 auto 28px",
              fontWeight: 500,
            }}
          >
            Focus soundscapes, a melting-cube timer, and an AI that breaks the work down.
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
                background:
                  "radial-gradient(circle,rgba(107,92,240,.30),rgba(159,214,239,.13) 46%,transparent 70%)",
                filter: "blur(20px)",
                opacity: 0.4,
                borderRadius: "50%",
                pointerEvents: "none",
              }}
            />
            <div data-breathe={status === "idle" ? "true" : "false"} style={{ position: "relative" }}>
              <IceTimer
                progress={heroProgress}
                frost={frostOn}
                drip={dripOn}
                expr={cubeExpr}
                size={300}
              />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button
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
              <span className="material-icons-outlined" style={{ fontSize: 28, marginLeft: playIconNudge }}>
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
              <div style={{ fontSize: 13, color: "#8e8a83", lineHeight: 1.4, maxWidth: 240 }}>
                {caption}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, justifyContent: "center" }}>
            {MODE_KEYS.map((k) => (
              <button key={k} onClick={() => selectMode(k)} style={modeBtnStyle(k, k === mode)}>
                {MODES[k].label}
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

      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "0 clamp(20px,6vw,60px) clamp(16px,3vh,32px)",
        }}
      >
        <div data-reveal="" style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 16px",
              background: "#fff",
              border: "1px solid rgba(0,0,0,.06)",
              borderRadius: 100,
              fontSize: 13.5,
              fontWeight: 700,
              color: "#14130f",
              boxShadow: "0 2px 10px rgba(0,0,0,.04)",
            }}
          >
            <span style={{ fontFamily: "var(--font-mono)" }}>1,000+</span> students
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "9px 16px",
              background: "#fff",
              border: "1px solid rgba(0,0,0,.06)",
              borderRadius: 100,
              fontSize: 13.5,
              fontWeight: 600,
              color: "#45423d",
              boxShadow: "0 2px 10px rgba(0,0,0,.04)",
            }}
          >
            <span className="material-icons-outlined" style={{ fontSize: 16, color: "#5941d6" }}>
              psychology
            </span>
            Built on behavioral psychology
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "9px 16px",
              background: "#fff",
              border: "1px solid rgba(0,0,0,.06)",
              borderRadius: 100,
              fontSize: 13.5,
              fontWeight: 600,
              color: "#45423d",
              boxShadow: "0 2px 10px rgba(0,0,0,.04)",
            }}
          >
            <span className="material-icons-outlined" style={{ fontSize: 16, color: "#2a9d6b" }}>
              block
            </span>
            Ad-free
          </span>
        </div>
      </div>

      {/* Focus melt demo */}
      <section id="aqMeltDemo" style={{ padding: "clamp(48px,7vh,86px) clamp(20px,6vw,60px)" }}>
        <div
          style={{
            maxWidth: 1040,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(30px,5vw,64px)",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1.05, minWidth: 290, display: "flex", justifyContent: "center" }} data-reveal="">
            <div
              style={{
                background: "var(--aq-periwinkle-soft)",
                borderRadius: 34,
                padding: "clamp(22px,3vw,34px)",
                width: "100%",
                maxWidth: 400,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: 26,
                  boxShadow: "0 16px 44px rgba(49,35,124,.12)",
                  padding: "24px 20px",
                  width: "100%",
                  maxWidth: 324,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 22,
                }}
              >
                <div style={{ alignSelf: "stretch", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      color: "#a8a49c",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Focus session
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#5941d6",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6b5cf0" }} />
                    Deep Work
                  </span>
                </div>
                <IceTimer progress={demoProgress} drip={demoDrip} expr="focused" size={128} style={{ marginBottom: 20 }} />
                <div style={{ alignSelf: "stretch" }}>
                  <TaskCard
                    title="Essay: write the opening"
                    tag="Report"
                    dur="~25 min"
                    color="var(--aq-tag-report)"
                    done={demoTaskDone}
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 280 }} data-reveal="">
            <div style={eyebrow}>Focus</div>
            <h2 style={heading2}>The calmest way to start.</h2>
            <p style={lead}>
              Start a session and the pressure drains out of the clock. A frosted cube melts while
              you work, until somewhere in there, you&apos;ve quietly started.
            </p>
            {plink("/how-it-works#focus", "See how focus feels")}
          </div>
        </div>
      </section>

      {/* Plan */}
      <section style={{ background: "#fff", padding: "clamp(48px,7vh,86px) clamp(20px,6vw,60px)" }}>
        <div
          style={{
            maxWidth: 1040,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap-reverse",
            gap: "clamp(30px,5vw,64px)",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1, minWidth: 280 }} data-reveal="">
            <div style={eyebrow}>Plan</div>
            <h2 style={heading2}>A plan that fits on one calm screen.</h2>
            <p style={lead}>
              Just today. Gentle groups, soft subject colors, honest sizes. Not a wall of everything
              you&apos;re behind on.
            </p>
            {plink("/how-it-works#plan", "See planning")}
          </div>
          <div style={{ flex: 1.05, minWidth: 290, display: "flex", justifyContent: "center" }} data-reveal="">
            <div
              style={{
                background: "var(--aq-periwinkle-soft)",
                borderRadius: 34,
                padding: "clamp(26px,3.5vw,42px)",
                width: "100%",
                maxWidth: 400,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: 26,
                  boxShadow: "0 16px 44px rgba(49,35,124,.12)",
                  padding: "20px 18px",
                  width: 290,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 18, color: "#14130f" }}>
                    Today
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#8e8a83", fontWeight: 600 }}>
                    Tue 14
                  </span>
                </div>
                <div style={groupLabel}>Anytime (2)</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                  <TaskCard title="Read chapter 4" tag="Reading" dur="~25 min" color="var(--aq-tag-reading)" />
                  <TaskCard title="Review flashcards" tag="Class" dur="~15 min" color="var(--aq-tag-class)" />
                </div>
                <div style={groupLabel}>Planned</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <TaskCard title="Chemistry lecture" tag="Lecture" time="09:00" bar color="var(--aq-tag-lecture)" />
                  <TaskCard title="Essay: opening" tag="Report" time="14:00" bar color="var(--aq-tag-report)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ada demo */}
      <section id="aqAdaDemo" style={{ padding: "clamp(48px,7vh,86px) clamp(20px,6vw,60px)" }}>
        <div
          style={{
            maxWidth: 1040,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(30px,5vw,64px)",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1.05, minWidth: 290, display: "flex", justifyContent: "center" }} data-reveal="">
            <div
              style={{
                background: "var(--aq-periwinkle-soft)",
                borderRadius: 34,
                padding: "clamp(24px,3vw,36px)",
                width: "100%",
                maxWidth: 400,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: 26,
                  boxShadow: "0 16px 44px rgba(49,35,124,.12)",
                  padding: 20,
                  width: 300,
                  display: "flex",
                  flexDirection: "column",
                  gap: 11,
                }}
              >
                <div
                  style={{
                    alignSelf: "flex-end",
                    background: "#111",
                    color: "#fff",
                    borderRadius: "16px 16px 4px 16px",
                    padding: "10px 14px",
                    fontSize: 12.5,
                    fontWeight: 600,
                    maxWidth: "82%",
                    lineHeight: 1.4,
                  }}
                >
                  chem lab report, 2 problem sets, read ch.4, gym??
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <AdaCube size={30} rating={4} expr="happy" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div
                    style={{
                      background: "var(--aq-paper)",
                      borderRadius: "16px 16px 16px 4px",
                      padding: "10px 13px",
                      fontSize: 12,
                      lineHeight: 1.45,
                      color: "#45423d",
                    }}
                  >
                    Let&apos;s make it smaller. I&apos;ll start with the thing you&apos;re dreading.
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 2 }}>
                  <div style={adaVis(0)}>
                    <TaskCard title="Chem lab report: outline" tag="Report" dur="~35 min" time="Mon" bar color="var(--aq-tag-report)" />
                  </div>
                  <div style={adaVis(1)}>
                    <TaskCard title="Problem set 1" tag="Assignment" dur="~30 min" time="Tue" bar color="var(--aq-tag-assignment)" />
                  </div>
                  <div style={adaVis(2)}>
                    <TaskCard title="Read chapter 4" tag="Reading" dur="~25 min" time="Wed" bar color="var(--aq-tag-reading)" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 280 }} data-reveal="">
            <div style={eyebrow}>Ada · AI co-planner</div>
            <h2 style={heading2}>The pile becomes a first step.</h2>
            <p style={lead}>
              Type in everything you&apos;re behind on. Ada hands back a first step small enough to
              actually take, no lecture, no shame.
            </p>
            {plink("/how-it-works#ada", "Meet Ada")}
          </div>
        </div>
      </section>

      {/* Prism */}
      <section style={{ background: "#fff", padding: "clamp(48px,7vh,86px) clamp(20px,6vw,60px)" }}>
        <div
          style={{
            maxWidth: 1040,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap-reverse",
            gap: "clamp(30px,5vw,64px)",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1, minWidth: 280 }} data-reveal="">
            <div style={eyebrow}>Prism · sound</div>
            <h2 style={heading2}>Sound that quiets the room.</h2>
            <p style={lead}>
              Focus soundscapes tuned for studying, not a playlist to get lost in. Press play in the
              cube above to hear one.
            </p>
            <a className={styles.plink} href="#" style={{ fontSize: 15.5 }}>
              Explore Prism{" "}
              <span className="material-icons-outlined" style={{ fontSize: 18 }}>
                arrow_forward
              </span>
            </a>
          </div>
          <div style={{ flex: 1.05, minWidth: 290, display: "flex", justifyContent: "center" }} data-reveal="">
            <div
              style={{
                background: "var(--aq-periwinkle-soft)",
                borderRadius: 34,
                padding: "clamp(24px,3vw,38px)",
                width: "100%",
                maxWidth: 400,
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: 22,
                  boxShadow: "0 16px 44px rgba(49,35,124,.12)",
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {[
                  { name: "Deep Work", nameColor: "#31237c", desc: "For the thing you keep putting off", descColor: "#5c5499", bg: "var(--aq-periwinkle-soft)" },
                  { name: "Flow", nameColor: "#1f7d54", desc: "Ride a good stretch", descColor: "#8e8a83", bg: "#f4f3f0" },
                  { name: "Review", nameColor: "#c17d18", desc: "Going back over notes", descColor: "#8e8a83", bg: "#f4f3f0" },
                  { name: "Wind-down", nameColor: "#57534d", desc: "Close the day kindly", descColor: "#8e8a83", bg: "#f4f3f0" },
                ].map((r) => (
                  <div
                    key={r.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 12px",
                      borderRadius: 14,
                      background: r.bg,
                    }}
                  >
                    <span style={{ fontWeight: 800, fontSize: 14, color: r.nameColor }}>{r.name}</span>
                    <span style={{ fontSize: 11, color: r.descColor, fontWeight: 600 }}>{r.desc}</span>
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 12px",
                    color: "#a8a49c",
                    fontSize: 11.5,
                    fontWeight: 600,
                  }}
                >
                  <span className="material-icons-outlined" style={{ fontSize: 15 }}>
                    volume_off
                  </span>
                  No sound · silence is a mode too
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* No streak */}
      <section
        style={{
          background: "var(--aq-periwinkle-soft)",
          padding: "clamp(56px,8vh,100px) clamp(20px,6vw,60px)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }} data-reveal="">
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 800,
              fontSize: "clamp(2rem,4.4vw,3.4rem)",
              letterSpacing: "-.03em",
              lineHeight: 1.06,
              margin: "0 0 18px",
              color: "#31237c",
              textWrap: "balance",
            }}
          >
            No streak to lose. No guilt. No pressure.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.05rem,1.4vw,1.24rem)",
              lineHeight: 1.55,
              color: "#4a3f7a",
              maxWidth: 560,
              margin: "0 auto 40px",
              fontWeight: 500,
            }}
          >
            Miss a day and nothing breaks, no chain snaps, no guilt notification, no cube left to
            die. Progress that never turns into pressure.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "clamp(10px,4vw,34px)", flexWrap: "wrap" }}>
            {[
              { rating: 0, expr: "sad", melt: 0.9, label: "Rough" },
              { rating: 1, expr: "meh", melt: 0.6, label: "Tired" },
              { rating: 2, expr: "neutral", melt: 0.32, label: "OK" },
              { rating: 3, expr: "smile", melt: 0.12, label: "Good" },
              { rating: 4, expr: "happy", melt: 0, label: "Great" },
            ].map((mm) => (
              <div key={mm.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <AdaCube
                  size={54}
                  rating={mm.rating}
                  expr={mm.expr as "sad" | "meh" | "neutral" | "smile" | "happy"}
                  melt={mm.melt}
                />
                <span style={{ fontSize: 12, color: "#8478b0", fontWeight: 700 }}>{mm.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "clamp(56px,8vh,104px) 0", overflow: "hidden", background: "var(--aq-paper)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 clamp(20px,6vw,60px)", textAlign: "center" }} data-reveal="">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "8px 15px",
              background: "var(--aq-periwinkle-soft)",
              borderRadius: 100,
              marginBottom: 20,
            }}
          >
            <span className="material-icons-outlined" style={{ fontSize: 16, color: "#e8a430" }}>
              star
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11.5,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "#5941d6",
                fontWeight: 700,
              }}
            >
              Student stories
            </span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 800,
              fontSize: "clamp(1.9rem,3.8vw,2.9rem)",
              letterSpacing: "-.028em",
              lineHeight: 1.06,
              margin: "0 0 16px",
              color: "#14130f",
              textWrap: "balance",
            }}
          >
            Real students, real <span style={{ color: "#6b5cf0" }}>behavior change</span>.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.02rem,1.3vw,1.18rem)",
              lineHeight: 1.55,
              color: "#4a4742",
              maxWidth: 580,
              margin: "0 auto",
            }}
          >
            From ADHD spirals to anxiety loops to sensory overload. See how Aqademiq helps students
            actually finish what they start.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: "clamp(38px,5vw,56px)" }} data-reveal="">
          <div className={styles.row} style={{ position: "relative", overflow: "hidden", padding: "14px 0" }}>
            <div className={`${styles.fade} ${styles.fadeL}`} />
            <div className={`${styles.fade} ${styles.fadeR}`} />
            <div className={`${styles.track} ${styles.left}`} style={{ display: "flex", width: "max-content" }}>
              {ROW1.map((t, i) => (
                <TestiCard key={i} t={t} />
              ))}
            </div>
          </div>
          <div className={styles.row} style={{ position: "relative", overflow: "hidden", padding: "14px 0" }}>
            <div className={`${styles.fade} ${styles.fadeL}`} />
            <div className={`${styles.fade} ${styles.fadeR}`} />
            <div className={`${styles.track} ${styles.right}`} style={{ display: "flex", width: "max-content" }}>
              {ROW2.map((t, i) => (
                <TestiCard key={i} t={t} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#fff", padding: "clamp(56px,8vh,100px) clamp(20px,6vw,60px)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 800,
              fontSize: "clamp(1.8rem,3.4vw,2.6rem)",
              letterSpacing: "-.026em",
              lineHeight: 1.08,
              margin: "0 0 clamp(20px,3vw,32px)",
              color: "#14130f",
              textAlign: "center",
            }}
          >
            Common questions
          </h2>
          <div data-reveal="">
            <details className={styles.fq}>
              <summary>
                Is Aqademiq free?
                <span className={`${styles.chev} material-icons-outlined`}>expand_more</span>
              </summary>
              <div className={styles.answer}>
                Yes. Aqademiq is completely free right now, on the web and on iPhone and Android, no
                credit card. Any future fee would be minimal and only to help keep it running.
              </div>
            </details>
            <details className={styles.fq}>
              <summary>
                Is there a mobile app?
                <span className={`${styles.chev} material-icons-outlined`}>expand_more</span>
              </summary>
              <div className={styles.answer}>
                Yes, on iPhone and Android, free from the App Store or Google Play.{" "}
                <button
                  onClick={openGetApp}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    color: "#5941d6",
                    fontWeight: 700,
                    fontSize: 15,
                    fontFamily: "var(--font-sans)",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Get the app →
                </button>
              </div>
            </details>
            <details className={styles.fq}>
              <summary>
                Is this an ADHD app?
                <span className={`${styles.chev} material-icons-outlined`}>expand_more</span>
              </summary>
              <div className={styles.answer}>
                It&apos;s built to be kind to brains that find starting hard, including ADHD and
                executive-function students. But it&apos;s for any student who procrastinates, and
                it&apos;s a study tool, not a medical one.
              </div>
            </details>
            <details className={styles.fq}>
              <summary>
                Do I need to install anything?
                <span className={`${styles.chev} material-icons-outlined`}>expand_more</span>
              </summary>
              <div className={styles.answer}>
                No. Aqademiq runs in your browser on laptop or phone. Nothing to install.
              </div>
            </details>
          </div>
          <div style={{ textAlign: "center", marginTop: 26 }}>
            {plink("/faq", "All questions")}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        style={{
          padding: "clamp(64px,10vh,130px) clamp(20px,6vw,60px)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            top: "44%",
            width: 520,
            height: 520,
            transform: "translate(-50%,-50%)",
            background: "radial-gradient(circle,rgba(107,92,240,.1),transparent 64%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 720, margin: "0 auto", position: "relative" }} data-reveal="">
          <div data-breathe="true" style={{ display: "inline-block", marginBottom: 26 }}>
            <AdaCube size={82} rating={4} expr="happy" style={{ filter: "drop-shadow(0 12px 26px rgba(107,92,240,.28))" }} />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 800,
              fontSize: "clamp(2.1rem,4.6vw,3.6rem)",
              letterSpacing: "-.03em",
              lineHeight: 1.04,
              margin: "0 0 20px",
              color: "#14130f",
              textWrap: "balance",
            }}
          >
            Starting is the hard part. We&apos;ll take it from here.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.05rem,1.35vw,1.24rem)",
              lineHeight: 1.5,
              color: "#4a4742",
              maxWidth: 480,
              margin: "0 auto 30px",
              fontWeight: 500,
            }}
          >
            Free to start, right in your browser.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 16 }}>
            <a
              href={APP_URL}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                padding: "17px 34px",
                background: "#111",
                color: "#fff",
                borderRadius: 100,
                fontWeight: 800,
                fontSize: 17,
              }}
            >
              Start studying free
            </a>
            <button
              onClick={openGetApp}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "17px 30px",
                background: "transparent",
                color: "#14130f",
                border: "1.5px solid rgba(20,19,15,.18)",
                borderRadius: 100,
                fontWeight: 700,
                fontSize: 16,
                fontFamily: "var(--font-sans)",
                cursor: "pointer",
              }}
            >
              Get the app
            </button>
          </div>
          <div style={{ fontSize: 13.5, color: "#8e8a83", fontWeight: 600 }}>
            Free on iPhone, Android, and the web
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeClient;
