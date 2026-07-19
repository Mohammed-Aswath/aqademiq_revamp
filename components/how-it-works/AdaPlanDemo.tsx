"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AdaCube, TaskCard } from "@/components/ds";
import styles from "./howItWorks.module.css";

function adaVis(i: number, shown: boolean): CSSProperties {
  return {
    transition: `opacity .5s ${0.1 + i * 0.13}s, transform .5s ${0.1 + i * 0.13}s`,
    opacity: shown ? 1 : 0,
    transform: shown ? "none" : "translateY(10px)",
  };
}

/**
 * The "Ada" chat panel — three planned task cards fade/slide in, staggered, the
 * first time the panel scrolls into view. Mirrors the original adaStep demo.
 */
export function AdaPlanDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries, ob) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            ob.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      style={{ flex: 1.05, minWidth: 290, display: "flex", justifyContent: "center" }}
      data-reveal=""
    >
      <div className={styles.panel}>
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
            <div style={adaVis(0, shown)}>
              <TaskCard
                title="Chem lab report: outline"
                tag="Report"
                dur="~35 min"
                time="Mon"
                bar
                color="var(--aq-tag-report)"
              />
            </div>
            <div style={adaVis(1, shown)}>
              <TaskCard
                title="Problem set 1"
                tag="Assignment"
                dur="~30 min"
                time="Tue"
                bar
                color="var(--aq-tag-assignment)"
              />
            </div>
            <div style={adaVis(2, shown)}>
              <TaskCard
                title="Read chapter 4"
                tag="Reading"
                dur="~25 min"
                time="Wed"
                bar
                color="var(--aq-tag-reading)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdaPlanDemo;
