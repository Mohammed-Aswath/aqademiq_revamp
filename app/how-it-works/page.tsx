import type { Metadata } from "next";
import { AdaCube, TaskCard } from "@/components/ds";
import { AdaPlanDemo } from "@/components/how-it-works/AdaPlanDemo";
import { FocusDemo } from "@/components/how-it-works/FocusDemo";
import styles from "@/components/how-it-works/howItWorks.module.css";
import { GetAppButton } from "@/components/site/GetAppButton";
import { RevealController } from "@/components/site/RevealController";
import { APP_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "One calm day, start to finish. Decide, start, stay, and close the day — without the guilt. Here's how Aqademiq works.",
};

const groupLabel: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 800,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "#a8a49c",
  marginBottom: 8,
};

const subjectCard: React.CSSProperties = {
  background: "#fff",
  borderRadius: 18,
  padding: 16,
  boxShadow: "0 8px 24px rgba(49,35,124,.08)",
};

const featureCard: React.CSSProperties = {
  background: "#fff",
  borderRadius: 20,
  padding: 24,
  boxShadow: "0 2px 16px rgba(0,0,0,.06)",
};

const calmRow: React.CSSProperties = {
  display: "flex",
  gap: 11,
  alignItems: "flex-start",
  background: "#fff",
  borderRadius: 16,
  padding: "18px 20px",
};

const streakCheck = (letter: string) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
    <span
      style={{
        width: 30,
        height: 30,
        borderRadius: "50%",
        background: "#6b5cf0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span className="material-icons-outlined" style={{ fontSize: 17, color: "#fff" }}>
        check
      </span>
    </span>
    <span style={{ fontSize: 11, color: "#a8a49c", fontWeight: 700 }}>{letter}</span>
  </div>
);

const streakRest = (letter: string) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
    <span
      style={{
        width: 30,
        height: 30,
        borderRadius: "50%",
        background: "var(--aq-hilite)",
        border: "1.5px solid rgba(0,0,0,.06)",
      }}
    />
    <span style={{ fontSize: 11, color: "#a8a49c", fontWeight: 700 }}>{letter}</span>
  </div>
);

