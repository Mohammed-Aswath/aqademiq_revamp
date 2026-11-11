"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { IceTimer, TaskCard } from "@/components/ds";
import { useApp } from "@/components/site/AppProvider";
import s from "./home.module.css";

/*
 * Melt demo (Home.dc.html section 4). The first time 35% of the section is on
 * screen the cube melts over 4.6s (stepped every 60ms) and the linked task ticks
 * itself done — the design's runMeltDemo. Reduced motion skips straight to a
 * half-melted cube with the task already done.
 */

const DEMO_MS = 4600;
const STEP_MS = 60;
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

export function MeltSection() {
  const red = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [demoProgress, setDemoProgress] = useState(0);
  const [demoDone, setDemoDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    let timer: number | null = null;

    const runMeltDemo = () => {
      if (domReducedMotion()) {
        setDemoProgress(0.55);
        setDemoDone(true);
        return;
      }
      const start = performance.now();
      const step = () => {
        const p = Math.min(1, (performance.now() - start) / DEMO_MS);
        setDemoProgress(p);
        if (p < 1) timer = window.setTimeout(step, STEP_MS);
        else {
          timer = null;
          setDemoDone(true);
        }
      };
      step();
    };

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
    o.observe(el);
    return () => {
      o.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  const demoDrip = demoProgress > 0.04 && demoProgress < 0.97 && !red;
  const demoTaskDone = demoDone || demoProgress > 0.95;

  return (
    <section ref={ref} id="aqMeltDemo" style={{ padding: "clamp(48px,7vh,86px) clamp(20px,6vw,60px)" }}>
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
              {/*
                The approved render: the design passes size="128" as a string, so the
                timer's root gets an invalid `width/height: "128"` and collapses to its
                in-flow cube (77px) while the 128px ring overflows it; its
                style="margin-bottom:20px" lands on the x-import wrapper and is dropped.
                Width/height auto and no margin reproduce that layout exactly.
              */}
              <IceTimer
                progress={demoProgress}
                drip={demoDrip}
                expr="focused"
                size={128}
                style={{ width: "auto", height: "auto" }}
              />
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
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "#8e8a83",
              fontWeight: 600,
              marginBottom: 14,
            }}
          >
            Focus
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
            The calmest way to start.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.02rem,1.3vw,1.18rem)",
              lineHeight: 1.55,
              color: "#4a4742",
              margin: "0 0 20px",
              maxWidth: 440,
            }}
          >
            Start a session and the pressure drains out of the clock. A frosted cube melts while you work, until
            somewhere in there, you&apos;ve quietly started.
          </p>
          <Link className={s["aq-plink"]} href="/how-it-works#focus" style={{ fontSize: 15.5 }}>
            See how focus feels{" "}
            <span className="material-icons-outlined" aria-hidden="true" style={{ fontSize: 18 }}>
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
