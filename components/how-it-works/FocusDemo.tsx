"use client";

import { useEffect, useRef, useState } from "react";
import { IceTimer } from "@/components/ds";
import styles from "./howItWorks.module.css";

function reducedMotion(): boolean {
  try {
    if (document.documentElement.getAttribute("data-reduce-motion") === "true") return true;
  } catch {}
  return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}

/**
 * The "Focus" panel — a frosted IceTimer that melts (progress 0 → 1 over 5.2s)
 * the first time it scrolls into view. Mirrors the original runFocus() demo.
 */
export function FocusDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [focusMelt, setFocusMelt] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    let raf = 0;
    const run = () => {
      if (started.current) return;
      started.current = true;
      if (reducedMotion()) {
        setFocusMelt(0.5);
        return;
      }
      const dur = 5200;
      const start = performance.now();
      const step = () => {
        const p = Math.min(1, (performance.now() - start) / dur);
        setFocusMelt(p);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries, ob) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            run();
            ob.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const focusDrip = focusMelt > 0.04 && focusMelt < 0.97;

  return (
    <div
      ref={rootRef}
      id="hiwFocus"
      style={{ flex: 1.05, minWidth: 290, display: "flex", justifyContent: "center" }}
      data-reveal=""
    >
      <div className={styles.panel}>
        <div
          style={{
            background: "#fff",
            borderRadius: 26,
            boxShadow: "0 16px 44px rgba(49,35,124,.12)",
            padding: "40px 20px",
            width: "100%",
            maxWidth: 324,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            minHeight: 340,
          }}
        >
          <IceTimer
            progress={focusMelt}
            drip={focusDrip}
            expr="focused"
            size={128}
            style={{ marginBottom: 12 }}
          />
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12.5,
              fontWeight: 700,
              color: "#5941d6",
              background: "var(--aq-periwinkle-soft)",
              padding: "7px 13px",
              borderRadius: 100,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6b5cf0" }} />
            Deep Work · 25:00
          </div>
        </div>
      </div>
    </div>
  );
}

export default FocusDemo;