export default function HowItWorksPage() {
  return (
    <div
      className={styles.page}
      style={{ background: "var(--aq-paper)", overflowX: "clip" }}
    >
      <RevealController threshold={0.12} rootMargin="-6%" />

      <section
        style={{
          padding: "clamp(52px,8vh,92px) clamp(20px,6vw,60px) clamp(30px,4vh,48px)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }} data-reveal="">
          <div className={styles.eyebrow}>How it works</div>
          <h1
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 800,
              fontSize: "clamp(2.4rem,5.2vw,4.2rem)",
              lineHeight: 1.03,
              letterSpacing: "-.032em",
              margin: "0 0 18px",
              color: "#14130f",
              textWrap: "balance",
            }}
          >
            One calm day, start to finish.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.08rem,1.4vw,1.3rem)",
              lineHeight: 1.5,
              color: "#4a4742",
              maxWidth: 520,
              margin: "0 auto 26px",
              fontWeight: 500,
            }}
          >
            Decide, start, stay, and close the day, without the guilt. Here&apos;s how.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 9,
              justifyContent: "center",
              marginBottom: 26,
            }}
          >
            <a className={styles.jump} href="#plan">Plan</a>
            <a className={styles.jump} href="#focus">Focus</a>
            <a className={styles.jump} href="#ada">Ada</a>
            <a className={styles.jump} href="#reflect">Reflect</a>
            <a className={styles.jump} href="#streaks">Streaks</a>
          </div>
          <a
            href={APP_URL}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "15px 28px",
              background: "#111",
              color: "#fff",
              borderRadius: 100,
              fontWeight: 800,
              fontSize: 16,
            }}
          >
            Start studying free
          </a>
        </div>
      </section>

      <section id="plan" style={{ padding: "clamp(44px,6vh,80px) clamp(20px,6vw,60px)" }}>
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
          <div
            style={{ flex: 1.05, minWidth: 290, display: "flex", justifyContent: "center" }}
            data-reveal=""
          >
            <div className={styles.panel}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 26,
                  boxShadow: "0 16px 44px rgba(49,35,124,.12)",
                  padding: "20px 18px",
                  width: 290,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 16,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 800,
                      fontSize: 18,
                      color: "#14130f",
                    }}
                  >
                    Today
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      color: "#8e8a83",
                      fontWeight: 600,
                    }}
                  >
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
          <div style={{ flex: 1, minWidth: 280 }} data-reveal="">
            <div className={styles.eyebrow}>Plan</div>
            <h2 className={styles.sec}>A plan that fits on one calm screen.</h2>
            <p className={styles.lead}>
              Just today. Gentle Anytime and Planned groups, soft subject colors, and honest
              durations, so you always know the size of the next step. No angry &quot;14
              overdue&quot; badge.
            </p>
            <a className={styles.plink} href={APP_URL} style={{ fontSize: 15.5 }}>
              Start with today{" "}
              <span className="material-icons-outlined" style={{ fontSize: 18 }}>
                arrow_forward
              </span>
            </a>
          </div>
        </div>
      </section>

      <section
        id="subjects"
        style={{ background: "#fff", padding: "clamp(44px,6vh,80px) clamp(20px,6vw,60px)" }}
      >
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
            <div className={styles.eyebrow}>Subjects &amp; materials</div>
            <h2 className={styles.sec}>Everything for a subject, in one place.</h2>
            <p className={styles.lead}>
              Your semesters and subjects live together, each in its own color, with syllabi, notes,
              and past papers attached, so &quot;where was that file?&quot; never gets to be the
              reason you don&apos;t start.
            </p>
          </div>
          <div
            style={{ flex: 1.05, minWidth: 290, display: "flex", justifyContent: "center" }}
            data-reveal=""
          >
            <div className={styles.panel}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, width: 300 }}>
                <div style={{ ...subjectCard, borderTop: "3px solid var(--aq-tag-exam)" }}>
                  <div style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 16, color: "#14130f" }}>
                    Chemistry
                  </div>
                  <div style={{ fontSize: 11, color: "#8e8a83", marginTop: 3, fontWeight: 600 }}>
                    14 cr · target A
                  </div>
                </div>
                <div style={{ ...subjectCard, borderTop: "3px solid var(--aq-tag-lecture)" }}>
                  <div style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 16, color: "#14130f" }}>
                    Statistics
                  </div>
                  <div style={{ fontSize: 11, color: "#8e8a83", marginTop: 3, fontWeight: 600 }}>
                    10 cr · target B+
                  </div>
                </div>
                <div style={{ ...subjectCard, borderTop: "3px solid var(--aq-tag-assignment)" }}>
                  <div style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 16, color: "#14130f" }}>
                    English
                  </div>
                  <div style={{ fontSize: 11, color: "#8e8a83", marginTop: 3, fontWeight: 600 }}>8 cr</div>
                </div>
                <div style={{ ...subjectCard, borderTop: "3px solid var(--aq-tag-presentation)" }}>
                  <div style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 16, color: "#14130f" }}>
                    History
                  </div>
                  <div style={{ fontSize: 11, color: "#8e8a83", marginTop: 3, fontWeight: 600 }}>6 cr</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="focus" style={{ padding: "clamp(44px,6vh,80px) clamp(20px,6vw,60px)" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(30px,5vw,64px)",
              alignItems: "center",
              marginBottom: "clamp(36px,5vw,56px)",
            }}
          >
            <FocusDemo />
            <div style={{ flex: 1, minWidth: 280 }} data-reveal="">
              <div className={styles.eyebrow}>Focus</div>
              <h2 className={styles.sec}>Press start, and watch it melt.</h2>
              <p className={styles.lead}>
                A frosted cube melts as your time passes. Calm to look at, not a countdown screaming
                at you. When it&apos;s gone, the task ticks itself off. Stop early anytime; nothing
                breaks, nothing shames you.
              </p>
              <a className={styles.plink} href={APP_URL} style={{ fontSize: 15.5 }}>
                Try a focus session{" "}
                <span className="material-icons-outlined" style={{ fontSize: 18 }}>
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
          <div
            id="feel"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: 16,
            }}
            data-reveal=""
          >
            <div style={featureCard}>
              <span className="material-icons-outlined" style={{ fontSize: 24, color: "#5941d6" }}>
                visibility
              </span>
              <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "1.15rem", margin: "12px 0 6px", color: "#14130f" }}>
                See it
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.5, color: "#4a4742", margin: 0 }}>
                The melting cube: a timer that soothes instead of pressures.
              </p>
            </div>
            <div style={featureCard}>
              <span className="material-icons-outlined" style={{ fontSize: 24, color: "#1f7d54" }}>
                graphic_eq
              </span>
              <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "1.15rem", margin: "12px 0 6px", color: "#14130f" }}>
                Hear it
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.5, color: "#4a4742", margin: 0 }}>
                Prism soundscapes quiet the room, or no sound, a mode too.
              </p>
            </div>
            <div style={featureCard}>
              <span className="material-icons-outlined" style={{ fontSize: 24, color: "#c17d18" }}>
                vibration
              </span>
              <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "1.15rem", margin: "12px 0 6px", color: "#14130f" }}>
                Feel it
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.5, color: "#4a4742", margin: 0 }}>
                Gentle taps to begin, breathe, and return. Fullest on the iOS app.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="ada"
        style={{ background: "#fff", padding: "clamp(44px,6vh,80px) clamp(20px,6vw,60px)" }}
      >
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
            <div className={styles.eyebrow}>Ada · AI co-planner</div>
            <h2 className={styles.sec}>Hand Ada the mess.</h2>
            <p className={styles.lead}>
              Tell Ada &quot;chem lab report, 2 problem sets, read ch.4&quot; and it comes back with
              small, timed, tagged steps across your week. You approve before anything lands. It
              suggests; you decide. It can get things wrong.
            </p>
            <a className={styles.plink} href={APP_URL} style={{ fontSize: 15.5 }}>
              Let Ada plan your week{" "}
              <span className="material-icons-outlined" style={{ fontSize: 18 }}>
                arrow_forward
              </span>
            </a>
          </div>
          <AdaPlanDemo />
        </div>
      </section>

      <section
        id="reflect"
        style={{ padding: "clamp(52px,7vh,92px) clamp(20px,6vw,60px)", textAlign: "center" }}
      >
        <div style={{ maxWidth: 820, margin: "0 auto" }} data-reveal="">
          <div className={styles.eyebrow}>Reflect</div>
          <h2 className={styles.sec} style={{ marginBottom: 14 }}>
            End the day kinder to yourself.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.02rem,1.3vw,1.18rem)",
              lineHeight: 1.55,
              color: "#4a4742",
              maxWidth: 520,
              margin: "0 auto 36px",
            }}
          >
            One morning intention, an evening mood in a tap, and a quiet picture of your weeks, never
            a scoreboard.
          </p>
          <div
            style={{
              background: "#fff",
              borderRadius: 24,
              boxShadow: "0 2px 20px rgba(0,0,0,.06)",
              padding: "clamp(24px,4vw,36px)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "#a8a49c",
                marginBottom: 22,
              }}
            >
              How did today feel?
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "clamp(8px,3vw,30px)",
                flexWrap: "wrap",
              }}
            >
              {[
                { rating: 0, expr: "sad", melt: 0.9, label: "Rough" },
                { rating: 1, expr: "meh", melt: 0.6, label: "Tired" },
                { rating: 2, expr: "neutral", melt: 0.32, label: "OK" },
                { rating: 3, expr: "smile", melt: 0.12, label: "Good" },
                { rating: 4, expr: "happy", melt: 0, label: "Great" },
              ].map((m) => (
                <div
                  key={m.label}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
                >
                  <AdaCube
                    size={50}
                    rating={m.rating}
                    expr={m.expr as "sad" | "meh" | "neutral" | "smile" | "happy"}
                    melt={m.melt}
                  />
                  <span style={{ fontSize: 12, color: "#8e8a83", fontWeight: 700 }}>{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="streaks"
        style={{
          background: "#fff",
          padding: "clamp(52px,7vh,92px) clamp(20px,6vw,60px)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 820, margin: "0 auto" }} data-reveal="">
          <div className={styles.eyebrow}>Streaks</div>
          <h2 className={styles.sec} style={{ marginBottom: 22 }}>
            Progress you can feel, without the fear of losing it.
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "clamp(6px,2vw,13px)",
              marginBottom: 26,
              flexWrap: "wrap",
            }}
          >
            {streakCheck("M")}
            {streakCheck("T")}
            {streakRest("W")}
            {streakCheck("T")}
            {streakCheck("F")}
            {streakRest("S")}
            {streakCheck("S")}
          </div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.2rem,2vw,1.55rem)",
              fontStyle: "italic",
              lineHeight: 1.4,
              color: "#31237c",
              maxWidth: 580,
              margin: "0 auto",
            }}
          >
            Other apps weaponize the streak. We think the day you needed a break shouldn&apos;t cost
            you the thing that was helping.
          </p>
        </div>
      </section>

      <section id="calm" style={{ padding: "clamp(52px,7vh,92px) clamp(20px,6vw,60px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(30px,4vw,44px)" }} data-reveal="">
            <div className={styles.eyebrow}>Designed to be calm</div>
            <h2 className={styles.sec} style={{ margin: "0 auto" }}>
              Calm isn&apos;t a theme. It&apos;s the design.
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: 14,
            }}
            data-reveal=""
          >
            {[
              { icon: "motion_photos_off", text: "Reduced motion and sound-off are first-class." },
              { icon: "translate", text: "Plain language. No jargon, no shame." },
              { icon: "sentiment_satisfied", text: "No guilt-trips, no countdowns, no fake panic." },
              { icon: "lock", text: "Private by design. No camera, mic, or location." },
            ].map((c) => (
              <div key={c.icon} style={calmRow}>
                <span
                  className="material-icons-outlined"
                  style={{ fontSize: 20, color: "#2a9d6b", flexShrink: 0 }}
                >
                  {c.icon}
                </span>
                <span style={{ fontSize: 14.5, lineHeight: 1.5, color: "#45423d" }}>{c.text}</span>
              </div>
            ))}
          </div>
          <p
            style={{
              textAlign: "center",
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              lineHeight: 1.55,
              color: "#8e8a83",
              maxWidth: 600,
              margin: "24px auto 0",
            }}
          >
            We lean on real behavioral science and are honest about its limits. Aqademiq isn&apos;t a
            medical or diagnostic tool.
          </p>
        </div>
      </section>

      <section
        style={{
          padding: "clamp(64px,9vh,120px) clamp(20px,6vw,60px)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            top: "44%",
            width: 480,
            height: 480,
            transform: "translate(-50%,-50%)",
            background: "radial-gradient(circle,rgba(107,92,240,.1),transparent 64%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 700, margin: "0 auto", position: "relative" }} data-reveal="">
          <div data-breathe="true" style={{ display: "inline-block", marginBottom: 24 }}>
            <AdaCube
              size={78}
              rating={4}
              expr="happy"
              style={{ filter: "drop-shadow(0 12px 26px rgba(107,92,240,.28))" }}
            />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 800,
              fontSize: "clamp(2.1rem,4.4vw,3.4rem)",
              letterSpacing: "-.03em",
              lineHeight: 1.05,
              margin: "0 0 18px",
              color: "#14130f",
              textWrap: "balance",
            }}
          >
            That&apos;s a day. Want to try one?
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.05rem,1.35vw,1.22rem)",
              lineHeight: 1.5,
              color: "#4a4742",
              maxWidth: 480,
              margin: "0 auto 28px",
              fontWeight: 500,
            }}
          >
            Planning and starting, in under a minute, free in your browser.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <a
              href={APP_URL}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                padding: "16px 32px",
                background: "#111",
                color: "#fff",
                borderRadius: 100,
                fontWeight: 800,
                fontSize: 16.5,
              }}
            >
              Start studying free
            </a>
            <GetAppButton
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "16px 28px",
                background: "transparent",
                color: "#14130f",
                border: "1.5px solid rgba(20,19,15,.18)",
                borderRadius: 100,
                fontWeight: 700,
                fontSize: 15.5,
                fontFamily: "var(--font-sans)",
                cursor: "pointer",
              }}
            >
              Get the app
            </GetAppButton>
          </div>
          <div style={{ fontSize: 13.5, color: "#8e8a83", fontWeight: 600 }}>
            Free everywhere · loved by 1,000+ students
          </div>
        </div>
      </section>
    </div>
  );
}
