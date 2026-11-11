"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { AdaCube, type AdaExpr } from "@/components/ds";
import s from "./home.module.css";

/*
 * Haptics (Home.dc.html section 10). Pick one of the six feels and the card
 * shows its waveform; Play (or picking) sweeps a play head across it, moves
 * Ada and the ring with the Web Animations API, and buzzes the phone with
 * navigator.vibrate where the browser has it. Data, timings and the waveform
 * geometry are the design's DCLogic (HX, PAT, VIB, waveSvg, hxPlay) verbatim.
 */

type HxId = "crystallise" | "melt" | "breath" | "knock" | "bloom" | "clink";

const HX: { id: HxId; when: string; name: string; icon: string; expr: AdaExpr; desc: string }[] = [
  { id: "crystallise", when: "Freeze", name: "Crystallise", icon: "ac_unit", expr: "happy", desc: "Water setting into ice. Grains that speed up, then lock." },
  { id: "melt", when: "Thaw or resume", name: "Melt", icon: "water_drop", expr: "happy", desc: "A soft swell that lets go, then two drips." },
  { id: "breath", when: "The thaw wait", name: "Breath", icon: "air", expr: "happy", desc: "Four seconds in, six seconds out. The wait becomes a breath." },
  { id: "knock", when: "Deep freeze holds", name: "Knock", icon: "lock_clock", expr: "neutral", desc: "Knuckles on thick ice. It holds, and it never feels like an error." },
  { id: "bloom", when: "Session done", name: "Bloom", icon: "celebration", expr: "happy", desc: "Ice setting fully, then ringing like a glass bowl. The one big celebration." },
  { id: "clink", when: "Tap Ada", name: "Clink", icon: "touch_app", expr: "smile", desc: "Two glassy taps, like a fingernail on Ada’s cube." },
];

/* A tick: [time ms, height 0..1, colour mix 0..1]. A curve: [[time, height]…], colour mix. */
type HxEvent = ["t", number, number, number] | ["c", [number, number][], number];

const PAT: Record<HxId, { ms: number; e: HxEvent[] }> = {
  crystallise: { ms: 340, e: [["t", 0, 0.2, 0.9], ["t", 70, 0.3, 0.9], ["t", 125, 0.4, 0.9], ["t", 167, 0.5, 0.9], ["t", 199, 0.6, 0.9], ["t", 223, 0.9, 0.7], ["c", [[223, 0.3], [300, 0]], 0.2]] },
  melt: { ms: 640, e: [["c", [[0, 0.05], [90, 0.5], [420, 0]], 0.1], ["t", 300, 0.25, 0.5], ["t", 560, 0.18, 0.5]] },
  breath: { ms: 10000, e: [["c", [[0, 0], [4000, 0.28], [10000, 0]], 0.05]] },
  knock: { ms: 200, e: [["t", 0, 0.7, 0.15], ["t", 95, 0.55, 0.15]] },
  bloom: { ms: 1300, e: [["t", 0, 0.25, 0.9], ["t", 60, 0.35, 0.9], ["t", 105, 0.45, 0.9], ["c", [[140, 0.45], [1300, 0]], 0.2], ["t", 140, 1, 0.8]] },
  clink: { ms: 100, e: [["t", 0, 0.4, 1], ["t", 35, 0.25, 1]] },
};

const VIB: Record<Exclude<HxId, "breath">, number[]> = {
  crystallise: [6, 64, 7, 48, 8, 34, 9, 24, 10, 14, 28],
  melt: [90, 60, 12, 140, 9],
  knock: [22, 95, 18],
  bloom: [8, 52, 10, 35, 12, 30, 45, 60, 20, 80, 10],
  clink: [6, 30, 5],
};

