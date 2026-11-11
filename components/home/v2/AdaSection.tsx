"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AdaCube, TaskCard } from "@/components/ds";
import s from "./home.module.css";

/*
 * Ada demo (Home.dc.html section 8). The three first-step cards rise in, staggered,
 * the first time 30% of the section is on screen (the design's adaStep observer).
 */
export function AdaSection() {
  const ref = useRef<HTMLElement>(null);
  const [adaStep, setAdaStep] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
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
    o.observe(el);
    return () => o.disconnect();
  }, []);

  const adaVis = (i: number): CSSProperties => ({
    transition: `opacity .5s ${0.1 + i * 0.13}s,transform .5s ${0.1 + i * 0.13}s`,
    ...(adaStep >= 1 ? { opacity: 1, transform: "none" } : { opacity: 0, transform: "translateY(10px)" }),
  });

  return (
    <section
      ref={ref}
      id="aqAdaDemo"
      style={{ background: "#fff", padding: "clamp(48px,7vh,86px) clamp(20px,6vw,60px)" }}
    >
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
                  <TaskCard
                    title="Chem lab report: outline"
                    tag="Report"
                    dur="~35 min"
                    time="Mon"
                    bar
                    color="var(--aq-tag-report)"
                  />
                </div>
                <div style={adaVis(1)}>
                  <TaskCard
                    title="Problem set 1"
                    tag="Assignment"
                    dur="~30 min"
                    time="Tue"
                    bar
                    color="var(--aq-tag-assignment)"
                  />
                </div>
                <div style={adaVis(2)}>
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
            Ada · AI co-planner
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
            The pile becomes a first step.
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
            Type in everything you&apos;re behind on. Ada hands back a first step small enough to actually take,
            no lecture, no shame.
          </p>
          <Link className={s["aq-plink"]} href="/how-it-works#ada" style={{ fontSize: 15.5 }}>
            Meet Ada{" "}
            <span className="material-icons-outlined" aria-hidden="true" style={{ fontSize: 18 }}>
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
