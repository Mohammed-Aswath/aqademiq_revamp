"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { TaskCard } from "@/components/ds";

function adaVis(i: number, shown: boolean): CSSProperties {
  const d = `${0.1 + i * 0.13}s`;
  return {
    transition: `opacity .5s ${d},transform .5s ${d}`,
    ...(shown ? { opacity: 1, transform: "none" } : { opacity: 0, transform: "translateY(10px)" }),
  };
}

/**
 * Ada's three planned steps. They fade and rise in, staggered, the first time
 * 30% of the #ada section is on screen (the design's adaStep).
 */
export function AdaPlanSteps() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = rootRef.current?.closest("#ada") ?? rootRef.current;
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
    <div ref={rootRef} style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 2 }}>
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
  );
}

export default AdaPlanSteps;