/* Ada's motion per feel: [keyframes, duration ms]. */
const K: Record<HxId, [Keyframe[], number]> = {
  crystallise: [[{ transform: "scale(1)" }, { transform: "scale(1.015) rotate(-.7deg)", offset: 0.2 }, { transform: "scale(1.025) rotate(.7deg)", offset: 0.36 }, { transform: "scale(1.035) rotate(-.9deg)", offset: 0.49 }, { transform: "scale(1.045) rotate(.9deg)", offset: 0.58 }, { transform: "scale(.965)", offset: 0.66 }, { transform: "scale(1)" }], 620],
  melt: [[{ transform: "scale(1)" }, { transform: "scale(1.06,.92) translateY(5px)", offset: 0.32 }, { transform: "scale(.99,1.01)", offset: 0.7 }, { transform: "scale(1)" }], 760],
  breath: [[{ transform: "scale(1)" }, { transform: "scale(1.1)", offset: 0.4 }, { transform: "scale(1)" }], 10000],
  knock: [[{ transform: "translateY(0)" }, { transform: "translateY(4px)", offset: 0.1 }, { transform: "translateY(0)", offset: 0.3 }, { transform: "translateY(3px)", offset: 0.55 }, { transform: "translateY(0)" }], 420],
  bloom: [[{ transform: "scale(1)" }, { transform: "scale(1.14)", offset: 0.14 }, { transform: "scale(1)" }], 1300],
  clink: [[{ transform: "rotate(0)" }, { transform: "rotate(-4deg)", offset: 0.2 }, { transform: "rotate(3deg)", offset: 0.5 }, { transform: "rotate(0)" }], 320],
};

/* The ring, for the three feels that have one. */
const R: Partial<Record<HxId, [Keyframe[], number]>> = {
  crystallise: [[{ transform: "scale(1.35)", opacity: 0 }, { transform: "scale(.92)", opacity: 0.85, offset: 0.66 }, { transform: "scale(.96)", opacity: 0 }], 640],
  breath: [[{ transform: "scale(.75)", opacity: 0.15 }, { transform: "scale(1.35)", opacity: 0.75, offset: 0.4 }, { transform: "scale(.75)", opacity: 0.15 }], 10000],
  bloom: [[{ transform: "scale(.7)", opacity: 0.9 }, { transform: "scale(2)", opacity: 0 }], 1300],
};

function reduced(): boolean {
  try {
    if (document.documentElement.getAttribute("data-reduce-motion") === "true") return true;
  } catch {}
  return typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function canBuzz(): boolean {
  try {
    return typeof navigator !== "undefined" && typeof navigator.vibrate === "function";
  } catch {
    return false;
  }
}

function buzz(p: number[] | undefined) {
  try {
    if (p && canBuzz()) navigator.vibrate(p);
  } catch {}
}

/* The design's waveSvg(), drawn as JSX instead of an innerHTML string. */
function Wave({ id }: { id: HxId }) {
  const p = PAT[id];
  const W = 600;
  const H = 64;
  const B = 76;
  const x = (t: number) => (10 + (t / p.ms) * (W - 20)).toFixed(1);
  const mix = (v: number) => {
    const a = [201, 193, 251];
    const b = [59, 43, 196];
    return "rgb(" + a.map((c, i) => Math.round(c + (b[i] - c) * v)).join(",") + ")";
  };
  const polys: ReactNode[] = [];
  const lines: ReactNode[] = [];
  p.e.forEach((e, i) => {
    if (e[0] === "c") {
      const q = e[1];
      const pts =
        x(q[0][0]) + "," + B + " " +
        q.map((pt) => x(pt[0]) + "," + (B - pt[1] * H).toFixed(1)).join(" ") + " " +
        x(q[q.length - 1][0]) + "," + B;
      polys.push(<polygon key={i} points={pts} fill={mix(e[2])} fillOpacity="0.6" />);
    } else {
      lines.push(
        <line
          key={i}
          x1={x(e[1])}
          x2={x(e[1])}
          y1={B}
          y2={(B - e[2] * H).toFixed(1)}
          stroke={mix(e[3])}
          strokeWidth="3.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />,
      );
    }
  });
  return (
    <svg
      viewBox={`0 0 ${W} 82`}
      width="100%"
      height="82"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <line x1="0" x2={W} y1={B} y2={B} stroke="rgba(0,0,0,0.12)" vectorEffect="non-scaling-stroke" />
      {polys}
      {lines}
    </svg>
  );
}

const icon = (size: number, extra?: CSSProperties): CSSProperties => ({ fontSize: size, ...extra });

const tierHead: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontWeight: 800,
  fontSize: 15,
  color: "#14130f",
};
const tierBody: CSSProperties = { fontSize: 13.5, lineHeight: 1.5, color: "#45423d", marginTop: 4 };

