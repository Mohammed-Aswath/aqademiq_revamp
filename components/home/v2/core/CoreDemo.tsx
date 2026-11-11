"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import s from "../home.module.css";

/* The Core: the app's text, fonts and drawing (ported from Home.dc.html's DCLogic). */
const CORE_DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"] as const;
const CORE_THAWS: Partial<Record<(typeof CORE_DAYS)[number], number>> = { TUE: 1, THU: 2, SUN: 1 };
const WEEK_MOODS: (number | null)[] = [1, 2, 2, null, 3, 4, 3];
const MOOD_TINT = ["#a79fc4", "#9286d2", "#7d70d9", "#6a5ce4", "#5a44f1"];
const CORE_CAPS = [
  "Your week",
  "The shape of the week",
  "The core itself",
  "One thing that happened",
  "The one numeral",
  "Where attention went",
  "When you thawed",
  "What the week gave back",
  "One small thing",
];
const BEATS = CORE_CAPS.length;
const AUTO_MS = 4400;
const DRILL_MS = 230;

function reduced(): boolean {
  try {
    if (document.documentElement.getAttribute("data-reduce-motion") === "true") return true;
  } catch {
    /* ignore */
  }
  return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}

const eyebrow: CSSProperties = {
  fontSize: 11,
  fontWeight: 800,
  letterSpacing: ".14em",
  color: "#a7a7a7",
  textTransform: "uppercase",
};
const bigLine: CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: 28,
  fontWeight: 800,
  lineHeight: 1.35,
  letterSpacing: "-.4px",
  textWrap: "pretty",
};
const caption: CSSProperties = { fontSize: 13, color: "#646464", lineHeight: 1.6, marginTop: 14 };
const attCol: CSSProperties = { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 9 };
const attBox: CSSProperties = { height: 56, display: "flex", alignItems: "flex-end", justifyContent: "center" };
const attLabel: CSSProperties = { fontSize: 11, fontWeight: 800, letterSpacing: ".04em", color: "#111717" };
const goCol: CSSProperties = { display: "flex", flexDirection: "column", alignItems: "center", gap: 7 };
const goLabel: CSSProperties = { fontSize: 11, fontWeight: 800, letterSpacing: ".1em", color: "#a7a7a7" };

