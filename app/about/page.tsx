import type { Metadata } from "next";
import { AdaCube } from "@/components/ds";
import { GetAppButton } from "@/components/site/GetAppButton";
import { RevealController } from "@/components/site/RevealController";
import { APP_URL } from "@/lib/config";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Aqademiq is built by final-year students who spent years waiting for panic to do what discipline couldn't.",
};

export default function AboutPage() {
  return (
    <div style={{ background: "var(--aq-paper)", overflowX: "clip" }}>
      <RevealController threshold={0.12} rootMargin="-6%" />

      <section
        style={{
          padding:
            "clamp(60px,9vh,110px) clamp(20px,6vw,60px) clamp(40px,5vh,64px)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }} data-reveal="">
          <div style={{ display: "inline-block", marginBottom: 26 }}>
            <AdaCube size={70} rating={4} expr="happy" melt={0} />
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              color: "#8e8a83",
              fontWeight: 600,
              marginBottom: 20,
            }}
          >
            Our story
          </div>
          <h1
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 800,
              fontSize: "clamp(2.7rem,6.4vw,5.2rem)",
              lineHeight: 1.0,
              letterSpacing: "-.035em",
              margin: "0 0 22px",
              color: "#14130f",
            }}
          >
            We couldn&apos;t start either.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.1rem,1.5vw,1.35rem)",
              lineHeight: 1.5,
              color: "#4a4742",
              maxWidth: 560,
              margin: "0 auto",
              fontWeight: 500,
            }}
          >
            Aqademiq is built by final-year students who spent years waiting for
            panic to do what discipline couldn&apos;t.
          </p>
        </div>
      </section>

      <section
        style={{
          padding:
            "clamp(20px,3vh,36px) clamp(20px,6vw,60px) clamp(48px,7vh,80px)",
        }}
      >
        <div className={styles.st} style={{ maxWidth: 660, margin: "0 auto" }}>
          <div data-reveal="" style={{ marginBottom: "clamp(40px,6vh,64px)" }}>
            <div className={styles.eye}>The freeze</div>
            <h2>The only thing that made us start was fear.</h2>
            <p style={{ marginBottom: 0 }}>
              We&apos;d put things off until the deadline hurt enough to move.
              Then start late, rushed, and unprepared. It sort of worked. It also
              cost us our sleep, our marks, and a quiet feeling that something was
              wrong with us.
            </p>
          </div>
          <div data-reveal="">
            <div className={styles.eye}>One of us</div>
            <h2>The moment it stopped being funny.</h2>
            <p style={{ marginBottom: 24 }}>
              One of us was a semi-professional cricketer, balancing matches
              against board exams. It caught up at the worst time: sitting with an
              exam that mattered enormously, so overwhelmed they couldn&apos;t do
              a single task toward it.
            </p>
            <p
              className={styles.pq}
              style={{ fontSize: "clamp(1.4rem,2.8vw,2rem)", margin: 0 }}
            >
              Not lazy. Not unwilling. Just completely stuck at the one moment
              that mattered.
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          background: "#fff",
          padding: "clamp(48px,7vh,88px) clamp(20px,6vw,60px)",
        }}
      >
        <div className={styles.st} style={{ maxWidth: 660, margin: "0 auto" }}>
          <div data-reveal="">
            <div className={styles.eye}>
              Then we found out we weren&apos;t alone
            </div>
            <h2>It wasn&apos;t a personal failing. It was everyone&apos;s secret.</h2>
            <p style={{ marginBottom: 0 }}>
              We built something small to get ourselves moving, then went looking
              to see if it was just us. It wasn&apos;t. Thread after thread,
              students described the exact same freeze. We weren&apos;t rare, and
              we weren&apos;t broken. Nobody had built for the part before you
              start.
            </p>
          </div>
          <div
            data-reveal=""
            style={{
              marginTop: "clamp(30px,4vh,48px)",
              padding: "clamp(26px,4vw,40px)",
              background: "var(--aq-periwinkle-soft)",
              borderRadius: 24,
            }}
          >
            <p
              className={styles.pq}
              style={{ fontSize: "clamp(1.3rem,2.4vw,1.8rem)", margin: 0 }}
            >
              That&apos;s when it stopped being a fix for one of us and became a
              company, and when we stopped feeling alone.
            </p>
          </div>
        </div>
      </section>

      <section
        style={{ padding: "clamp(48px,7vh,88px) clamp(20px,6vw,60px)" }}
      >
        <div className={styles.st} style={{ maxWidth: 660, margin: "0 auto" }}>
          <div data-reveal="" style={{ marginBottom: "clamp(40px,6vh,64px)" }}>
            <div className={styles.eye}>What we believe</div>
            <h2>It isn&apos;t laziness. It isn&apos;t discipline.</h2>
            <p style={{ marginBottom: 0 }}>
              Starting is the hardest part, and shame only makes it worse. So we
              stopped pushing students and started lowering the wall instead: a
              smaller first step, a quieter room, something gentle to move into
              the work. That&apos;s what sound, haptics, and planning do.
            </p>
          </div>
          <div data-reveal="">
            <div className={styles.eye}>What we&apos;re fighting</div>
            <h2 style={{ marginBottom: 24 }}>The enemy isn&apos;t your phone.</h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  padding: "15px 0",
                  borderBottom: "1px solid rgba(0,0,0,.07)",
                }}
              >
                <span
                  className="material-icons-outlined"
                  style={{ fontSize: 22, color: "#6b5cf0", flexShrink: 0 }}
                >
                  ac_unit
                </span>
                <span
                  style={{ fontSize: 16, lineHeight: 1.5, color: "#3f3d3a" }}
                >
                  <b style={{ color: "#14130f" }}>The not-starting</b>: the
                  freeze, the blank page, the hour that vanishes before you begin.
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  padding: "15px 0",
                  borderBottom: "1px solid rgba(0,0,0,.07)",
                }}
              >
                <span
                  className="material-icons-outlined"
                  style={{ fontSize: 22, color: "#6b5cf0", flexShrink: 0 }}
                >
                  psychology_alt
                </span>
                <span
                  style={{ fontSize: 16, lineHeight: 1.5, color: "#3f3d3a" }}
                >
                  <b style={{ color: "#14130f" }}>The shame</b>: the part that
                  convinces you the problem is you.
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  padding: "15px 0",
                }}
              >
                <span
                  className="material-icons-outlined"
                  style={{ fontSize: 22, color: "#6b5cf0", flexShrink: 0 }}
                >
                  notifications_off
                </span>
                <span
                  style={{ fontSize: 16, lineHeight: 1.5, color: "#3f3d3a" }}
                >
                  <b style={{ color: "#14130f" }}>Apps that guilt-trip you</b>:
                  the ones that punish a bad day and call it motivation.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          background: "#fff",
          padding: "clamp(52px,7vh,92px) clamp(20px,6vw,60px)",
        }}
      >
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div
            className={styles.st}
            style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}
            data-reveal=""
          >
            <div className={styles.eye} style={{ justifyContent: "center" }}>
              Why a melting ice cube
            </div>
            <h2 style={{ margin: "0 auto 16px" }}>
              We borrowed the kindest idea on the internet.
            </h2>
            <p style={{ marginBottom: 0 }}>
              You&apos;ve seen the trend: study with me until the ice melts.
              Something slow and physical marking the time, instead of a
              countdown. We put it at the center of Aqademiq: press start, watch a
              cube melt while you work, and when it&apos;s gone, so is the task.
            </p>
          </div>
          <div
            data-reveal=""
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              gap: "clamp(10px,3vw,28px)",
              marginTop: "clamp(36px,5vw,52px)",
              flexWrap: "wrap",
            }}
          >
            <AdaCube size={66} rating={4} expr="happy" melt={0} />
            <AdaCube size={66} rating={4} expr="focused" melt={0.32} />
            <AdaCube size={66} rating={4} expr="neutral" melt={0.62} />
            <AdaCube size={66} rating={4} expr="meh" melt={0.9} />
          </div>
        </div>
      </section>

      <section
        style={{ padding: "clamp(48px,7vh,88px) clamp(20px,6vw,60px)" }}
      >
        <div style={{ maxWidth: 660, margin: "0 auto" }} data-reveal="">
          <div
            style={{
              background: "#14130f",
              borderRadius: 28,
              padding: "clamp(30px,5vw,48px)",
              color: "#f4f3f0",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: "#8e8a83",
                fontWeight: 600,
                marginBottom: 14,
              }}
            >
              What we&apos;ll never do
            </div>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 800,
                fontSize: "clamp(1.55rem,3vw,2.3rem)",
                letterSpacing: "-.025em",
                lineHeight: 1.1,
                color: "#fff",
                margin: "0 0 18px",
              }}
            >
              A promise about how we&apos;ll treat you.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1.05rem,1.3vw,1.18rem)",
                lineHeight: 1.6,
                color: "rgba(244,243,240,.82)",
                margin: 0,
              }}
            >
              <b style={{ color: "#fff" }}>We won&apos;t shame you</b>: no streak
              that dies, no guilt notification, no tone that says you&apos;re
              behind. And{" "}
              <b style={{ color: "#fff" }}>we&apos;ll always make space to adapt</b>.
              Aqademiq is a tool for starting, never a test you can fail.
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "clamp(52px,7vh,100px) clamp(20px,6vw,60px)",
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
            top: "50%",
            width: 520,
            height: 520,
            transform: "translate(-50%,-50%)",
            background:
              "radial-gradient(circle,rgba(107,92,240,.09),transparent 64%)",
            pointerEvents: "none",
          }}
        ></div>
        <div
          style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}
          data-reveal=""
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              color: "#8e8a83",
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            Where we&apos;re going
          </div>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 800,
              fontSize: "clamp(2rem,4.4vw,3.4rem)",
              letterSpacing: "-.03em",
              lineHeight: 1.05,
              color: "#14130f",
              margin: "0 0 22px",
              textWrap: "balance",
            }}
          >
            A million students, every day.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.05rem,1.35vw,1.2rem)",
              lineHeight: 1.6,
              color: "#3f3d3a",
              maxWidth: 600,
              margin: "0 auto 28px",
            }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>
              1,000+
            </span>{" "}
            students use Aqademiq already. We&apos;d like that to become a million,
            a million people procrastinating and burning out a little less than
            yesterday.
          </p>
          <p
            className={styles.pq}
            style={{ fontSize: "clamp(1.4rem,2.6vw,2rem)", maxWidth: 600, margin: "0 auto" }}
          >
            The world is fast, and only getting faster. We&apos;d like to help
            people slow down and gather themselves.
          </p>
        </div>
      </section>

      <section
        style={{
          background: "#fff",
          padding: "clamp(56px,8vh,110px) clamp(20px,6vw,60px)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 620, margin: "0 auto" }} data-reveal="">
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.1rem,1.5vw,1.32rem)",
              lineHeight: 1.5,
              color: "#14130f",
              margin: "0 0 28px",
              fontWeight: 600,
            }}
          >
            If any of this sounded like your brain, you&apos;re in the right place.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
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
        </div>
      </section>
    </div>
  );
}