export function HapticsSection() {
  const [hx, setHx] = useState<HxId>("crystallise");
  const [note, setNote] = useState("");
  const headRef = useRef<HTMLSpanElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const anims = useRef<Animation[]>([]);

  const cancel = () => {
    anims.current.forEach((a) => {
      try {
        a.cancel();
      } catch {}
    });
    anims.current = [];
  };

  useEffect(() => () => cancel(), []);

  const play = (id: HxId) => {
    const p = PAT[id];
    cancel();
    const can = canBuzz();
    if (id !== "breath") buzz(VIB[id]);
    let n: string;
    if (id === "breath") n = "Too soft for a browser to play. In the app it’s felt as warmth, not a buzz.";
    else if (can) n = "Your browser plays a rough version. The app plays the real thing.";
    else n = "Your browser can’t vibrate, so this is its shape. In the app, you feel it.";
    setNote(n);
    if (reduced()) return;
    const list: Animation[] = [];
    const dur = Math.max(p.ms, 520);
    const head = headRef.current;
    const cube = cubeRef.current;
    const ring = ringRef.current;
    try {
      if (head && head.animate)
        list.push(
          head.animate(
            [
              { left: "10px", opacity: 1 },
              { left: "calc(100% - 12px)", opacity: 1 },
            ],
            { duration: dur, easing: "linear" },
          ),
        );
      if (cube && cube.animate)
        list.push(cube.animate(K[id][0], { duration: K[id][1], easing: id === "breath" ? "ease-in-out" : "ease-out" }));
      const r = R[id];
      if (ring && ring.animate && r) list.push(ring.animate(r[0], { duration: r[1], easing: "ease-out" }));
    } catch {}
    anims.current = list;
  };

  const pick = (id: HxId) => {
    setHx(id);
    play(id);
  };

  const cur = HX.find((h) => h.id === hx) ?? HX[0];
  const pm = PAT[cur.id].ms;
  const len = pm >= 1000 ? pm / 1000 + " s" : pm + " ms";

  return (
    <section id="haptics" style={{ background: "#fff", padding: "clamp(56px,8vh,100px) clamp(20px,6vw,60px)" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto clamp(30px,4vw,48px)" }} data-reveal="">
          <div className={s["aq-eyerow"]}>
            <span className={s.e}>Haptics</span>
            <span className={s["aq-new"]}>New</span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 800,
              fontSize: "clamp(1.9rem,3.6vw,2.9rem)",
              letterSpacing: "-.028em",
              lineHeight: 1.07,
              margin: "0 0 16px",
              color: "#14130f",
              textWrap: "balance",
            }}
          >
            Every tap, freeze and thaw has its own feel.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.02rem,1.3vw,1.18rem)",
              lineHeight: 1.55,
              color: "#4a4742",
              margin: "0 auto",
              maxWidth: 560,
            }}
          >
            No generic buzz. Each feel is something ice does: it sets, it melts, it holds, it rings. Pick one to see its
            shape.
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "stretch" }} data-reveal="">
          <div
            style={{
              flex: "1 1 440px",
              minWidth: 0,
              background: "var(--aq-periwinkle-soft)",
              borderRadius: 30,
              padding: "clamp(20px,3vw,32px)",
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <div style={{ position: "relative", height: 190, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span ref={ringRef} className={s["hx-ringel"]} aria-hidden="true" />
              <div ref={cubeRef} style={{ position: "relative", willChange: "transform" }}>
                {/* The design puts a drop-shadow style on this x-import, but its
                    runtime drops it, so the approved render is unshadowed. */}
                <AdaCube size={112} rating={4} expr={cur.expr} />
              </div>
            </div>
            <div
              style={{
                background: "#fff",
                borderRadius: 22,
                padding: "18px 18px 16px",
                boxShadow: "0 10px 30px rgba(49,35,124,.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                      color: "#6b675f",
                      fontWeight: 600,
                    }}
                  >
                    {cur.when}
                  </div>
                  <div style={{ fontWeight: 800, fontSize: "1.35rem", letterSpacing: "-.015em", color: "#14130f", marginTop: 3 }}>
                    {cur.name}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => play(hx)}
                  style={{
                    flexShrink: 0,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    height: 42,
                    padding: "0 16px",
                    border: "none",
                    borderRadius: 100,
                    background: "#111",
                    color: "#fff",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 800,
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  <span className="material-icons-outlined" aria-hidden="true" style={icon(19)}>
                    play_arrow
                  </span>
                  Play
                </button>
              </div>
              <div className={s["hx-wave"]}>
                <div aria-hidden="true">
                  <Wave id={cur.id} />
                </div>
                <span ref={headRef} className={s["hx-head"]} aria-hidden="true" />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 10,
                  marginTop: 10,
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: "#45423d",
                }}
              >
                <span>{cur.desc}</span>
                <span
                  style={{
                    flexShrink: 0,
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#6b675f",
                  }}
                >
                  {len}
                </span>
              </div>
              <div
                aria-live="polite"
                style={{ fontSize: 12.5, lineHeight: 1.45, color: "#57534d", marginTop: 10, fontWeight: 600 }}
              >
                {note}
              </div>
            </div>
          </div>

          <div style={{ flex: "1 1 300px", minWidth: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            {HX.map((h) => {
              const on = h.id === hx;
              return (
                <button
                  key={h.id}
                  type="button"
                  className={s["hx-pick"]}
                  data-on={on ? "true" : "false"}
                  aria-pressed={on}
                  onClick={() => pick(h.id)}
                >
                  <span
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      background: on ? "#fff" : "var(--aq-periwinkle-soft)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      color: "#5941d6",
                    }}
                  >
                    <span className="material-icons-outlined" aria-hidden="true" style={icon(20)}>
                      {h.icon}
                    </span>
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: "block", fontWeight: 800, fontSize: 15, color: "#14130f" }}>{h.when}</span>
                    <span style={{ display: "block", fontSize: 13, color: "#57534d", fontWeight: 600, marginTop: 1 }}>
                      {h.name}
                    </span>
                  </span>
                  <span className="material-icons-outlined" aria-hidden="true" style={icon(20, { color: "#5941d6" })}>
                    graphic_eq
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 16 }} data-reveal="">
          <div className={s["hx-tier"]}>
            <div style={tierHead}>
              <span className="material-icons-outlined" aria-hidden="true" style={icon(19, { color: "#57534d" })}>
                do_not_disturb_on
              </span>
              Off
            </div>
            <div style={tierBody}>No vibration anywhere. Off means off.</div>
          </div>
          <div className={s["hx-tier"]} style={{ background: "var(--aq-periwinkle-soft)" }}>
            <div style={{ ...tierHead, color: "#31237c" }}>
              <span className="material-icons-outlined" aria-hidden="true" style={icon(19, { color: "#5941d6" })}>
                vibration
              </span>
              Essential
              <span
                style={{
                  fontSize: 10.5,
                  fontWeight: 800,
                  letterSpacing: ".06em",
                  textTransform: "uppercase",
                  color: "#5941d6",
                  background: "#fff",
                  borderRadius: 100,
                  padding: "2px 8px",
                }}
              >
                Default
              </span>
            </div>
            <div style={{ ...tierBody, color: "#3d3566" }}>
              The big moments: starting and ending a session, freezing and thawing.
            </div>
          </div>
          <div className={s["hx-tier"]}>
            <div style={tierHead}>
              <span className="material-icons-outlined" aria-hidden="true" style={icon(19, { color: "#57534d" })}>
                graphic_eq
              </span>
              Full
            </div>
            <div style={tierBody}>Every tap and toggle too, from ticking off a task to tapping Ada.</div>
          </div>
        </div>
        <p
          style={{
            textAlign: "center",
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "clamp(1.15rem,1.8vw,1.45rem)",
            lineHeight: 1.4,
            color: "#31237c",
            maxWidth: 620,
            margin: "clamp(28px,4vw,40px) auto 0",
          }}
        >
          Once a session starts, your phone stays still until it ends. Nothing taps you on the shoulder mid-thought.
        </p>
        <div style={{ textAlign: "center", marginTop: 22 }}>
          <Link className={s["aq-plink"]} href="/how-it-works#feel" style={{ fontSize: 15.5 }}>
            See, hear and feel a session{" "}
            <span className="material-icons-outlined" aria-hidden="true" style={icon(18)}>
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
