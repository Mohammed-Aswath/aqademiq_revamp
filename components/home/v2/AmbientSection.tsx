"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties } from "react";
import s from "./home.module.css";

/* Ambient surfaces: the app's own frames (ported from Home.dc.html's DCLogic). */

type TabId = "lock" | "island" | "standby" | "widgets" | "watch";
type Act = "toggle" | "openIsland" | "islandFreeze" | "end" | "start5";
type Hot = { r: [number, number, number, number]; label: string; act: Act };

const AMB: { id: TabId; label: string; icon: string; title: string; caption: string }[] = [
  {
    id: "lock",
    label: "Lock Screen",
    icon: "lock",
    title: "A Live Activity on your Lock Screen",
    caption:
      "The session sits on your Lock Screen with a live clock. One press freezes it and the clock turns to ice. One press brings it back.",
  },
  {
    id: "island",
    label: "Dynamic Island",
    icon: "smartphone",
    title: "The Dynamic Island",
    caption:
      "Time left at a glance while you use other apps. Tap or long-press for Freeze and End. It shares the island politely with a call.",
  },
  {
    id: "standby",
    label: "StandBy",
    icon: "battery_charging_full",
    title: "StandBy",
    caption:
      "Charging on its side, your phone becomes a desk clock for the session, readable from across the room.",
  },
  {
    id: "widgets",
    label: "Widgets",
    icon: "widgets",
    title: "Home Screen widgets",
    caption:
      "Three widgets, one job each: what’s next, how your week felt, and Start 5 min without opening anything. Try it.",
  },
  {
    id: "watch",
    label: "Apple Watch",
    icon: "watch",
    title: "Apple Watch",
    caption: "Freeze, resume or end from your wrist, with the haptics your wrist already knows.",
  },
];

const AMB_ALT: Record<string, string> = {
  "la-lock": "Lock Screen Live Activity: Deep Work, LL(1) parsing notes, 14:32 left, with a freeze button",
  "la-lock-frozen": "Lock Screen Live Activity, frozen: the clock turns to ice, with a resume button",
  "la-island": "Dynamic Island: the session cube and 14:32",
  "la-island-frozen": "Dynamic Island, frozen: the clock in ice",
  "la-island-expanded":
    "Expanded Dynamic Island: LL(1) parsing notes, CC 401, Deep Work, 14:32, with Freeze and End",
  "la-standby": "StandBy: Deep Work, 14:32, LL(1) parsing notes, with Freeze and End",
  "la-standby-frozen": "StandBy, frozen: the clock turns to ice, with Resume and End",
  "wg-home":
    "Home Screen widgets: Next, Networks revision at 2:00 PM. Focus, with Start 5 min. This week’s moods",
};

const AG: Record<TabId, string[]> = {
  lock: ["la-lock", "la-lock-frozen"],
  island: ["la-island", "la-island-frozen", "la-island-expanded"],
  standby: ["la-standby", "la-standby-frozen"],
  widgets: ["wg-home"],
  watch: [],
};

const AH: Record<string, Hot[]> = {
  "la-lock": [{ r: [79.5, 76.5, 15.5, 8.5], label: "Freeze the session", act: "toggle" }],
  "la-lock-frozen": [{ r: [79.5, 76.5, 15.5, 8.5], label: "Resume the session", act: "toggle" }],
  "la-island": [{ r: [20.65, 1.26, 58.71, 4.23], label: "Open the Live Activity", act: "openIsland" }],
  "la-island-frozen": [{ r: [20.65, 1.26, 58.71, 4.23], label: "Resume the session", act: "toggle" }],
  "la-island-expanded": [
    { r: [7.71, 12.47, 41.29, 5.03], label: "Freeze the session", act: "islandFreeze" },
    { r: [51, 12.47, 41.29, 5.03], label: "End the session", act: "end" },
  ],
  "la-standby": [
    { r: [35.24, 70.52, 16.7, 10.95], label: "Freeze the session", act: "toggle" },
    { r: [52.86, 70.52, 16.7, 10.95], label: "End the session", act: "end" },
  ],
  "la-standby-frozen": [
    { r: [35.24, 70.52, 16.7, 10.95], label: "Resume the session", act: "toggle" },
    { r: [52.86, 70.52, 16.7, 10.95], label: "End the session", act: "end" },
  ],
  "wg-home": [{ r: [56.47, 21.28, 35.32, 5.03], label: "Start 5 minutes", act: "start5" }],
};

