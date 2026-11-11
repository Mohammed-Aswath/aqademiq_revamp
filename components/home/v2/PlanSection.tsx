import Link from "next/link";
import type { CSSProperties } from "react";
import { TaskCard } from "@/components/ds";
import s from "./home.module.css";

/*
 * Plan (Home.dc.html section 6). Static: copy on one side, a "Today" phone card
 * of grouped tasks on the other. The row wraps in reverse so the card sits on
 * top on narrow screens.
 */

const groupLabel: CSSProperties = {
  fontSize: 10,
  fontWeight: 800,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "#a8a49c",
  marginBottom: 8,
};

export function PlanSection() {
  return (
    <section style={{ background: "#fff", padding: "clamp(48px,7vh,86px) clamp(20px,6vw,60px)" }}>
      <div
        style={{
          maxWidth: 1040,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap-reverse",
          gap: "clamp(30px,5vw,64px)",
          alignItems: "center",
        }}
      >
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
            Plan
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
            A plan that fits on one calm screen.
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
            Just today. Gentle groups, soft subject colors, honest sizes. Not a wall of everything you&apos;re
            behind on.
          </p>
          <Link className={s["aq-plink"]} href="/how-it-works#plan" style={{ fontSize: 15.5 }}>
            See planning{" "}
            <span className="material-icons-outlined" aria-hidden="true" style={{ fontSize: 18 }}>
              arrow_forward
            </span>
          </Link>
        </div>
        <div style={{ flex: 1.05, minWidth: 290, display: "flex", justifyContent: "center" }} data-reveal="">
          <div
            style={{
              background: "var(--aq-periwinkle-soft)",
              borderRadius: 34,
              padding: "clamp(26px,3.5vw,42px)",
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
                padding: "20px 18px",
                width: 290,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 18, color: "#14130f" }}>
                  Today
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#8e8a83", fontWeight: 600 }}>
                  Tue 14
                </span>
              </div>
              <div style={groupLabel}>Anytime (2)</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                <TaskCard title="Read chapter 4" tag="Reading" dur="~25 min" color="var(--aq-tag-reading)" />
                <TaskCard title="Review flashcards" tag="Class" dur="~15 min" color="var(--aq-tag-class)" />
              </div>
              <div style={groupLabel}>Planned</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <TaskCard title="Chemistry lecture" tag="Lecture" time="09:00" bar color="var(--aq-tag-lecture)" />
                <TaskCard title="Essay: opening" tag="Report" time="14:00" bar color="var(--aq-tag-report)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
