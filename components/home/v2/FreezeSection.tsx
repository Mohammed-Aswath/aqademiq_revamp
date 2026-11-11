"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import s from "./home.module.css";

/* App freeze: the app's own frames (ported from Home.dc.html's DCLogic). */

type Screen = "hub" | "shield" | "breath" | "minutes" | "thawed" | "deep";
type Hot = { r: [number, number, number, number]; label: string; go: Screen };
type FzState = { fz: Screen; fzStage: number; fzOpens: number; fzThaws: number };

const FZ_STEPS = [
  {
    title: "Freeze now, or with a frost",
    body: "Freeze apps for this session, an hour, or until you stop. Or put them on a schedule, like Lecture hours.",
  },
  {
    title: "Open one, and Ada’s sitting on it",
    body: "The first time she’s playful. Try again and she says less. The joke is never on you.",
  },
  {
    title: "Thawing takes a breath",
    body: "Still need it? Wait 10 seconds, then pick 2 to 15 minutes. It refreezes on its own.",
  },
  {
    title: "Deep freeze holds",
    body: "No thawing until it ends. Phone, Messages, Maps and Wallet always stay open.",
  },
];

const FZ_ALT: Record<string, string> = {
  "fz-hub":
    "App freeze in the app: Instagram and YouTube frozen, TikTok thawed for 13 minutes, a Lecture hours frost with 1h 40m left, and groups for Always open, Never open and Distracting",
  "fz-shield-1":
    "Opening a frozen app: Ada’s sitting on this one. Yours again at 3:42. Back to focus, or Thaw after 10 seconds",
  "fz-shield-2": "Opening it again: Still on ice. 3:42",
  "fz-shield-3": "A third time: Frozen. 3:42",
  "fz-breath": "Take a breath. Still want Instagram in 7 seconds? Thaw in 7s, or Keep it frozen",
  "fz-breath-more":
    "Take a breath. Still want Instagram in 27 seconds? Each thaw today waits a little longer",
  "fz-minutes": "Thaw Instagram for 5 minutes, with 2, 5, 10 and 15 minute choices",
  "fz-thawed": "Instagram thawed, refreezes at 3:47, with a Refreeze button",
  "fz-deep":
    "Deep freeze until 1:00 PM. No thawing during Lecture hours. Phone, Messages, Maps and Wallet stay open",
};
const FZ_KEYS = Object.keys(FZ_ALT);

const FZH: Record<Screen, Hot[]> = {
  hub: [{ r: [3.5, 24, 18, 13.5], label: "Open Instagram, which is frozen", go: "shield" }],
  shield: [
    { r: [5.47, 82.38, 89.05, 5.72], label: "Back to focus", go: "hub" },
    { r: [5.47, 89.02, 89.05, 5.72], label: "Thaw, after a 10 second breath", go: "breath" },
  ],
  breath: [{ r: [30, 90.8, 40, 5.6], label: "Keep it frozen", go: "hub" }],
  minutes: [
    { r: [5.47, 85.01, 89.05, 5.72], label: "Thaw Instagram for 5 minutes", go: "thawed" },
    { r: [30, 90.8, 40, 5.6], label: "Keep it frozen", go: "hub" },
  ],
  thawed: [{ r: [73, 80.6, 22, 6], label: "Refreeze Instagram", go: "hub" }],
  deep: [
    { r: [5.97, 86.96, 88.06, 5.72], label: "Back to focus", go: "hub" },
    { r: [84.2, 51.5, 11, 5.1], label: "Close", go: "hub" },
  ],
};

const STEP_IDX: Record<Screen, number> = { hub: 0, thawed: 0, shield: 1, breath: 2, minutes: 2, deep: 3 };
const JUMP: Screen[] = ["hub", "shield", "breath", "deep"];

const VIB = {
  crystallise: [6, 64, 7, 48, 8, 34, 9, 24, 10, 14, 28],
  soft: [5, 60, 6, 40, 7, 24, 16],
  melt: [90, 60, 12, 140, 9],
  knock: [22, 95, 18],
};

/** The breath screen hands over to the minutes picker after this long. */
const BREATH_MS = 4200;

function buzz(p: number[]) {
  try {
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") navigator.vibrate(p);
  } catch {
    /* ignore */
  }
}

