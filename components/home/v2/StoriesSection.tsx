import Link from "next/link";
import type { CSSProperties } from "react";
import { testiRows, type TestimonialCard } from "@/lib/testimonials";
import s from "./home.module.css";

/*
 * Student stories (Home.dc.html section 13). Two CSS marquee rows running in
 * opposite directions; each track holds its five cards four times so the
 * -50% keyframe loops seamlessly. Pause-on-hover and reduce-motion live in
 * home.module.css. The testimonial data is unchanged from V1.
 */

const ROW1: TestimonialCard[] = testiRows(0);
const ROW2: TestimonialCard[] = testiRows(5);

const star: CSSProperties = { fontSize: 16, color: "#e8a430" };
const clip: CSSProperties = { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };

function Card({ t, copy }: { t: TestimonialCard; copy: boolean }) {
  return (
    <div
      className={s["aq-tcard"]}
      aria-hidden={copy || undefined}
      style={{
        flexShrink: 0,
        width: 338,
        marginRight: 18,
        background: "#fff",
        border: "1px solid rgba(0,0,0,.06)",
        borderRadius: 20,
        padding: 26,
        boxShadow: "0 2px 16px rgba(0,0,0,.05)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <span
        className="material-icons-outlined"
        aria-hidden="true"
        style={{ fontSize: 30, color: "rgba(107,92,240,.24)", marginBottom: 4 }}
      >
        format_quote
      </span>
      <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="material-icons-outlined" aria-hidden="true" style={star}>
            star
          </span>
        ))}
      </div>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 14.5,
          lineHeight: 1.6,
          color: "#3f3d3a",
          margin: "0 0 20px",
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        “{t.quote}”
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto" }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            background: "var(--aq-periwinkle-soft)",
            color: "#5941d6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: 14,
            flexShrink: 0,
            fontFamily: "var(--font-sans)",
          }}
        >
          {t.initials}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 800, fontSize: 14.5, color: "#14130f", ...clip }}>{t.name}</div>
          <div style={{ fontSize: 12.5, color: "#736f68", ...clip }}>{t.major}</div>
          <div style={{ fontSize: 12.5, color: "#a8a49c", ...clip }}>{t.university}</div>
        </div>
      </div>
    </div>
  );
}

function Row({ cards, dir }: { cards: TestimonialCard[]; dir: "aq-mq-left" | "aq-mq-right" }) {
  return (
    <div className={s["aq-mq-row"]} style={{ position: "relative", overflow: "hidden", padding: "14px 0" }}>
      <div className={`${s["aq-mq-fade"]} ${s["aq-mq-fade-l"]}`} />
      <div className={`${s["aq-mq-fade"]} ${s["aq-mq-fade-r"]}`} />
      <div className={`${s["aq-mq-track"]} ${s[dir]}`} style={{ display: "flex", width: "max-content" }}>
        {cards.map((t, i) => (
          // The track repeats its five cards four times for the loop; only the
          // first five are exposed to assistive tech.
          <Card key={i} t={t} copy={i >= 5} />
        ))}
      </div>
    </div>
  );
}

export function StoriesSection() {
  return (
    <section style={{ padding: "clamp(56px,8vh,104px) 0", overflow: "hidden", background: "var(--aq-paper)" }}>
      <div
        style={{ maxWidth: 860, margin: "0 auto", padding: "0 clamp(20px,6vw,60px)", textAlign: "center" }}
        data-reveal=""
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            padding: "8px 15px",
            background: "var(--aq-periwinkle-soft)",
            borderRadius: 100,
            marginBottom: 20,
          }}
        >
          <span className="material-icons-outlined" aria-hidden="true" style={{ fontSize: 16, color: "#e8a430" }}>
            star
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11.5,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "#5941d6",
              fontWeight: 700,
            }}
          >
            Student stories
          </span>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 800,
            fontSize: "clamp(1.9rem,3.8vw,2.9rem)",
            letterSpacing: "-.028em",
            lineHeight: 1.06,
            margin: "0 0 16px",
            color: "#14130f",
            textWrap: "balance",
          }}
        >
          Real students, real <span style={{ color: "#6b5cf0" }}>behavior change</span>.
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(1.02rem,1.3vw,1.18rem)",
            lineHeight: 1.55,
            color: "#4a4742",
            maxWidth: 580,
            margin: "0 auto",
          }}
        >
          From ADHD spirals to anxiety loops to sensory overload. See how Aqademiq helps students
          actually finish what they start.
        </p>
        <div style={{ marginTop: 18 }}>
          <Link className={s["aq-plink"]} href="/students" style={{ fontSize: 15 }}>
            Made with students{" "}
            <span className="material-icons-outlined" aria-hidden="true" style={{ fontSize: 18 }}>
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: "clamp(38px,5vw,56px)" }}
        data-reveal=""
      >
        <Row cards={ROW1} dir="aq-mq-left" />
        <Row cards={ROW2} dir="aq-mq-right" />
      </div>
    </section>
  );
}