const VIB = {
  crystallise: [6, 64, 7, 48, 8, 34, 9, 24, 10, 14, 28],
  melt: [90, 60, 12, 140, 9],
  latch: [12, 16, 8],
};

function buzz(p: number[]) {
  try {
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") navigator.vibrate(p);
  } catch {
    /* ignore */
  }
}

const box = (r: Hot["r"]): CSSProperties => ({
  left: `${r[0]}%`,
  top: `${r[1]}%`,
  width: `${r[2]}%`,
  height: `${r[3]}%`,
});

const QUICK = [
  { icon: "toggle_on", title: "Control Center", body: "Start five minutes without opening anything." },
  { icon: "smart_button", title: "Action button", body: "On iPhone 15 Pro and later. One press, five minutes." },
  { icon: "grid_view", title: "Quick Settings tile", body: "On Android. The same five minutes, one tap." },
  {
    icon: "notifications_active",
    title: "Android status chip",
    body: "Your session and App freeze, live in the notification shade.",
  },
];

export function AmbientSection() {
  const [ambTab, setAmbTab] = useState<TabId>("lock");
  const [ambFrozen, setAmbFrozen] = useState(false);
  const [ambIsl, setAmbIsl] = useState(false);

  const ambToggle = () => {
    const v = !ambFrozen;
    buzz(v ? VIB.crystallise : VIB.melt);
    setAmbFrozen(v);
  };
  const ambEnd = () => {
    buzz(VIB.melt);
    setAmbFrozen(false);
    setAmbIsl(false);
  };
  const ambStart5 = () => {
    buzz(VIB.latch);
    setAmbTab("lock");
    setAmbFrozen(false);
    setAmbIsl(false);
  };
  const run = (act: Act) => {
    if (act === "toggle") ambToggle();
    else if (act === "openIsland") setAmbIsl(true);
    else if (act === "islandFreeze") {
      ambToggle();
      setAmbIsl(false);
    } else if (act === "end") ambEnd();
    else ambStart5();
  };

  const at = ambTab;
  const af = ambFrozen;
  const amb = AMB.find((a) => a.id === at) ?? AMB[0];
  let akey = "la-watch";
  if (at === "lock") akey = af ? "la-lock-frozen" : "la-lock";
  else if (at === "island") akey = ambIsl ? "la-island-expanded" : af ? "la-island-frozen" : "la-island";
  else if (at === "standby") akey = af ? "la-standby-frozen" : "la-standby";
  else if (at === "widgets") akey = "wg-home";

  const isPhone = at === "lock" || at === "island" || at === "widgets";
  const isStandby = at === "standby";
  const isWatch = at === "watch";
  const canFreeze = at === "lock" || at === "island" || at === "standby";

  const frames = (sizes: string) =>
    AG[at].map((k) => {
      const on = k === akey;
      return (
        <Image
          key={k}
          src={`/assets/frames/${k}.webp`}
          alt={on ? AMB_ALT[k] : ""}
          aria-hidden={on ? "false" : "true"}
          fill
          sizes={sizes}
          style={{ display: "block", transition: "opacity .35s ease", opacity: on ? 1 : 0 }}
        />
      );
    });
  /* Keyed by index, as the design's sc-for reuses its buttons: focus survives a hotspot press. */
  const hots = (AH[akey] ?? []).map((h, i) => (
    <button
      key={i}
      type="button"
      className={s["amb-hot"]}
      onClick={() => run(h.act)}
      aria-label={h.label}
      style={box(h.r)}
    />
  ));

  return (
    <section
      id="ambient"
      style={{
        background: "#0e0e0e",
        color: "#f4f3f0",
        padding: "clamp(60px,9vh,110px) clamp(20px,6vw,60px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: -180,
          width: "min(900px,120vw)",
          height: 620,
          transform: "translateX(-50%)",
          background: "radial-gradient(ellipse at center,rgba(107,92,240,.28),transparent 66%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative" }}>
        <div
          style={{ textAlign: "center", maxWidth: 740, margin: "0 auto clamp(26px,4vw,40px)" }}
          data-reveal=""
        >
          <div className={s["aq-eyerow"]}>
            <span className={s.e} style={{ color: "#cbbcfd" }}>
              Lock Screen · Dynamic Island · StandBy · Watch
            </span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 800,
              fontSize: "clamp(2rem,4.2vw,3.3rem)",
              letterSpacing: "-.03em",
              lineHeight: 1.05,
              margin: "0 0 18px",
              color: "#fff",
              textWrap: "balance",
            }}
          >
            Your session, wherever you glance.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.03rem,1.35vw,1.2rem)",
              lineHeight: 1.55,
              color: "rgba(244,243,240,.74)",
              maxWidth: 580,
              margin: "0 auto",
            }}
          >
            A running session lives on your Lock Screen, in the Dynamic Island, on StandBy and on your wrist.
            Freeze it or end it right there, without opening the app.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Surfaces"
          style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}
          data-reveal=""
        >
          {AMB.map((a) => {
            const on = a.id === at;
            return (
              <button
                key={a.id}
                type="button"
                className={s["amb-tab"]}
                role="tab"
                data-on={on ? "true" : "false"}
                aria-selected={on}
                onClick={() => {
                  setAmbTab(a.id);
                  setAmbIsl(false);
                }}
              >
                <span className="material-icons-outlined" aria-hidden="true" style={{ fontSize: 17 }}>
                  {a.icon}
                </span>
                {a.label}
              </button>
            );
          })}
        </div>

        <div className={s["amb-stage"]}>
          {isPhone && (
            <div className={s["amb-phone"]}>
              {frames("300px")}
              {hots}
            </div>
          )}
          {isStandby && (
            <div className={s["amb-land"]}>
              {frames("(max-width: 660px) calc(100vw - 58px), 600px")}
              {hots}
            </div>
          )}
          {isWatch && (
            <div className={s["fz-fade"]} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                aria-hidden="true"
                style={{
                  width: 136,
                  height: 92,
                  borderRadius: "26px 26px 6px 6px",
                  background: "#1f1c26",
                  marginBottom: -14,
                }}
              />
              <Image
                src="/assets/frames/la-watch.webp"
                alt="Apple Watch: the session cube, 14:32 left, with Freeze and End buttons"
                width={228}
                height={270}
                sizes="228px"
                style={{ position: "relative", display: "block", width: 228, height: "auto" }}
              />
              <div
                aria-hidden="true"
                style={{
                  width: 136,
                  height: 92,
                  borderRadius: "6px 6px 26px 26px",
                  background: "#1f1c26",
                  marginTop: -14,
                }}
              />
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "14px 24px",
            maxWidth: 820,
            margin: "0 auto",
            padding: "18px 22px",
            borderRadius: 22,
            background: "rgba(255,255,255,.05)",
            border: "1px solid rgba(255,255,255,.08)",
          }}
        >
          <div aria-live="polite" style={{ flex: "1 1 320px", minWidth: 0 }}>
            <div style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>{amb.title}</div>
            <div style={{ fontSize: 14, lineHeight: 1.55, color: "rgba(244,243,240,.72)", marginTop: 3 }}>
              {amb.caption}
            </div>
          </div>
          {canFreeze && (
            <button
              type="button"
              onClick={ambToggle}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                height: 44,
                padding: "0 20px",
                border: "none",
                borderRadius: 100,
                background: "#cbbcfd",
                color: "#14130f",
                fontFamily: "var(--font-sans)",
                fontWeight: 800,
                fontSize: 14.5,
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <span className="material-icons-outlined" aria-hidden="true" style={{ fontSize: 19 }}>
                {af ? "play_arrow" : "ac_unit"}
              </span>
              {/* Its own flex item, as the design's interpolation span was: the 7px gap sits
                  between the verb and "the session" in the approved render. */}
              <span>{af ? "Resume" : "Freeze"}</span> the session
            </button>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
            gap: 12,
            marginTop: "clamp(28px,4vw,44px)",
          }}
          data-reveal=""
        >
          {QUICK.map((q) => (
            <div key={q.title} className={s["amb-quick"]}>
              <span
                className="material-icons-outlined"
                aria-hidden="true"
                style={{ fontSize: 21, color: "#cbbcfd", flexShrink: 0 }}
              >
                {q.icon}
              </span>
              <span style={{ fontSize: 14, lineHeight: 1.5, color: "rgba(244,243,240,.72)" }}>
                <b style={{ color: "#fff", display: "block", marginBottom: 2 }}>{q.title}</b>
                {q.body}
              </span>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 28 }}>
          <Link className={s["amb-link"]} href="/how-it-works#ambient">
            Every surface, explained{" "}
            <span className="material-icons-outlined" aria-hidden="true" style={{ fontSize: 18 }}>
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
