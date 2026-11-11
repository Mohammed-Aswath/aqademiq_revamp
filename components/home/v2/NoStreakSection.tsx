import Link from "next/link";
import type { CSSProperties } from "react";
import { AdaCube, type AdaExpr } from "@/components/ds";
import s from "./home.module.css";

/*
 * No streak (Home.dc.html section 12). Static: the promise, a link to the
 * reasoning, and the five-step mood scale drawn as Ada melting.
 */

const SCALE: { rating: number; expr: AdaExpr; melt: number; label: string }[] = [
  { rating: 0, expr: "sad", melt: 0.9, label: "Rough" },
  { rating: 1, expr: "meh", melt: 0.6, label: "Tired" },
  { rating: 2, expr: "neutral", melt: 0.32, label: "OK" },
  { rating: 3, expr: "smile", melt: 0.12, label: "Good" },
  { rating: 4, expr: "happy", melt: 0, label: "Great" },
];

const step: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
};

export function NoStreakSection() {
  return (
    <section
      style={{
        background: "var(--aq-periwinkle-soft)",
        padding: "clamp(56px,8vh,100px) clamp(20px,6vw,60px)",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }} data-reveal="">
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 800,
            fontSize: "clamp(2rem,4.4vw,3.4rem)",
            letterSpacing: "-.03em",
            lineHeight: 1.06,
            margin: "0 0 18px",
            color: "#31237c",
            textWrap: "balance",
          }}
        >
          No streak to lose. No guilt. No pressure.
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(1.05rem,1.4vw,1.24rem)",
            lineHeight: 1.55,
            color: "#4a3f7a",
            maxWidth: 560,
            margin: "0 auto 18px",
            fontWeight: 500,
          }}
        >
          Miss a day and nothing breaks, no chain snaps, no guilt notification, no cube left to
          die. Progress that never turns into pressure.
        </p>
        <div style={{ marginBottom: 34 }}>
          <Link
            className={s["aq-plink"]}
            href="/how-it-works#streaks"
            style={{ fontSize: 15, color: "#31237c" }}
          >
            Why there&apos;s no streak to lose{" "}
            <span className="material-icons-outlined" aria-hidden="true" style={{ fontSize: 18 }}>
              arrow_forward
            </span>
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "clamp(10px,4vw,34px)",
            flexWrap: "wrap",
          }}
        >
          {SCALE.map((m) => (
            <div key={m.label} style={step}>
              <AdaCube size={54} rating={m.rating} expr={m.expr} melt={m.melt} />
              <span style={{ fontSize: 12, color: "#8478b0", fontWeight: 700 }}>{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
