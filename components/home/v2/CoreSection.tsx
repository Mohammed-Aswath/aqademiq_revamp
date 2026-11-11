import Link from "next/link";
import { CoreDemo } from "./core/CoreDemo";
import s from "./home.module.css";

const ptIcon: React.CSSProperties = { fontSize: 20, color: "#5941d6", flexShrink: 0 };
const ptText: React.CSSProperties = { fontSize: 14.5, lineHeight: 1.55, color: "#45423d" };
const ptBold: React.CSSProperties = { color: "#14130f" };

/** Section 11 — The Core (weekly report). The stepper card is a client island. */
export function CoreSection() {
  return (
    <section id="core" style={{ padding: "clamp(56px,8vh,104px) clamp(20px,6vw,60px)" }}>
      <div
        style={{
          maxWidth: 1040,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(32px,5vw,72px)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ flex: "0 1 360px", display: "flex", justifyContent: "center", position: "relative" }} data-reveal="">
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 460,
              height: 460,
              transform: "translate(-50%,-50%)",
              background: "radial-gradient(circle,rgba(107,92,240,.13),transparent 62%)",
              pointerEvents: "none",
            }}
          />
          <CoreDemo />
        </div>

        <div style={{ flex: "1 1 380px", minWidth: 0, maxWidth: 480 }} data-reveal="">
          <div className={s["aq-eyerow"]}>
            <span className={s.e}>The Core · weekly report</span>
            <span className={s["aq-new"]}>New</span>
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
            A record of your week, not a score.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.02rem,1.3vw,1.18rem)",
              lineHeight: 1.55,
              color: "#4a4742",
              margin: "0 0 18px",
            }}
          >
            Each week is drilled into an ice core: one band per day, tinted by your mood. Nine short beats tell you what happened,
            gently, then hand you one small thing for next week.
          </p>
          <div>
            <div className={s["core-pt"]}>
              <span className="material-icons-outlined" aria-hidden="true" style={ptIcon}>
                pin
              </span>
              <span style={ptText}>
                <b style={ptBold}>One number, and it&apos;s a count.</b> Never a rate, a percentage or a grade.
              </span>
            </div>
            <div className={s["core-pt"]}>
              <span className="material-icons-outlined" aria-hidden="true" style={ptIcon}>
                notifications_off
              </span>
              <span style={ptText}>
                <b style={ptBold}>It waits in the tab.</b> No notification, the same way every week. This week only, no digging up old
                ones.
              </span>
            </div>
            <div className={s["core-pt"]}>
              <span className="material-icons-outlined" aria-hidden="true" style={ptIcon}>
                ios_share
              </span>
              <span style={ptText}>
                <b style={ptBold}>Share the shape, never the feelings.</b>{" "}
                The story image shows your week&apos;s shape with no mood in it. What you wrote is never shown or exported.
              </span>
            </div>
            <div className={s["core-pt"]}>
              <span className="material-icons-outlined" aria-hidden="true" style={ptIcon}>
                toggle_off
              </span>
              <span style={ptText}>
                <b style={ptBold}>A real off switch.</b> A thin week reads in the same kind voice, and you can turn the report off
                anytime.
              </span>
            </div>
          </div>
          <Link className={s["aq-plink"]} href="/how-it-works#core" style={{ fontSize: 15.5, marginTop: 18 }}>
            How The Core works{" "}
            <span className="material-icons-outlined" aria-hidden="true" style={{ fontSize: 18 }}>
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
