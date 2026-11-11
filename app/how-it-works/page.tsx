import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { AdaCube, TaskCard } from "@/components/ds";
import { AdaPlanSteps } from "@/components/how/AdaPlanSteps";
import { FocusDemo } from "@/components/how/FocusDemo";
import { GetAppButton } from "@/components/site/GetAppButton";
import { RevealController } from "@/components/site/RevealController";
import { APP_URL } from "@/lib/config";
import styles from "./how.module.css";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "One calm day, start to finish. Decide, start, stay, and close the day — without the guilt. Here's how Aqademiq works.",
};

const groupLabel: CSSProperties = {
  fontSize: 10,
  fontWeight: 800,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "#a8a49c",
  marginBottom: 8,
};

const subjectCard: CSSProperties = {
  background: "#fff",
  borderRadius: 18,
  padding: 16,
  boxShadow: "0 8px 24px rgba(49,35,124,.08)",
};
const subjectName: CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontWeight: 800,
  fontSize: 16,
  color: "#14130f",
};
const subjectMeta: CSSProperties = { fontSize: 11, color: "#8e8a83", marginTop: 3, fontWeight: 600 };

const feelCard: CSSProperties = { background: "var(--aq-paper)", borderRadius: 20, padding: 24 };
const feelH3: CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontWeight: 800,
  fontSize: "1.15rem",
  margin: "12px 0 6px",
  color: "#14130f",
};
const feelP: CSSProperties = { fontSize: 14, lineHeight: 1.5, color: "#4a4742", margin: 0 };

const importCard: CSSProperties = { background: "var(--aq-paper)", boxShadow: "none" };
const importRow: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  background: "#fff",
  borderRadius: 12,
  padding: "9px 12px",
};
const importBar: CSSProperties = { width: 3, height: 18, borderRadius: 3, background: "#3f7be0" };
const importTime: CSSProperties = { fontFamily: "var(--font-mono)", fontSize: 12, color: "#57534d" };
const importTitle: CSSProperties = { fontWeight: 700, fontSize: 13.5 };
const importCheck: CSSProperties = {
  width: 15,
  height: 15,
  borderRadius: "50%",
  border: "1.5px solid #c9c5bd",
};

const noteRow: CSSProperties = {
  display: "flex",
  gap: 12,
  alignItems: "flex-start",
  background: "#fff",
  borderRadius: 18,
  padding: "18px 20px",
};
const noteIcon: CSSProperties = { fontSize: 21, color: "#2a9d6b", flexShrink: 0 };
const noteText: CSSProperties = { fontSize: 14.5, lineHeight: 1.55, color: "#45423d" };

const dkIcon: CSSProperties = { fontSize: 21, color: "#cbbcfd", flexShrink: 0 };

const dayLabel: CSSProperties = {
  height: 38,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  fontSize: 9,
  fontWeight: 800,
  letterSpacing: ".1em",
  color: "#6b675f",
};

const coreItem: CSSProperties = { display: "flex", gap: 9 };
const coreIcon: CSSProperties = { fontSize: 18, color: "#5941d6" };

const calmRow: CSSProperties = {
  display: "flex",
  gap: 11,
  alignItems: "flex-start",
  background: "#fff",
  borderRadius: 16,
  padding: "18px 20px",
};

const icon18: CSSProperties = { fontSize: 18 };
const icon21: CSSProperties = { fontSize: 21 };

function Icon({ name, style }: { name: string; style?: CSSProperties }) {
  return (
    <span className="material-icons-outlined" aria-hidden="true" style={style}>
      {name}
    </span>
  );
}

