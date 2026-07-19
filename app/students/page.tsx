import type { Metadata } from "next";
import { AdaCube } from "@/components/ds";
import { GetAppButton } from "@/components/site/GetAppButton";
import { RevealController } from "@/components/site/RevealController";
import { APP_URL } from "@/lib/config";
import styles from "./students.module.css";

export const metadata: Metadata = {
  title: "For students",
  description:
    "Made with students, for the ones who find starting hard. The exam dread, the blank page, the 2 a.m. freeze — Aqademiq was built for exactly those.",
};

const getAppBtnStyle: React.CSSProperties = {
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
};

const startFreeStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 9,
  padding: "16px 32px",
  background: "#111",
  color: "#fff",
  borderRadius: 100,
  fontWeight: 800,
  fontSize: 16.5,
};

export default function StudentsPage() {
  return (
    <div style={{ background: "var(--aq-paper)", overflowX: "clip" }}>
      <RevealController threshold={0.1} rootMargin="-5%" />

      <section
        style={{
          padding: "clamp(52px,8vh,96px) clamp(20px,6vw,60px) clamp(40px,5vh,60px)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }} data-reveal="">
          <div className={styles.eyebrow}>For students</div>
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
            Made with students, for the ones who find starting hard.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.08rem,1.4vw,1.3rem)",
              lineHeight: 1.5,
              color: "#4a4742",
              maxWidth: 560,
              margin: "0 auto 26px",
              fontWeight: 500,
            }}
          >
            The exam dread, the blank page, the 2 a.m. freeze. We built Aqademiq for exactly those.
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
            <a href={APP_URL} style={startFreeStyle}>
              Start studying free
            </a>
            <GetAppButton style={getAppBtnStyle}>Get the app</GetAppButton>
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 16px",
              background: "#fff",
              border: "1px solid rgba(0,0,0,.06)",
              borderRadius: 100,
              fontSize: 13.5,
              fontWeight: 700,
              color: "#14130f",
              boxShadow: "0 2px 10px rgba(0,0,0,.04)",
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#2a9d6b" }} />
            Join <span style={{ fontFamily: "var(--font-mono)" }}>1,000+</span> students already
            using Aqademiq
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "clamp(44px,6vh,80px) clamp(20px,6vw,60px)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto" }} data-reveal="">
          <h2 className={styles.sec} style={{ margin: "0 auto 18px" }}>
            You&apos;re not lazy. You&apos;re stuck at the hardest part.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.05rem,1.35vw,1.2rem)",
              lineHeight: 1.6,
              color: "#4a4742",
              maxWidth: 600,
              margin: "0 auto 16px",
            }}
          >
            Three deadlines, a reading you&apos;ve reopened four times, and a brain that won&apos;t
            cross the line into starting. Every study app hands you a timer and wishes you luck.
            Nobody talks about the gap before you begin. That gap is why Aqademiq exists.
          </p>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(1.15rem,1.9vw,1.5rem)",
              lineHeight: 1.4,
              color: "#31237c",
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            If you&apos;ve reorganized your entire desk to avoid opening one document. Welcome.
            You&apos;re exactly who we made this for.
          </p>
        </div>
      </section>

      <section
        style={{ background: "#fff", padding: "clamp(52px,7vh,92px) clamp(20px,6vw,60px)" }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(32px,4vw,48px)" }} data-reveal="">
            <div className={styles.eyebrow} style={{ textAlign: "center" }}>
              Built with students
            </div>
            <h2 className={styles.sec} style={{ margin: "0 auto 14px" }}>
              Not built for students. Built with them.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1.02rem,1.3vw,1.18rem)",
                lineHeight: 1.55,
                color: "#4a4742",
                maxWidth: 600,
                margin: "0 auto 16px",
              }}
            >
              Aqademiq started with students tired of study apps that only worked once you&apos;d
              already begun. Over 1,000 use it now, and their feedback shapes where it goes next.
            </p>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "9px 16px",
                background: "var(--aq-paper)",
                borderRadius: 100,
                fontSize: 13.5,
                fontWeight: 600,
                color: "#45423d",
              }}
            >
              <span className="material-icons-outlined" style={{ fontSize: 17, color: "#5941d6" }}>
                school
              </span>
              Built with students at BITS Pilani Dubai
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 18,
            }}
            data-reveal=""
          >
            <div
              style={{
                background: "var(--aq-paper)",
                borderRadius: 22,
                padding: 28,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1.15rem",
                  lineHeight: 1.45,
                  fontWeight: 600,
                  color: "#14130f",
                  margin: 0,
                }}
              >
                &quot;Before, I&apos;d reorganize my desk for an hour instead of starting. Now I tap
                the cube and somehow I&apos;m just… doing it.&quot;
              </p>
              <div style={{ fontSize: 13, color: "#736f68", fontWeight: 700, marginTop: "auto" }}>
                Aanya · 2nd year, Engineering
              </div>
            </div>
            <div
              style={{
                background: "var(--aq-paper)",
                borderRadius: 22,
                padding: 28,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1.15rem",
                  lineHeight: 1.45,
                  fontWeight: 600,
                  color: "#14130f",
                  margin: 0,
                }}
              >
                &quot;Ada breaking my essay into steps was the first time a &apos;plan&apos;
                didn&apos;t make me anxious.&quot;
              </p>
              <div style={{ fontSize: 13, color: "#736f68", fontWeight: 700, marginTop: "auto" }}>
                Sam · final year, Psychology
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "clamp(52px,7vh,92px) clamp(20px,6vw,60px)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(32px,4vw,48px)" }} data-reveal="">
            <div className={styles.eyebrow} style={{ textAlign: "center" }}>
              Made for your whole term
            </div>
            <h2 className={styles.sec} style={{ margin: "0 auto" }}>
              For the good weeks and the impossible ones.
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 30 }}>
            {[
              {
                bg: "#fdeef2",
                icon: "event",
                iconColor: "#e85476",
                title: "Exam season",
                body: "Hand Ada the whole syllabus panic, and get back small, spread-out steps instead of one terrifying all-nighter weekend.",
              },
              {
                bg: "var(--aq-periwinkle-soft)",
                icon: "ac_unit",
                iconColor: "#5941d6",
                title: "The subject you dread",
                body: "Pair the subject you avoid with one short, gentle session. Starting stops being the wall it always was.",
              },
              {
                bg: "#e8fdf3",
                icon: "self_improvement",
                iconColor: "#1f7d54",
                title: "The days it feels impossible",
                body: "No streak to lose, no guilt if you stop. You come back when you're ready, and beginning is still just one tap.",
              },
            ].map((c) => (
              <div
                key={c.title}
                data-reveal=""
                style={{
                  background: "#fff",
                  borderRadius: 26,
                  padding: "clamp(26px,3.5vw,40px)",
                  boxShadow: "0 2px 16px rgba(0,0,0,.06)",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "clamp(18px,3vw,40px)",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 64,
                    height: 64,
                    borderRadius: 20,
                    background: c.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    className="material-icons-outlined"
                    style={{ fontSize: 32, color: c.iconColor }}
                  >
                    {c.icon}
                  </span>
                </div>
                <div style={{ flex: 1, minWidth: 240 }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 800,
                      fontSize: "clamp(1.4rem,2.4vw,1.9rem)",
                      letterSpacing: "-.02em",
                      margin: "0 0 8px",
                      color: "#14130f",
                    }}
                  >
                    {c.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(1rem,1.25vw,1.15rem)",
                      lineHeight: 1.55,
                      color: "#4a4742",
                      margin: 0,
                      maxWidth: 620,
                    }}
                  >
                    {c.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p
            style={{
              textAlign: "center",
              fontFamily: "var(--font-sans)",
              fontSize: 15,
              lineHeight: 1.55,
              color: "#736f68",
              maxWidth: 620,
              margin: "0 auto",
            }}
            data-reveal=""
          >
            Whether you procrastinate, freeze at the blank page, or your brain just works
            differently, including if you have ADHD or trouble getting started. This was built to be
            a kind place to study. It&apos;s a study tool, not a medical one.
          </p>
        </div>
      </section>

      <section
        style={{
          background: "var(--aq-periwinkle-soft)",
          padding: "clamp(52px,7vh,92px) clamp(20px,6vw,60px)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 680, margin: "0 auto" }} data-reveal="">
          <div className={styles.eyebrow} style={{ textAlign: "center", color: "#8478b0" }}>
            Fair for students
          </div>
          <h2 className={styles.sec} style={{ margin: "0 auto 16px", color: "#31237c" }}>
            Free today. Fair always.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.05rem,1.4vw,1.22rem)",
              lineHeight: 1.55,
              color: "#4a3f7a",
              maxWidth: 560,
              margin: "0 auto 12px",
            }}
          >
            Every part of Aqademiq is free right now — no credit card, nothing locked away. If we
            ever add a small fee, it&apos;ll be minimal and only to keep the app running, because
            cost shouldn&apos;t be the reason you can&apos;t use something that helps.
          </p>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              fontStyle: "italic",
              color: "#8478b0",
              margin: "0 0 26px",
            }}
          >
            Any future fee would only ever cover what it costs to run Aqademiq. That&apos;s it.
          </p>
          <a
            href={APP_URL}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "15px 30px",
              background: "#111",
              color: "#fff",
              borderRadius: 100,
              fontWeight: 800,
              fontSize: 16,
            }}
          >
            Start free
          </a>
        </div>
      </section>

      <section
        style={{
          padding: "clamp(52px,7vh,92px) clamp(20px,6vw,60px)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 640, margin: "0 auto" }} data-reveal="">
          <div style={{ display: "inline-block", marginBottom: 18 }}>
            <AdaCube size={58} rating={4} expr="happy" />
          </div>
          <h2 className={styles.sec} style={{ margin: "0 auto 14px" }}>
            Starting is easier with company.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.02rem,1.3vw,1.18rem)",
              lineHeight: 1.55,
              color: "#4a4742",
              maxWidth: 540,
              margin: "0 auto",
            }}
          >
            Studying next to someone, even quietly, even online, makes beginning easier. A lot of
            students, especially in the ADHD community, call it body doubling. Invite a friend and
            you can start together.
          </p>
        </div>
      </section>

      <section
        style={{
          background: "#fff",
          padding: "clamp(60px,9vh,120px) clamp(20px,6vw,60px)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 680, margin: "0 auto" }} data-reveal="">
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 800,
              fontSize: "clamp(2rem,4.2vw,3.2rem)",
              letterSpacing: "-.03em",
              lineHeight: 1.05,
              margin: "0 0 18px",
              color: "#14130f",
              textWrap: "balance",
            }}
          >
            The hardest part is starting. We built the whole thing to help.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.05rem,1.35vw,1.2rem)",
              lineHeight: 1.5,
              color: "#4a4742",
              margin: "0 auto 28px",
              fontWeight: 500,
            }}
          >
            Give it five minutes. You might just begin.
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
            <a href={APP_URL} style={startFreeStyle}>
              Start studying free
            </a>
            <GetAppButton style={getAppBtnStyle}>Get the app</GetAppButton>
          </div>
          <div style={{ fontSize: 13.5, color: "#8e8a83", fontWeight: 600 }}>
            Completely free · no credit card · loved by 1,000+ students
          </div>
        </div>
      </section>
    </div>
  );
}