/* The design's reduced(): the site comfort toggle or the OS preference. */
function readReduced(): boolean {
  try {
    if (document.documentElement.getAttribute("data-reduce-motion") === "true") return true;
  } catch {
    /* ignore */
  }
  return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function subscribeReduced(onChange: () => void): () => void {
  const mq = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  mq?.addEventListener("change", onChange);
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-reduce-motion"] });
  return () => {
    mq?.removeEventListener("change", onChange);
    mo.disconnect();
  };
}

const box = (r: Hot["r"]): CSSProperties => ({
  left: `${r[0]}%`,
  top: `${r[1]}%`,
  width: `${r[2]}%`,
  height: `${r[3]}%`,
});

const TEMPLATES = [
  { icon: "school", name: "Lecture hours", when: "9 AM – 1 PM · Mon–Fri" },
  { icon: "edit_note", name: "Exam week", when: "All day · 7 days" },
  { icon: "center_focus_strong", name: "Deep work", when: "2 hr session" },
  { icon: "bedtime", name: "Wind down", when: "10 PM – 7 AM · Daily" },
];

const TRUST = [
  { icon: "visibility_off", text: "Your list stays on your phone" },
  { icon: "phone_iphone", text: "iPhone and Android" },
  { icon: "redeem", text: "Free" },
];

export function FreezeSection() {
  const [st, setSt] = useState<FzState>({ fz: "hub", fzStage: 0, fzOpens: 0, fzThaws: 0 });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const red = useSyncExternalStore(subscribeReduced, readReduced, () => false);

  const stopFz = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  useEffect(() => stopFz, [stopFz]);

  const fzGo = (screen: Screen) => {
    stopFz();
    const from = st.fz;
    if (screen === "shield") {
      setSt((p) => ({ ...p, fz: "shield", fzStage: Math.min(2, p.fzOpens), fzOpens: p.fzOpens + 1 }));
      return;
    }
    if (screen === "breath") {
      setSt((p) => ({ ...p, fz: "breath" }));
      timer.current = setTimeout(() => {
        timer.current = null;
        setSt((p) => (p.fz === "breath" ? { ...p, fz: "minutes" } : p));
      }, BREATH_MS);
      return;
    }
    if (screen === "thawed") {
      buzz(VIB.melt);
      setSt((p) => ({ ...p, fz: "thawed", fzThaws: p.fzThaws + 1 }));
      return;
    }
    if (screen === "deep") buzz(VIB.knock);
    else if (screen === "hub") buzz(from === "thawed" ? VIB.crystallise : VIB.soft);
    setSt((p) => ({ ...p, fz: screen }));
  };

  const { fz } = st;
  const FZF: Record<Screen, string> = {
    hub: "fz-hub",
    thawed: "fz-thawed",
    shield: `fz-shield-${Math.min(2, st.fzStage) + 1}`,
    breath: st.fzThaws > 0 ? "fz-breath-more" : "fz-breath",
    minutes: "fz-minutes",
    deep: "fz-deep",
  };
  const fzCur = FZF[fz];
  const stepIdx = STEP_IDX[fz];
  const fzPulse = fz === "hub" && !red;

  return (
    <section id="freeze" style={{ background: "#fff", padding: "clamp(56px,8vh,104px) clamp(20px,6vw,60px)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div
          style={{ textAlign: "center", maxWidth: 760, margin: "0 auto clamp(36px,5vw,56px)" }}
          data-reveal=""
        >
          <div className={s["aq-eyerow"]}>
            <span className={s.e}>App freeze</span>
            <span className={s["aq-new"]}>New</span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 800,
              fontSize: "clamp(2.1rem,4.4vw,3.5rem)",
              letterSpacing: "-.03em",
              lineHeight: 1.04,
              margin: "0 0 18px",
              color: "#14130f",
              textWrap: "balance",
            }}
          >
            Freeze the apps that pull you away.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.05rem,1.4vw,1.24rem)",
              lineHeight: 1.55,
              color: "#4a4742",
              maxWidth: 580,
              margin: "0 auto",
              fontWeight: 500,
            }}
          >
            For one session, or on a schedule. When you really need one back, thawing takes a breath first. Try
            it on the phone below.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(32px,5vw,72px)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{ flex: "0 1 330px", display: "flex", justifyContent: "center", position: "relative" }}
            data-reveal=""
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 520,
                height: 520,
                transform: "translate(-50%,-50%)",
                background: "radial-gradient(circle,rgba(107,92,240,.16),transparent 62%)",
                pointerEvents: "none",
              }}
            />
            <div
              className={s["fz-phone"]}
              role="group"
              aria-label="Interactive App freeze demo, using the app's own screens"
            >
              <div className={s["fz-screen"]}>
                {FZ_KEYS.map((k) => {
                  const on = k === fzCur;
                  return (
                    <Image
                      key={k}
                      src={`/assets/frames/${k}.webp`}
                      alt={on ? FZ_ALT[k] : ""}
                      aria-hidden={on ? "false" : "true"}
                      fill
                      sizes="292px"
                      style={{ display: "block", transition: "opacity .35s ease", opacity: on ? 1 : 0 }}
                    />
                  );
                })}
                {fzPulse && <span className={s["fz-pulse"]} aria-hidden="true" />}
                {/* Keyed by index, as the design's sc-for reuses its buttons: a keyboard press on a
                    hotspot keeps focus on the one that takes its place. */}
                {FZH[fz].map((h, i) => (
                  <button
                    key={i}
                    type="button"
                    className={s["fz-hot"]}
                    onClick={() => fzGo(h.go)}
                    aria-label={h.label}
                    style={box(h.r)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              flex: "1 1 380px",
              minWidth: 0,
              maxWidth: 470,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
            data-reveal=""
          >
            {FZ_STEPS.map((step, i) => {
              const on = i === stepIdx;
              return (
                <button
                  key={step.title}
                  type="button"
                  className={s["fz-step"]}
                  data-on={on ? "true" : "false"}
                  onClick={() => fzGo(JUMP[i] ?? "hub")}
                  aria-pressed={on}
                >
                  <span className={s["fz-num"]}>{`0${i + 1}`}</span>
                  <span style={{ minWidth: 0 }}>
                    <span
                      style={{
                        display: "block",
                        fontWeight: 800,
                        fontSize: "1.08rem",
                        color: "#14130f",
                        letterSpacing: "-.01em",
                      }}
                    >
                      {step.title}
                    </span>
                    <span
                      style={{ display: "block", fontSize: 14.5, lineHeight: 1.55, color: "#4a4742", marginTop: 4 }}
                    >
                      {step.body}
                    </span>
                  </span>
                </button>
              );
            })}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px 18px",
                margin: "14px 18px 0",
                fontSize: 13,
                fontWeight: 700,
                color: "#45423d",
              }}
            >
              {TRUST.map((t) => (
                <span key={t.icon} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <span
                    className="material-icons-outlined"
                    aria-hidden="true"
                    style={{ fontSize: 17, color: "#2a9d6b" }}
                  >
                    {t.icon}
                  </span>
                  {t.text}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: "clamp(44px,6vw,72px)" }} data-reveal="">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: "8px 20px",
              marginBottom: 14,
            }}
          >
            <div>
              <span style={{ fontWeight: 800, fontSize: "1.25rem", letterSpacing: "-.015em", color: "#14130f" }}>
                Student frosts
              </span>
              <span style={{ fontSize: 14.5, color: "#57534d", marginLeft: 10 }}>Start from one. Change anything.</span>
            </div>
            <Link className={s["aq-plink"]} href="/how-it-works#freeze" style={{ fontSize: 15 }}>
              How App freeze works{" "}
              <span className="material-icons-outlined" aria-hidden="true" style={{ fontSize: 18 }}>
                arrow_forward
              </span>
            </Link>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {TEMPLATES.map((t) => (
              <div key={t.name} className={s["fz-tmpl"]} style={{ background: "#f4f3f0", boxShadow: "none" }}>
                <span
                  className="material-icons-outlined"
                  aria-hidden="true"
                  style={{ fontSize: 21, color: "#5941d6", marginBottom: 6 }}
                >
                  {t.icon}
                </span>
                <span style={{ fontWeight: 800, fontSize: 15, color: "#14130f" }}>{t.name}</span>
                <span style={{ fontSize: 13, color: "#57534d", fontWeight: 600 }}>{t.when}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
