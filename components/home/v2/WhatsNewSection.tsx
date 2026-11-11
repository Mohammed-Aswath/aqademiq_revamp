import type { CSSProperties } from "react";
import s from "./home.module.css";

/*
 * What's new (Home.dc.html section 2). Static: five cards that jump to the
 * in-page demos for each V2 feature.
 */

const cardTitle: CSSProperties = { fontWeight: 800, fontSize: "1.2rem", letterSpacing: "-.01em" };
const cardBody: CSSProperties = { fontSize: 14.5, lineHeight: 1.55, color: "#4a4742" };

type Card = { href: string; size: "s2" | "s3"; icon: string; title: string; body: string; go: string };

const CARDS: Card[] = [
  {
    href: "#freeze",
    size: "s2",
    icon: "ac_unit",
    title: "App freeze",
    body: "Freeze distracting apps for a session or on a schedule. Thawing takes a breath first.",
    go: "Try a thaw",
  },
  {
    href: "#import",
    size: "s2",
    icon: "move_to_inbox",
    title: "Import",
    body: "Bring in your calendar or reminders, or paste a list. It lands as tasks you can start.",
    go: "Paste a list",
  },
  {
    href: "#haptics",
    size: "s2",
    icon: "vibration",
    title: "New haptics",
    body: "Every tap, freeze and thaw has its own feel, and a running session stays still.",
    go: "Feel them",
  },
  {
    href: "#ambient",
    size: "s3",
    icon: "watch",
    title: "Lock Screen, Island & Watch",
    body: "Your session on the Lock Screen, in the Dynamic Island, on StandBy and on your wrist. Plus widgets.",
    go: "See every surface",
  },
  {
    href: "#core",
    size: "s3",
    icon: "view_day",
    title: "The Core",
    body: "A weekly report that reads like a record, not a score. Your week, drilled into an ice core.",
    go: "Read a week",
  },
];

export function WhatsNewSection() {
  return (
    <section id="v2" style={{ padding: "clamp(40px,6vh,72px) clamp(20px,6vw,60px) clamp(48px,7vh,84px)" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(26px,4vw,40px)" }} data-reveal="">
          <div className={s["aq-eyerow"]}>
            <span className={s["aq-new"]}>What&apos;s new</span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 800,
              fontSize: "clamp(1.7rem,3.2vw,2.5rem)",
              letterSpacing: "-.026em",
              lineHeight: 1.08,
              margin: 0,
              color: "#14130f",
              textWrap: "balance",
            }}
          >
            Fewer things pulling at you. More ways in.
          </h2>
        </div>
        <div className={s["aq-v2grid"]} data-reveal="">
          {CARDS.map((c) => (
            <a key={c.href} className={`${s["aq-v2card"]} ${s[c.size]}`} href={c.href}>
              <span className={s["aq-v2ic"]}>
                <span className="material-icons-outlined" aria-hidden="true" style={{ fontSize: 23 }}>
                  {c.icon}
                </span>
              </span>
              <span style={cardTitle}>{c.title}</span>
              <span style={cardBody}>{c.body}</span>
              <span className={s.go}>
                {c.go}{" "}
                <span className="material-icons-outlined" aria-hidden="true" style={{ fontSize: 17 }}>
                  arrow_forward
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