export function CoreDemo() {
  const [beat, setBeat] = useState(0);
  const [landed, setLanded] = useState(7);

  const cardRef = useRef<HTMLDivElement>(null);
  const beatRef = useRef(0);
  const autoRef = useRef(true);
  const seenRef = useRef(false);
  const autoT = useRef<ReturnType<typeof setInterval> | null>(null);
  const drillT = useRef<ReturnType<typeof setInterval> | null>(null);

  const coreStop = useCallback(() => {
    if (autoT.current) {
      clearInterval(autoT.current);
      autoT.current = null;
    }
  }, []);

  const coreDrill = useCallback(() => {
    if (drillT.current) clearInterval(drillT.current);
    let n = 0;
    setLanded(0);
    drillT.current = setInterval(() => {
      n++;
      setLanded(n);
      if (n >= 7 && drillT.current) {
        clearInterval(drillT.current);
        drillT.current = null;
      }
    }, DRILL_MS);
  }, []);

  const coreGo = useCallback(
    (i: number, auto: boolean) => {
      const b = ((i % BEATS) + BEATS) % BEATS;
      if (!auto) {
        coreStop();
        autoRef.current = false;
      }
      beatRef.current = b;
      setBeat(b);
      if (b === 0 && !reduced()) coreDrill();
    },
    [coreDrill, coreStop],
  );

  useEffect(() => {
    const coreEl = cardRef.current?.closest("section");
    if (!coreEl) return;
    const coreStart = () => {
      if (reduced()) {
        setLanded(7);
        return;
      }
      if (!seenRef.current) {
        seenRef.current = true;
        coreDrill();
      }
      if (autoRef.current && !autoT.current) {
        autoT.current = setInterval(() => {
          if (autoRef.current) coreGo(beatRef.current + 1, true);
        }, AUTO_MS);
      }
    };
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) coreStart();
          else coreStop();
        });
      },
      { threshold: 0.3 },
    );
    io.observe(coreEl);
    return () => {
      io.disconnect();
      coreStop();
      if (drillT.current) {
        clearInterval(drillT.current);
        drillT.current = null;
      }
    };
  }, [coreDrill, coreGo, coreStop]);

  const cb = beat;
  const settled = cb === 0 ? landed : 7;
  const coreBands = CORE_DAYS.map((d, i) => {
    const mood = WEEK_MOODS[i];
    const isLanded = i < settled;
    const empty = mood == null;
    const c = empty ? null : MOOD_TINT[mood];
    let look: CSSProperties;
    if (!isLanded) look = { background: "transparent", border: "1.5px dashed #e6e2db" };
    else if (empty) look = { background: "transparent", border: "1.5px dashed #d6d2ca" };
    else look = { background: `${c}3a`, border: `1.5px solid ${c}4d` };
    return {
      d,
      bub: isLanded && !empty,
      style: { height: "100%", borderRadius: 7, transition: "background 400ms ease", ...look } as CSSProperties,
      labelColor: isLanded ? "#a7a7a7" : "#e2ded7",
    };
  });
  const coreDots = CORE_CAPS.map((x, i) => ({
    key: x,
    style: {
      height: 4,
      borderRadius: 2,
      background: i === cb ? "#6b5cf0" : "#e0e0e0",
      width: i === cb ? 22 : 6,
      transition: "width .25s,background .25s",
    } as CSSProperties,
  }));
  const coreThaws = CORE_DAYS.map((d) => {
    const n = CORE_THAWS[d] ?? 0;
    return { key: d, d: d.slice(0, 1), cracks: Array.from({ length: n }, (_, k) => k), none: n === 0, color: n ? "#111717" : "#a7a7a7" };
  });
  const coreCount = `0${cb + 1} / 09`;
  const coreShowCore = cb === 0 || cb === 2;
  const coreDrilling = cb === 0;
  const coreHeroCap = cb === 2;

  return (
    <div ref={cardRef} className={s["core-card"]} role="group" aria-label="The Core: a sample weekly report">
      <div className={s["core-scale"]}>
        <div className={s["core-native"]}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <span
              aria-hidden="true"
              style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", marginLeft: -12, flexShrink: 0 }}
            >
              <Image src="/assets/core/core-close.svg" width={20} height={20} sizes="20px" loading="eager" alt="" />
            </span>
            <div aria-hidden="true" style={{ display: "flex", gap: 5, marginBottom: 20 }}>
              {coreDots.map((d) => (
                <span key={d.key} style={d.style} />
              ))}
            </div>
            <span style={{ width: 32, flexShrink: 0 }} />
          </div>
          <div
            aria-live="polite"
            style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}
          >
            {coreShowCore && (
              <div className={s["fz-fade"]} style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                  <div style={{ paddingTop: 6 }}>
                    {coreBands.map((b) => (
                      <div key={b.d} style={{ height: 42, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                        <span style={{ fontSize: 7.5, fontWeight: 800, letterSpacing: ".1em", color: b.labelColor }}>{b.d}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ position: "relative", width: 104, height: 306, flexShrink: 0 }}>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "43.33px / 22px",
                        background: "rgba(255,255,255,.55)",
                        boxShadow: "0 6px 22px rgba(90,68,241,.13),inset 0 0 0 1.5px rgba(255,255,255,.9)",
                        overflow: "hidden",
                      }}
                    >
                      <div style={{ position: "absolute", top: 6, left: 0, right: 0, bottom: 6 }}>
                        {coreBands.map((b) => (
                          <div key={b.d} style={{ height: 42, position: "relative", padding: "2px 5px" }}>
                            <div style={b.style} />
                            {b.bub && (
                              <span style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                                <span
                                  style={{
                                    position: "absolute",
                                    top: 12.6,
                                    left: 13,
                                    width: 3.5,
                                    height: 3.5,
                                    borderRadius: "50%",
                                    background: "rgba(255,255,255,.85)",
                                  }}
                                />
                                <span
                                  style={{
                                    position: "absolute",
                                    top: 24.4,
                                    left: 21,
                                    width: 2.2,
                                    height: 2.2,
                                    borderRadius: "50%",
                                    background: "rgba(255,255,255,.7)",
                                  }}
                                />
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          top: 8,
                          bottom: 8,
                          left: 14.56,
                          width: 10.4,
                          borderRadius: 99,
                          background: "linear-gradient(rgba(255,255,255,.9),rgba(255,255,255,.25))",
                          filter: "blur(1.5px)",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: -1,
                        left: 3,
                        right: 3,
                        height: 13,
                        borderRadius: "50%",
                        border: "1.5px solid rgba(255,255,255,.95)",
                        background: "rgba(255,255,255,.5)",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                </div>
                {coreDrilling && (
                  <div style={{ fontSize: 15, color: "#a7a7a7", fontWeight: 600, marginTop: 22, letterSpacing: ".02em" }}>
                    Drilling your week…
                  </div>
                )}
                {coreHeroCap && (
                  <div style={{ fontSize: 13, color: "#646464", lineHeight: 1.6, textAlign: "center", marginTop: 20, padding: "0 6px" }}>
                    Each band is a day, Monday at the top. Tint is that day&apos;s mood. Thursday has nothing logged, so it stays an open
                    band.
                  </div>
                )}
              </div>
            )}

            {cb === 1 && (
              <div className={s["fz-fade"]} style={{ textAlign: "center", paddingBottom: 40 }}>
                <div style={eyebrow}>The shape of the week</div>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 34,
                    fontWeight: 800,
                    lineHeight: 1.28,
                    letterSpacing: "-.6px",
                    marginTop: 12,
                    textWrap: "pretty",
                  }}
                >
                  “A quiet start,
                  <br />
                  then three days
                  <br />
                  that held.”
                </div>
              </div>
            )}

            {cb === 3 && (
              <div
                className={s["fz-fade"]}
                style={{ textAlign: "center", paddingBottom: 40, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <div style={eyebrow}>One thing that happened</div>
                <div style={{ ...bigLine, margin: "12px 0 18px" }}>Wednesday, you finished the reading you&apos;d moved twice.</div>
                <div
                  style={{
                    alignSelf: "stretch",
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    background: "#eceff3",
                    borderRadius: 14,
                    padding: "11px 13px",
                    textAlign: "left",
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#5cbbff", flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>Read Ch. 4: Normalization</div>
                    <div style={{ fontSize: 12, color: "#646464", marginTop: 1 }}>NLP 302 · Wednesday</div>
                  </div>
                </div>
              </div>
            )}

            {cb === 4 && (
              <div className={s["fz-fade"]} style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: 30 }}>
                <div
                  style={{
                    fontFamily: "var(--font-playfair),Georgia,serif",
                    fontSize: 132,
                    fontWeight: 800,
                    lineHeight: 0.85,
                    letterSpacing: "-4px",
                    color: "#111717",
                  }}
                >
                  6
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: ".2em", color: "#a7a7a7", marginTop: 16 }}>DAYS ON THE BOARD</div>
              </div>
            )}

            {cb === 5 && (
              <div
                className={s["fz-fade"]}
                style={{ textAlign: "center", paddingBottom: 30, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <div style={eyebrow}>Where attention went</div>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "22px 0 6px", alignSelf: "stretch" }}>
                  <div style={attCol}>
                    <div style={attBox}>
                      <Image src="/assets/core/att-1.svg" width={44} height={44} sizes="44px" loading="eager" alt="" />
                    </div>
                    <span style={attLabel}>CC 401</span>
                  </div>
                  <div style={attCol}>
                    <div style={attBox}>
                      <Image src="/assets/core/att-2.svg" width={41} height={41} sizes="41px" loading="eager" alt="" />
                    </div>
                    <span style={attLabel}>NET 305</span>
                  </div>
                  <div style={attCol}>
                    <div style={attBox}>
                      <Image src="/assets/core/att-3.svg" width={39} height={39} sizes="39px" loading="eager" alt="" />
                    </div>
                    <span style={attLabel}>NLP 302</span>
                  </div>
                  <div style={attCol}>
                    <div style={attBox}>
                      <div style={{ width: 34, height: 34, borderRadius: 10, border: "1.5px dashed #d6d2ca" }} />
                    </div>
                    <span style={{ ...attLabel, color: "transparent" }}>–</span>
                  </div>
                </div>
                <div style={caption}>Compilers took the most of your week. The crisper the cube, the more of your attention it held.</div>
              </div>
            )}

            {cb === 6 && (
              <div
                className={s["fz-fade"]}
                style={{ textAlign: "center", paddingBottom: 30, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <div style={eyebrow}>When you thawed</div>
                <div style={{ ...bigLine, margin: "12px 0 24px" }}>The ice held, and you opened it when you needed to.</div>
                <div style={{ alignSelf: "stretch", display: "flex", background: "#eceff3", borderRadius: 18, padding: "18px 8px 14px" }}>
                  {coreThaws.map((t) => (
                    <div key={t.key} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                      <div style={{ height: 70, display: "flex", flexDirection: "column-reverse", alignItems: "center", gap: 4 }}>
                        {t.cracks.map((k) => (
                          <Image key={k} src="/assets/core/crack.svg" width={30} height={30} sizes="30px" loading="eager" alt="" />
                        ))}
                        {t.none && (
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(0,0,0,.07)", marginBottom: 12 }} />
                        )}
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".08em", color: t.color }}>{t.d}</span>
                    </div>
                  ))}
                </div>
                <div style={{ ...caption, textWrap: "pretty" }}>
                  Each cracked cube is one thaw, on the day it happened. Every one waited a breath first.
                </div>
              </div>
            )}

            {cb === 7 && (
              <div
                className={s["fz-fade"]}
                style={{ textAlign: "center", paddingBottom: 30, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <div style={eyebrow}>What the week gave back</div>
                <div style={{ ...bigLine, margin: "12px 0 20px" }}>You finished most sessions feeling better than you started them.</div>
                <div
                  style={{
                    alignSelf: "stretch",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 20,
                    background: "#eceff3",
                    borderRadius: 16,
                    padding: "16px 12px",
                  }}
                >
                  <div style={goCol}>
                    <Image src="/assets/core/go-in.svg" width={40} height={40} sizes="40px" loading="eager" alt="" />
                    <span style={goLabel}>GOING IN</span>
                  </div>
                  <Image src="/assets/core/go-forward.svg" width={20} height={20} sizes="20px" loading="eager" alt="" />
                  <div style={goCol}>
                    <Image src="/assets/core/go-out.svg" width={40} height={40} sizes="40px" loading="eager" alt="" />
                    <span style={goLabel}>COMING OUT</span>
                  </div>
                </div>
              </div>
            )}

            {cb === 8 && (
              <div className={s["fz-fade"]} style={{ paddingBottom: 24, width: "100%" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <Image src="/assets/core/ada-28.svg" width={28} height={28} sizes="28px" loading="eager" alt="" style={{ flexShrink: 0 }} />
                  <div style={{ fontSize: 15, color: "#111717", lineHeight: 1.6 }}>
                    One small thing for next week, or just tomorrow&apos;s check-in, if that&apos;s the size that fits.
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 11,
                    background: "#edeafd",
                    border: "1.5px solid #6b5cf055",
                    borderRadius: 16,
                    padding: "13px 14px",
                    margin: "18px 0 10px",
                  }}
                >
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 10,
                      background: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Image src="/assets/core/wind-down.svg" width={20} height={20} sizes="20px" loading="eager" alt="" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 17, fontWeight: 800 }}>Tomorrow&apos;s check-in</div>
                    <div style={{ fontSize: 13, color: "#646464", marginTop: 1 }}>Two taps, in the morning.</div>
                  </div>
                </div>
                <div
                  aria-hidden="true"
                  style={{
                    width: "100%",
                    height: 50,
                    borderRadius: 100,
                    background: "#111717",
                    color: "#fff",
                    fontSize: 17,
                    fontWeight: 800,
                    letterSpacing: ".01em",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Keep it
                </div>
                <div aria-hidden="true" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 14 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 15, fontWeight: 700, color: "#646464" }}>
                    <Image src="/assets/core/share.svg" width={19} height={19} sizes="19px" loading="eager" alt="" />
                    Share the shape
                  </span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#646464" }}>Not this time</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "10px 4px 2px" }}>
        <button type="button" className={s["core-nav"]} onClick={() => coreGo(cb - 1, false)} aria-label="Previous beat">
          <span className="material-icons-outlined" aria-hidden="true" style={{ fontSize: 22 }}>
            chevron_left
          </span>
        </button>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, color: "#57534d" }}>{coreCount}</span>
        <button type="button" className={s["core-nav"]} onClick={() => coreGo(cb + 1, false)} aria-label="Next beat">
          <span className="material-icons-outlined" aria-hidden="true" style={{ fontSize: 22 }}>
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
}
