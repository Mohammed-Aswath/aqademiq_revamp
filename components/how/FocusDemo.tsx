"use client";

import { useEffect, useRef, useState } from "react";
import { IceTimer } from "@/components/ds";
import { readReduced, useReducedMotion } from "./useReducedMotion";

/**
 * The Focus panel (#hiwFocus). The first time 40% of it is on screen the
 * IceTimer melts 0 → 1 over 5.2s in 70ms steps (the design's runFocus());
 * with reduced motion it jumps to half-melted and never drips.
 */
/**
 * The design passes size="128" as a string and style="margin-bottom:12px" on
 * the x-import host. The DC runtime drops the host style, and the unitless
 * string width/height are invalid CSS, so the approved render has a timer root
 * that shrinks to the 76.8px cube (the ring overflows it) and no margin. Auto
 * sizing reproduces that box exactly.
 */
const IN_DESIGN_RENDER = { width: "auto", height: "auto" } as const;

export function FocusDemo({ panelClassName }: { panelClassName: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [focusMelt, setFocusMelt] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let timer: number | undefined;

    const runFocus = () => {
      if (readReduced()) {
        setFocusMelt(0.5);
        return;
      }
      const dur = 5200;
      const start = performance.now();
      const step = () => {
        const p = Math.min(1, (performance.now() - start) / dur);
        setFocusMelt(p);
        if (p < 1) timer = window.setTimeout(step, 70);
      };
      step();
    };

    const io = new IntersectionObserver(
      (entries, ob) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            runFocus();
            ob.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  const focusDrip = focusMelt > 0.04 && focusMelt < 0.97 && !reduced;

  return (
    <div
      ref={rootRef}
      id="hiwFocus"
      style={{ flex: 1.05, minWidth: 290, display: "flex", justifyContent: "center" }}
      data-reveal=""
    >
      <div className={panelClassName}>
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
            style={IN_DESIGN_RENDER}
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