function V2Card({
  num,
  icon,
  title,
  children,
  style,
}: {
  num?: string;
  icon: string;
  title: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div className={styles.v2card} style={style}>
      {num && <span className={styles.v2num}>{num}</span>}
      <span className={styles.v2ic}>
        <Icon name={icon} style={icon21} />
      </span>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

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
      <Icon name="check" style={{ fontSize: 17, color: "#fff" }} />
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

/** One band per day of The Core, MON → SUN (Thursday left open). */
const coreBands: CSSProperties[] = [
  { background: "#9286d240", border: "1.5px solid #9286d259" },
  { background: "#7d70d940", border: "1.5px solid #7d70d959" },
  { background: "#7d70d940", border: "1.5px solid #7d70d959" },
  { border: "1.5px dashed #cfcbc3" },
  { background: "#6a5ce440", border: "1.5px solid #6a5ce459" },
  { background: "#5a44f140", border: "1.5px solid #5a44f159" },
  { background: "#6a5ce440", border: "1.5px solid #6a5ce459" },
];

export default function HowItWorksPage() {
  return (
    <div className={styles.page} style={{ background: "var(--aq-paper)", overflowX: "clip" }}>
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
            <a className={styles.jump} href="#import">Import</a>
            <a className={styles.jump} href="#focus">Focus</a>
            <a className={styles.jump} href="#freeze">App freeze</a>
            <a className={styles.jump} href="#ambient">Lock Screen &amp; Watch</a>
            <a className={styles.jump} href="#ada">Ada</a>
            <a className={styles.jump} href="#reflect">Reflect</a>
            <a className={styles.jump} href="#core">The Core</a>
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
              Start with today <Icon name="arrow_forward" style={icon18} />
            </a>
          </div>
        </div>
      </section>

      <section
        id="import"
        style={{ background: "#fff", padding: "clamp(52px,7vh,92px) clamp(20px,6vw,60px)" }}
      >
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <div
            style={{ textAlign: "center", maxWidth: 680, margin: "0 auto clamp(28px,4vw,44px)" }}
            data-reveal=""
          >
            <div className={styles.eyerow}>
              <span className={styles.eyebrow}>Import</span>
              <span className={styles.aqNew}>New</span>
            </div>
            <h2 className={styles.sec}>Bring the plan you already have.</h2>
            <p className={styles.lead} style={{ margin: "0 auto", maxWidth: 540 }}>
              Import from your calendar or reminders, or paste a list from your notes, a syllabus or
              a group chat. It lands in your plan as tasks, so the first thing you do in Aqademiq is
              start, not retype.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
              gap: 16,
            }}
            data-reveal=""
          >
            <V2Card icon="calendar_today" title="Your calendar" style={importCard}>
              <p>Lectures and meetings come in at their times, alongside the rest of your day.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
                <div style={importRow}>
                  <span style={importBar} />
                  <span style={importTime}>09:00</span>
                  <span style={importTitle}>Chemistry lecture</span>
                </div>
                <div style={importRow}>
                  <span style={importBar} />
                  <span style={importTime}>11:30</span>
                  <span style={importTitle}>Stats tutorial</span>
                </div>
              </div>
            </V2Card>
            <V2Card icon="checklist" title="Your reminders" style={importCard}>
              <p>The to-dos you already wrote down become tasks, ready whenever you are.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
                <div style={importRow}>
                  <span style={importCheck} />
                  <span style={importTitle}>Problem set 3</span>
                </div>
                <div style={importRow}>
                  <span style={importCheck} />
                  <span style={importTitle}>Read chapter 5</span>
                </div>
              </div>
            </V2Card>
            <V2Card icon="content_paste" title="Paste a list" style={importCard}>
              <p>Notes, a syllabus, a group chat. Each line becomes its own task.</p>
              <div
                style={{
                  marginTop: 8,
                  background: "#fff",
                  borderRadius: 12,
                  padding: "10px 12px",
                  fontFamily: "var(--font-mono)",
                  fontSize: 12.5,
                  lineHeight: 1.7,
                  color: "#45423d",
                }}
              >
                - bio lab report
                <br />- revise for stats quiz
                <br />- slides for group pres
              </div>
            </V2Card>
          </div>
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <Link className={styles.plink} href="/#import" style={{ fontSize: 15.5 }}>
              Paste a list and watch it land <Icon name="arrow_forward" style={icon18} />
            </Link>
          </div>
        </div>
      </section>

      <section id="subjects" style={{ padding: "clamp(44px,6vh,80px) clamp(20px,6vw,60px)" }}>
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
                  <div style={subjectName}>Chemistry</div>
                  <div style={subjectMeta}>14 cr · target A</div>
                </div>
                <div style={{ ...subjectCard, borderTop: "3px solid var(--aq-tag-lecture)" }}>
                  <div style={subjectName}>Statistics</div>
                  <div style={subjectMeta}>10 cr · target B+</div>
                </div>
                <div style={{ ...subjectCard, borderTop: "3px solid var(--aq-tag-assignment)" }}>
                  <div style={subjectName}>English</div>
                  <div style={subjectMeta}>8 cr</div>
                </div>
                <div style={{ ...subjectCard, borderTop: "3px solid var(--aq-tag-presentation)" }}>
                  <div style={subjectName}>History</div>
                  <div style={subjectMeta}>6 cr</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="focus"
        style={{ background: "#fff", padding: "clamp(44px,6vh,80px) clamp(20px,6vw,60px)" }}
      >
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
            <FocusDemo panelClassName={styles.panel} />
            <div style={{ flex: 1, minWidth: 280 }} data-reveal="">
              <div className={styles.eyebrow}>Focus</div>
              <h2 className={styles.sec}>Press start, and watch it melt.</h2>
              <p className={styles.lead}>
                A frosted cube melts as your time passes. Calm to look at, not a countdown screaming
                at you. When it&apos;s gone, the task ticks itself off. Stop early anytime; nothing
                breaks, nothing shames you.
              </p>
              <a className={styles.plink} href={APP_URL} style={{ fontSize: 15.5 }}>
                Try a focus session <Icon name="arrow_forward" style={icon18} />
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
            <div style={feelCard}>
              <Icon name="visibility" style={{ fontSize: 24, color: "#5941d6" }} />
              <h3 style={feelH3}>See it</h3>
              <p style={feelP}>The melting cube: a timer that soothes instead of pressures.</p>
            </div>
            <div style={feelCard}>
              <Icon name="graphic_eq" style={{ fontSize: 24, color: "#1f7d54" }} />
              <h3 style={feelH3}>Hear it</h3>
              <p style={feelP}>
                {"Prism soundscapes quiet the room, or no sound, a mode too. "}
                <Link href="/science#prism" style={{ fontWeight: 700 }}>
                  The science of Prism
                </Link>
              </p>
            </div>
            <div style={feelCard}>
              <Icon name="vibration" style={{ fontSize: 24, color: "#c17d18" }} />
              <h3 style={{ ...feelH3, display: "flex", alignItems: "center", gap: 8 }}>
                Feel it<span className={styles.aqNew}>New</span>
              </h3>
              <p style={feelP}>
                {
                  "Every tap, freeze and thaw has its own feel, and a running session stays still. In the iPhone and Android apps. "
                }
                <Link href="/#haptics" style={{ fontWeight: 700 }}>
                  Feel them
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="freeze" style={{ padding: "clamp(56px,8vh,100px) clamp(20px,6vw,60px)" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <div
            style={{ textAlign: "center", maxWidth: 720, margin: "0 auto clamp(30px,4vw,48px)" }}
            data-reveal=""
          >
            <div className={styles.eyerow}>
              <span className={styles.eyebrow}>App freeze</span>
              <span className={styles.aqNew}>New</span>
            </div>
            <h2 className={styles.sec} style={{ fontSize: "clamp(2.1rem,4.2vw,3.3rem)" }}>
              Freeze the apps that pull you away.
            </h2>
            <p className={styles.lead} style={{ margin: "0 auto", maxWidth: 580 }}>
              App freeze holds the apps you pick, so the easiest thing left to open is the work.
              It&apos;s gentle by design: you can always get one back. It just takes a breath first.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
              gap: 14,
            }}
            data-reveal=""
          >
            <V2Card num="01" icon="apps" title="Pick what pulls you away">
              <p>
                Choose the apps to freeze. Or flip it with Keep only these, and everything else
                freezes.
              </p>
            </V2Card>
            <V2Card num="02" icon="ac_unit" title="Freeze now, or with a frost">
              <p>
                Freeze for this session, an hour, or until you stop. A frost does it on a schedule,
                like Lecture hours, 9 AM to 1 PM on weekdays.
              </p>
            </V2Card>
            <V2Card num="03" icon="water_drop" title="Thawing takes a breath">
              <p>
                Need one back? Wait 10 seconds, then choose 2 to 15 minutes. Each thaw that day waits
                a little longer, and the app refreezes on its own.
              </p>
            </V2Card>
            <V2Card num="04" icon="lock_clock" title="Deep freeze holds">
              <p>
                Turn it on and nothing thaws until it ends. Phone, Messages, Maps and Wallet always
                stay open.
              </p>
            </V2Card>
          </div>

          <div style={{ marginTop: "clamp(36px,5vw,56px)" }} data-reveal="">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
                gap: 12,
              }}
            >
              {[
                {
                  src: "/assets/frames/hiw-shield-1.webp",
                  alt: "Ada's sitting on this one. Yours again at 3:42",
                  cap: "First open",
                },
                { src: "/assets/frames/hiw-shield-2.webp", alt: "Still on ice. 3:42", cap: "Second open" },
                { src: "/assets/frames/hiw-shield-3.webp", alt: "Frozen. 3:42", cap: "Third open" },
              ].map((f) => (
                <figure key={f.src} className={styles.frostShot}>
                  <Image
                    src={f.src}
                    alt={f.alt}
                    width={560}
                    height={255}
                    sizes="(max-width: 720px) calc(100vw - 40px), 340px"
                  />
                  <figcaption>{f.cap}</figcaption>
                </figure>
              ))}
            </div>
            <p
              style={{
                textAlign: "center",
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(1.1rem,1.7vw,1.35rem)",
                lineHeight: 1.45,
                color: "#31237c",
                maxWidth: 600,
                margin: "22px auto 0",
              }}
            >
              Open a frozen app and Ada&apos;s there first. Each time you try, she says less. The joke
              is about the moment, never about you.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: 14,
              marginTop: "clamp(36px,5vw,56px)",
            }}
            data-reveal=""
          >
            <div style={noteRow}>
              <Icon name="visibility_off" style={noteIcon} />
              <span style={noteText}>
                <b style={{ color: "#14130f" }}>We never see your picks.</b>{" "}On iPhone, Apple&apos;s
                Screen Time does the freezing. It can&apos;t see, log or sync your list.
              </span>
            </div>
            <div style={noteRow}>
              <Icon name="android" style={noteIcon} />
              <span style={noteText}>
                <b style={{ color: "#14130f" }}>Two grants on Android.</b>{" "}Usage access shows which
                app is open. Display over other apps puts the frozen screen on top. We never read your
                screen.
              </span>
            </div>
            <div style={noteRow}>
              <Icon name="schedule" style={noteIcon} />
              <span style={noteText}>
                <b style={{ color: "#14130f" }}>Frosts keep their own time.</b>{" "}On iPhone they run
                even when Aqademiq is closed. Say no to permissions and we won&apos;t nag.
              </span>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 26 }}>
            <Link className={styles.plink} href="/#freeze" style={{ fontSize: 15.5 }}>
              Try a thaw on the homepage <Icon name="arrow_forward" style={icon18} />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="ambient"
        style={{
          background: "#0e0e0e",
          color: "#f4f3f0",
          padding: "clamp(56px,8vh,100px) clamp(20px,6vw,60px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            top: -180,
            width: "min(860px,120vw)",
            height: 560,
            transform: "translateX(-50%)",
            background: "radial-gradient(ellipse at center,rgba(107,92,240,.26),transparent 66%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 1040, margin: "0 auto", position: "relative" }}>
          <div
            style={{ textAlign: "center", maxWidth: 720, margin: "0 auto clamp(30px,4vw,48px)" }}
            data-reveal=""
          >
            <div className={styles.eyerow}>
              <span className={styles.eyebrow} style={{ color: "#cbbcfd" }}>
                Lock Screen · Island · StandBy · Watch
              </span>
            </div>
            <h2 className={styles.sec} style={{ color: "#fff" }}>
              Your session, wherever you glance.
            </h2>
            <p
              className={styles.lead}
              style={{ margin: "0 auto", maxWidth: 560, color: "rgba(244,243,240,.74)" }}
            >
              Once a session starts, it follows you out of the app. See the time left, freeze it or
              end it from wherever you are, and start five minutes without opening anything.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))",
              gap: 14,
            }}
            data-reveal=""
          >
            <div className={styles.dkCard}>
              <div className={styles.dkShot} style={{ background: "#1b1824" }}>
                <Image
                  src="/assets/frames/hiw-lock.webp"
                  alt="Lock Screen Live Activity: Deep Work, LL(1) parsing notes, 14:32 left, with a freeze button"
                  width={720}
                  height={230}
                  sizes="(max-width: 720px) calc(100vw - 80px), 300px"
                />
              </div>
              <div>
                <h3>Lock Screen Live Activity</h3>
                <p>
                  A live clock on your Lock Screen. One press freezes the session and the clock turns
                  to ice. One press brings it back.
                </p>
              </div>
            </div>
            <div className={styles.dkCard}>
              <div className={styles.dkShot} style={{ background: "#1d1a26" }}>
                <Image
                  src="/assets/frames/hiw-island.webp"
                  alt="Expanded Dynamic Island: LL(1) parsing notes, CC 401, Deep Work, 14:32, with Freeze and End"
                  width={720}
                  height={321}
                  sizes="(max-width: 720px) calc(100vw - 80px), 300px"
                />
              </div>
              <div>
                <h3>Dynamic Island</h3>
                <p>
                  Time left while you use other apps. Open it for Freeze and End. It shares the island
                  politely with a call.
                </p>
              </div>
            </div>
            <div className={styles.dkCard}>
              <div className={styles.dkShot} style={{ gap: 12, padding: "0 12px" }}>
                <Image
                  src="/assets/frames/la-standby.webp"
                  alt="StandBy: Deep Work, 14:32, LL(1) parsing notes, with Freeze and End"
                  width={1240}
                  height={570}
                  sizes="(max-width: 720px) 66vw, 200px"
                  style={{ width: "66%", borderRadius: 12 }}
                />
                <Image
                  src="/assets/frames/la-watch.webp"
                  alt="Apple Watch: the session cube, 14:32, with Freeze and End"
                  width={456}
                  height={540}
                  sizes="(max-width: 720px) 28vw, 90px"
                  style={{ width: "28%" }}
                />
              </div>
              <div>
                <h3>StandBy and Apple Watch</h3>
                <p>
                  Charging on its side, your phone becomes a desk clock for the session. On your
                  wrist, freeze, resume or end with a tap.
                </p>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
              gap: 12,
              marginTop: 14,
            }}
            data-reveal=""
          >
            <div className={styles.dkQuick}>
              <Icon name="widgets" style={dkIcon} />
              <span>
                <b>Three widgets</b>What&apos;s next, how your week felt, and Start 5 min.
              </span>
            </div>
            <div className={styles.dkQuick}>
              <Icon name="toggle_on" style={dkIcon} />
              <span>
                <b>Control Center</b>Start five minutes without opening anything.
              </span>
            </div>
            <div className={styles.dkQuick}>
              <Icon name="smart_button" style={dkIcon} />
              <span>
                <b>Action button</b>On iPhone 15 Pro and later. One press, five minutes.
              </span>
            </div>
            <div className={styles.dkQuick}>
              <Icon name="android" style={dkIcon} />
              <span>
                <b>On Android</b>A Quick Settings tile, a status chip, and your session and App freeze
                in the notification shade.
              </span>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 26 }}>
            <Link
              href="/#ambient"
              style={{
                color: "#cbbcfd",
                fontWeight: 700,
                fontSize: 15.5,
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              Try them on the homepage <Icon name="arrow_forward" style={icon18} />
            </Link>
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
              Let Ada plan your week <Icon name="arrow_forward" style={icon18} />
            </a>
          </div>
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
                  <AdaCube size={30} rating={4} expr="happy" />
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
                <AdaPlanSteps />
              </div>
            </div>
          </div>
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
              {(
                [
                  { rating: 0, expr: "sad", melt: 0.9, label: "Rough" },
                  { rating: 1, expr: "meh", melt: 0.6, label: "Tired" },
                  { rating: 2, expr: "neutral", melt: 0.32, label: "OK" },
                  { rating: 3, expr: "smile", melt: 0.12, label: "Good" },
                  { rating: 4, expr: "happy", melt: 0, label: "Great" },
                ] as const
              ).map((m) => (
                <div
                  key={m.label}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
                >
                  <AdaCube size={50} rating={m.rating} expr={m.expr} melt={m.melt} />
                  <span style={{ fontSize: 12, color: "#8e8a83", fontWeight: 700 }}>{m.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div
            id="core"
            style={{
              marginTop: "clamp(40px,6vw,64px)",
              background: "#fff",
              borderRadius: 28,
              boxShadow: "0 2px 20px rgba(0,0,0,.06)",
              padding: "clamp(24px,4vw,40px)",
              display: "flex",
              flexWrap: "wrap",
              gap: "28px 44px",
              alignItems: "center",
              textAlign: "left",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                flex: "0 0 auto",
                margin: "0 auto",
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
              }}
            >
              <div style={{ paddingTop: 7, display: "flex", flexDirection: "column" }}>
                {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
                  <span key={d} style={dayLabel}>
                    {d}
                  </span>
                ))}
              </div>
              <div
                style={{
                  position: "relative",
                  width: 104,
                  padding: "7px 6px",
                  borderRadius: "44px / 22px",
                  background: "#f6f4ff",
                  boxShadow: "0 8px 26px rgba(90,68,241,.16),inset 0 0 0 1.5px rgba(255,255,255,.95)",
                }}
              >
                {coreBands.map((b, i) => (
                  <div key={i} className={styles.cband} style={b} />
                ))}
                <span
                  style={{
                    position: "absolute",
                    top: 10,
                    bottom: 10,
                    left: 16,
                    width: 9,
                    borderRadius: 99,
                    background: "linear-gradient(rgba(255,255,255,.95),rgba(255,255,255,.2))",
                    filter: "blur(1.5px)",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: -2,
                    left: 4,
                    right: 4,
                    height: 14,
                    borderRadius: "50%",
                    border: "1.5px solid rgba(255,255,255,.98)",
                    background: "rgba(255,255,255,.55)",
                  }}
                />
              </div>
            </div>
            <div style={{ flex: "1 1 320px", minWidth: 0 }}>
              <div className={styles.eyerow}>
                <span className={styles.eyebrow}>The Core · weekly report</span>
                <span className={styles.aqNew}>New</span>
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 800,
                  fontSize: "clamp(1.45rem,2.6vw,2rem)",
                  letterSpacing: "-.024em",
                  lineHeight: 1.12,
                  margin: "0 0 10px",
                  color: "#14130f",
                }}
              >
                A record of your week, not a score.
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: "#45423d", margin: "0 0 14px" }}>
                Every week is drilled into an ice core: one band per day, tinted by your mood, left
                open where nothing was logged. Nine short beats follow: the shape of the week, one
                thing that happened, where your attention went, when you thawed, and one small thing
                for next week.
              </p>
              <ul
                style={{
                  listStyle: "none",
                  margin: "0 0 16px",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  fontSize: 14.5,
                  lineHeight: 1.5,
                  color: "#45423d",
                }}
              >
                <li style={coreItem}>
                  <Icon name="pin" style={coreIcon} />
                  One number, and it&apos;s always a count. Never a rate or a grade.
                </li>
                <li style={coreItem}>
                  <Icon name="notifications_off" style={coreIcon} />
                  It waits in the tab. No notification, this week only.
                </li>
                <li style={coreItem}>
                  <Icon name="ios_share" style={coreIcon} />
                  Share the shape. No mood in the picture, and what you wrote never leaves.
                </li>
                <li style={coreItem}>
                  <Icon name="toggle_off" style={coreIcon} />A thin week sounds just as kind, and
                  there&apos;s a real off switch.
                </li>
              </ul>
              <Link className={styles.plink} href="/#core" style={{ fontSize: 15 }}>
                Read a sample week <Icon name="arrow_forward" style={icon18} />
              </Link>
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
                <Icon name={c.icon} style={{ fontSize: 20, color: "#2a9d6b", flexShrink: 0 }} />
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
            medical or diagnostic tool.{" "}
            <Link href="/science" style={{ fontWeight: 700 }}>
              Read the research
            </Link>
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
          {/* The design's data-breathe has no rule on this page and the runtime
              drops the x-import style (the drop-shadow), so the approved render
              is a still, unshadowed cube. */}
          <div style={{ display: "inline-block", marginBottom: 24 }}>
            <AdaCube size={78} rating={4} expr="happy" />
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
