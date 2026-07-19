import type { Metadata } from "next";
import Link from "next/link";
import { AdaCube, IceTimer } from "@/components/ds";
import { RevealController } from "@/components/site/RevealController";
import { APP_URL } from "@/lib/config";
import styles from "./science.module.css";

export const metadata: Metadata = {
  title: "Science",
  description:
    "The research behind the calm: how Aqademiq's Prism sound engine and interface draw on published work in psychoacoustics, attention, and executive function.",
};

const researchLabel: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: ".1em",
  textTransform: "uppercase",
  color: "#5941d6",
};

const inAppLabel: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: ".1em",
  textTransform: "uppercase",
  color: "#8e8a83",
};

const rbodyResearch: React.CSSProperties = {
  fontSize: "16.5px",
  lineHeight: 1.62,
  color: "#3f3d3a",
  margin: "0 0 14px",
};

const rbodyInApp: React.CSSProperties = {
  fontSize: "16.5px",
  lineHeight: 1.62,
  color: "#14130f",
  margin: 0,
};

const entryHeading: React.CSSProperties = {
  fontWeight: 800,
  fontSize: "clamp(1.35rem,2.4vw,1.9rem)",
  letterSpacing: "-.02em",
  lineHeight: 1.1,
  margin: "0 0 14px",
  color: "#14130f",
};

const refNum: React.CSSProperties = {
  fontSize: 20,
  color: "#6b5cf0",
  minWidth: 26,
  fontWeight: 600,
};

const refText: React.CSSProperties = {
  fontSize: "14.5px",
  lineHeight: 1.55,
  color: "#3f3d3a",
};

const refRowStyle: React.CSSProperties = {
  display: "flex",
  gap: 16,
  padding: "15px 12px",
  borderBottom: "1px solid rgba(0,0,0,.07)",
  borderRadius: 10,
};

export default function SciencePage() {
  return (
    <div style={{ background: "var(--aq-paper)", overflowX: "clip" }}>
      <RevealController threshold={0.1} rootMargin="-5%" />

      <section
        style={{
          padding:
            "clamp(56px,9vh,104px) clamp(20px,6vw,60px) clamp(30px,4vh,52px)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 820, margin: "0 auto" }} data-reveal="">
          <div className={styles.eyebrow} style={{ marginBottom: 22 }}>
            The science
          </div>
          <h1
            style={{
              fontWeight: 800,
              fontSize: "clamp(2.5rem,5.6vw,4.6rem)",
              lineHeight: 1.02,
              letterSpacing: "-.034em",
              margin: "0 0 22px",
              color: "#14130f",
              textWrap: "balance",
            }}
          >
            The research behind the calm.
          </h1>
          <p
            style={{
              fontSize: "clamp(1.1rem,1.45vw,1.34rem)",
              lineHeight: 1.5,
              color: "#4a4742",
              maxWidth: 600,
              margin: "0 auto 14px",
              fontWeight: 500,
            }}
          >
            Two parts make Aqademiq work: the sound engine you hear, and the
            interface you touch. Neither is a mood board. Both are built on
            published research.
          </p>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.55,
              color: "#8e8a83",
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            Our choices aren&apos;t guesses. They trace back to published work in
            psychoacoustics, attention, and executive function. Here&apos;s what
            we leaned on, and where it led us.
          </p>
        </div>
      </section>

      <section
        style={{
          padding:
            "clamp(30px,4vh,50px) clamp(20px,6vw,60px) clamp(44px,6vh,72px)",
        }}
      >
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            justifyContent: "center",
          }}
          data-reveal=""
        >
          <a
            href="#prism"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 22px",
              background: "#fff",
              border: "1px solid rgba(0,0,0,.07)",
              borderRadius: 100,
              boxShadow: "0 2px 12px rgba(0,0,0,.04)",
            }}
          >
            <span
              className="material-icons-outlined"
              style={{ fontSize: 20, color: "#5941d6" }}
            >
              graphic_eq
            </span>
            <span style={{ fontWeight: 700, fontSize: 15, color: "#14130f" }}>
              Part 01 · the sound
            </span>
          </a>
          <a
            href="#interface"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 22px",
              background: "#fff",
              border: "1px solid rgba(0,0,0,.07)",
              borderRadius: 100,
              boxShadow: "0 2px 12px rgba(0,0,0,.04)",
            }}
          >
            <span
              className="material-icons-outlined"
              style={{ fontSize: 20, color: "#5941d6" }}
            >
              dashboard
            </span>
            <span style={{ fontWeight: 700, fontSize: 15, color: "#14130f" }}>
              Part 02 · the interface
            </span>
          </a>
        </div>
      </section>

      <section
        id="prism"
        style={{
          background: "#fff",
          padding:
            "clamp(52px,8vh,96px) clamp(20px,6vw,60px) clamp(30px,4vh,44px)",
        }}
      >
        <div
          style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}
          data-reveal=""
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              gap: 5,
              height: 38,
              marginBottom: 26,
            }}
            className={styles.wave}
            aria-hidden="true"
          >
            <span style={{ animationDelay: "0s" }} />
            <span style={{ animationDelay: ".15s" }} />
            <span style={{ animationDelay: ".32s" }} />
            <span style={{ animationDelay: ".1s" }} />
            <span style={{ animationDelay: ".44s" }} />
            <span style={{ animationDelay: ".22s" }} />
            <span style={{ animationDelay: ".05s" }} />
            <span style={{ animationDelay: ".36s" }} />
            <span style={{ animationDelay: ".18s" }} />
          </div>
          <div className={styles.eyebrow} style={{ marginBottom: 16 }}>
            Part 01 · Prism · the sound engine
          </div>
          <h2
            style={{
              fontWeight: 800,
              fontSize: "clamp(2rem,4.2vw,3.3rem)",
              letterSpacing: "-.03em",
              lineHeight: 1.05,
              margin: "0 0 18px",
              color: "#14130f",
              textWrap: "balance",
            }}
          >
            Sound as a focus instrument.
          </h2>
          <p
            style={{
              fontSize: "clamp(1.05rem,1.35vw,1.22rem)",
              lineHeight: 1.6,
              color: "#4a4742",
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            Prism isn&apos;t a playlist. It&apos;s generative sound engineered to
            quiet the room and hold your attention. Four principles from
            psychoacoustics and attention research shaped it.
          </p>
        </div>
      </section>

      <section
        style={{
          background: "#fff",
          padding:
            "clamp(20px,3vh,32px) clamp(20px,6vw,60px) clamp(52px,8vh,92px)",
        }}
      >
        <div
          style={{
            maxWidth: 880,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(30px,4.5vw,52px)",
          }}
        >
          <div
            className={styles.entry}
            data-reveal=""
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(16px,4vw,44px)",
              alignItems: "flex-start",
            }}
          >
            <div style={{ flexShrink: 0, width: 72 }}>
              <span
                className={styles.num}
                style={{ fontSize: "clamp(3rem,5vw,4.4rem)" }}
              >
                01
              </span>
            </div>
            <div style={{ flex: 1, minWidth: 260 }}>
              <h3 style={entryHeading}>Quiet the room without silence.</h3>
              <p className="rbody" style={rbodyResearch}>
                <span style={researchLabel}>The research</span> &nbsp;A steady,
                broadband texture raises the noise floor of a room, so a slamming
                door or a passing conversation no longer spikes above it and
                yanks your attention away. It&apos;s the principle behind sound
                masking in psychoacoustics.
                <a href="#r5" className={styles.sup}>
                  5
                </a>
              </p>
              <p className="rbody" style={rbodyInApp}>
                <span style={inAppLabel}>In Aqademiq</span> &nbsp;Every Prism mode
                lays down an even bed of sound with no sharp edges to snag on, so
                the distractions around you simply stop landing.
              </p>
            </div>
          </div>

          <div
            className={styles.entry}
            data-reveal=""
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(16px,4vw,44px)",
              alignItems: "flex-start",
            }}
          >
            <div style={{ flexShrink: 0, width: 72 }}>
              <span
                className={styles.num}
                style={{ fontSize: "clamp(3rem,5vw,4.4rem)" }}
              >
                02
              </span>
            </div>
            <div style={{ flex: 1, minWidth: 260 }}>
              <h3 style={entryHeading}>
                A little noise can steady a restless mind.
              </h3>
              <p className="rbody" style={rbodyResearch}>
                <span style={researchLabel}>The research</span> &nbsp;For minds
                that find focus hard, a moderate amount of broadband noise can
                actually improve attention rather than harm it: the moderate
                brain arousal model, borne out in studies of noise and cognition,
                including in people with ADHD.
                <a href="#r2" className={styles.sup}>
                  2
                </a>
                <a href="#r3" className={styles.sup}>
                  3
                </a>
              </p>
              <p className="rbody" style={rbodyInApp}>
                <span style={inAppLabel}>In Aqademiq</span> &nbsp;Deep Work leans
                on a denser texture on purpose, tuned for exactly the heavy tasks
                you keep putting off.
              </p>
            </div>
          </div>

          <div
            className={styles.entry}
            data-reveal=""
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(16px,4vw,44px)",
              alignItems: "flex-start",
            }}
          >
            <div style={{ flexShrink: 0, width: 72 }}>
              <span
                className={styles.num}
                style={{ fontSize: "clamp(3rem,5vw,4.4rem)" }}
              >
                03
              </span>
            </div>
            <div style={{ flex: 1, minWidth: 260 }}>
              <h3 style={entryHeading}>Stimulating, never singable.</h3>
              <p className="rbody" style={rbodyResearch}>
                <span style={researchLabel}>The research</span> &nbsp;Lyrics and
                melodies you can follow compete for the very verbal working
                memory you&apos;re using to read and write. Generative, wordless
                sound stimulates focus without hijacking it.
                <a href="#r1" className={styles.sup}>
                  1
                </a>
              </p>
              <p className="rbody" style={rbodyInApp}>
                <span style={inAppLabel}>In Aqademiq</span> &nbsp;Prism is endless
                and non-repeating, nothing to hum along to, nothing to wait for
                the drop of. It stays in the background where it belongs.
              </p>
            </div>
          </div>

          <div
            className={styles.entry}
            data-reveal=""
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(16px,4vw,44px)",
              alignItems: "flex-start",
            }}
          >
            <div style={{ flexShrink: 0, width: 72 }}>
              <span
                className={styles.num}
                style={{ fontSize: "clamp(3rem,5vw,4.4rem)" }}
              >
                04
              </span>
            </div>
            <div style={{ flex: 1, minWidth: 260 }}>
              <h3 style={entryHeading}>
                Tuned sound beats a shuffled playlist.
              </h3>
              <p className="rbody" style={rbodyResearch}>
                <span style={researchLabel}>The research</span> &nbsp;A
                peer-reviewed 2022 study measured focus with brain-computer
                interfaces and found personalized soundscapes produced more
                consistent focus than focus playlists or working in silence.
                <a href="#r1" className={styles.sup}>
                  1
                </a>{" "}
                Our engine is built on that same body of work.
              </p>
              <p className="rbody" style={rbodyInApp}>
                <span style={inAppLabel}>In Aqademiq</span> &nbsp;Four modes, each
                shaped for a kind of work: Deep Work, Flow, Review, Wind-down. Not
                a queue of songs competing for your ear.
              </p>
            </div>
          </div>
        </div>

        <div
          style={{ maxWidth: 820, margin: "clamp(40px,6vw,64px) auto 0" }}
          data-reveal=""
        >
          <div
            style={{
              background: "var(--aq-periwinkle-soft)",
              borderRadius: 26,
              padding: "clamp(28px,4vw,44px)",
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              alignItems: "center",
            }}
          >
            <span
              className="material-icons-outlined"
              style={{ fontSize: 34, color: "#5941d6", flexShrink: 0 }}
            >
              waves
            </span>
            <div style={{ flex: 1, minWidth: 260 }}>
              <div
                className={styles.eyebrow}
                style={{ marginBottom: 10, color: "#8478b0" }}
              >
                On flow
              </div>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "clamp(1.3rem,2.3vw,1.75rem)",
                  lineHeight: 1.34,
                  color: "#31237c",
                  margin: 0,
                  textWrap: "balance",
                }}
              >
                Flow, the absorbed, unhurried state the psychologist Mihaly
                Csikszentmihalyi named
                <a href="#r4" className={styles.sup} style={{ color: "#6b5cf0" }}>
                  4
                </a>
                , is what Prism is built to protect. Sound steady enough to
                disappear into, so you can.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="interface"
        style={{
          padding:
            "clamp(56px,8vh,100px) clamp(20px,6vw,60px) clamp(30px,4vh,44px)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }} data-reveal="">
          <div style={{ display: "inline-flex", marginBottom: 22 }}>
            <IceTimer progress={0.4} expr="focused" size={64} />
          </div>
          <div className={styles.eyebrow} style={{ marginBottom: 16 }}>
            Part 02 · The interface
          </div>
          <h2
            style={{
              fontWeight: 800,
              fontSize: "clamp(2rem,4.2vw,3.3rem)",
              letterSpacing: "-.03em",
              lineHeight: 1.05,
              margin: "0 0 18px",
              color: "#14130f",
              textWrap: "balance",
            }}
          >
            A screen designed to get you started.
          </h2>
          <p
            style={{
              fontSize: "clamp(1.05rem,1.35vw,1.22rem)",
              lineHeight: 1.6,
              color: "#4a4742",
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            The other half of focus is what you look at. The plan, the melting
            cube, and Ada all draw on decades of executive-function research: the
            science of how we start, focus, and follow through.
          </p>
        </div>
      </section>

      <section
        style={{
          padding:
            "clamp(20px,3vh,32px) clamp(20px,6vw,60px) clamp(52px,8vh,92px)",
        }}
      >
        <div
          style={{
            maxWidth: 880,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(30px,4.5vw,52px)",
          }}
        >
          <div
            className={styles.entry}
            data-reveal=""
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(16px,4vw,44px)",
              alignItems: "flex-start",
            }}
          >
            <div style={{ flexShrink: 0, width: 72 }}>
              <span
                className={styles.num}
                style={{ fontSize: "clamp(3rem,5vw,4.4rem)" }}
              >
                05
              </span>
            </div>
            <div style={{ flex: 1, minWidth: 260 }}>
              <h3 style={entryHeading}>Starting is a skill, not a virtue.</h3>
              <p className="rbody" style={rbodyResearch}>
                <span style={researchLabel}>The research</span> &nbsp;Getting
                going, <em>task initiation</em>, is a core executive function,
                and it&apos;s where many of us stall.
                <a href="#r6" className={styles.sup}>
                  6
                </a>{" "}
                Naming the very next concrete step, as a specific
                when-and-where plan, reliably improves follow-through.
                <a href="#r7" className={styles.sup}>
                  7
                </a>
              </p>
              <p className="rbody" style={rbodyInApp}>
                <span style={inAppLabel}>In Aqademiq</span> &nbsp;Ada turns the
                overwhelming pile into one small, scheduled first step, the
                opposite of a blank page waiting for willpower.
              </p>
            </div>
          </div>

          <div
            className={styles.entry}
            data-reveal=""
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(16px,4vw,44px)",
              alignItems: "flex-start",
            }}
          >
            <div style={{ flexShrink: 0, width: 72 }}>
              <span
                className={styles.num}
                style={{ fontSize: "clamp(3rem,5vw,4.4rem)" }}
              >
                06
              </span>
            </div>
            <div style={{ flex: 1, minWidth: 260 }}>
              <h3 style={entryHeading}>A clock you can feel, not fear.</h3>
              <p className="rbody" style={rbodyResearch}>
                <span style={researchLabel}>The research</span> &nbsp;Time is hard
                to sense in the abstract, and harder still for minds that struggle
                with focus; making it visible and ambient helps you gauge it
                without pressure.
                <a href="#r12" className={styles.sup}>
                  12
                </a>{" "}
                A gentle, changing object reads very differently from a red
                countdown.
              </p>
              <p className="rbody" style={rbodyInApp}>
                <span style={inAppLabel}>In Aqademiq</span> &nbsp;The cube slowly
                melts as you work, progress you can feel at a glance, never a
                number ticking down at you.
              </p>
            </div>
          </div>

          <div
            className={styles.entry}
            data-reveal=""
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(16px,4vw,44px)",
              alignItems: "flex-start",
            }}
          >
            <div style={{ flexShrink: 0, width: 72 }}>
              <span
                className={styles.num}
                style={{ fontSize: "clamp(3rem,5vw,4.4rem)" }}
              >
                07
              </span>
            </div>
            <div style={{ flex: 1, minWidth: 260 }}>
              <h3 style={entryHeading}>Get it out of your head.</h3>
              <p className="rbody" style={rbodyResearch}>
                <span style={researchLabel}>The research</span> &nbsp;Unfinished
                tasks keep tugging at your attention, the Zeigarnik effect
                <a href="#r8" className={styles.sup}>
                  8
                </a>
                , and holding them all in mind burns the working memory you need
                for the work itself.
                <a href="#r9" className={styles.sup}>
                  9
                </a>
              </p>
              <p className="rbody" style={rbodyInApp}>
                <span style={inAppLabel}>In Aqademiq</span> &nbsp;One calm plan
                holds everything for today, so your head doesn&apos;t have to, and
                the next step is always in view.
              </p>
            </div>
          </div>

          <div
            className={styles.entry}
            data-reveal=""
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(16px,4vw,44px)",
              alignItems: "flex-start",
            }}
          >
            <div style={{ flexShrink: 0, width: 72 }}>
              <span
                className={styles.num}
                style={{ fontSize: "clamp(3rem,5vw,4.4rem)" }}
              >
                08
              </span>
            </div>
            <div style={{ flex: 1, minWidth: 260 }}>
              <h3 style={entryHeading}>Kindness gets more done than shame.</h3>
              <p className="rbody" style={rbodyResearch}>
                <span style={researchLabel}>The research</span> &nbsp;Self-compassion
                increases the motivation to improve after a setback, measurably
                more than self-criticism does.
                <a href="#r10" className={styles.sup}>
                  10
                </a>{" "}
                A streak that punishes a bad day works against the very thing it
                claims to build.
              </p>
              <p className="rbody" style={rbodyInApp}>
                <span style={inAppLabel}>In Aqademiq</span> &nbsp;Miss a day and
                nothing breaks. The streak only ever encourages. There&apos;s no
                chain to snap, no guilt to carry back.
              </p>
            </div>
          </div>

          <div
            className={styles.entry}
            data-reveal=""
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(16px,4vw,44px)",
              alignItems: "flex-start",
            }}
          >
            <div style={{ flexShrink: 0, width: 72 }}>
              <span
                className={styles.num}
                style={{ fontSize: "clamp(3rem,5vw,4.4rem)" }}
              >
                09
              </span>
            </div>
            <div style={{ flex: 1, minWidth: 260 }}>
              <h3 style={entryHeading}>Starting is easier with company.</h3>
              <p className="rbody" style={rbodyResearch}>
                <span style={researchLabel}>The research</span> &nbsp;We work
                differently in the quiet presence of others, a long-studied effect
                called social facilitation.
                <a href="#r11" className={styles.sup}>
                  11
                </a>{" "}
                It&apos;s why studying alongside someone, which the ADHD community
                calls body doubling, makes beginning easier.
              </p>
              <p className="rbody" style={rbodyInApp}>
                <span style={inAppLabel}>In Aqademiq</span> &nbsp;Study together,
                even quietly, even online, and let someone else&apos;s momentum
                help carry you into the work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{ padding: "clamp(52px,7vh,92px) clamp(20px,6vw,60px)" }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto" }} data-reveal="">
          <div
            style={{
              background: "#14130f",
              borderRadius: 28,
              padding: "clamp(32px,5vw,52px)",
              color: "#f4f3f0",
            }}
          >
            <div
              className={styles.eyebrow}
              style={{ color: "#8e8a83", marginBottom: 16 }}
            >
              Where we stay honest
            </div>
            <h2
              style={{
                fontWeight: 800,
                fontSize: "clamp(1.7rem,3.2vw,2.5rem)",
                letterSpacing: "-.025em",
                lineHeight: 1.1,
                color: "#fff",
                margin: "0 0 18px",
                textWrap: "balance",
              }}
            >
              What research can and can&apos;t say.
            </h2>
            <p
              style={{
                fontSize: "clamp(1.05rem,1.3vw,1.2rem)",
                lineHeight: 1.65,
                color: "rgba(244,243,240,.84)",
                margin: "0 0 16px",
              }}
            >
              We build on published work; we haven&apos;t run our own clinical
              trials, and nothing here is a medical claim. Studies describe what
              tends to help groups of people, not a promise for any one person or
              brain.
            </p>
            <p
              style={{
                fontSize: "clamp(1.05rem,1.3vw,1.2rem)",
                lineHeight: 1.65,
                color: "rgba(244,243,240,.84)",
                margin: 0,
              }}
            >
              Aqademiq is a study tool, not a diagnosis or a treatment.
              We&apos;d rather tell you that plainly than dress it up in a lab
              coat.
            </p>
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
          <div style={{ marginBottom: "clamp(28px,4vw,40px)" }} data-reveal="">
            <div className={styles.eyebrow} style={{ marginBottom: 12 }}>
              References
            </div>
            <h2
              style={{
                fontWeight: 800,
                fontSize: "clamp(1.6rem,3vw,2.2rem)",
                letterSpacing: "-.02em",
                lineHeight: 1.1,
                margin: 0,
                color: "#14130f",
              }}
            >
              What we drew on.
            </h2>
          </div>
          <ol
            style={{
              listStyle: "none",
              counterReset: "r",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
            data-reveal=""
          >
            <li id="r1" className={styles.refrow} style={refRowStyle}>
              <span className={styles.num} style={refNum}>
                1
              </span>
              <span style={refText}>
                Haruvi, A., Kopito, R., Brande-Eilat, N., Kalev, S., Kay, E., &amp;
                Furman, D. (2022).{" "}
                <em>
                  Measuring and Modeling the Effect of Audio on Human Focus in
                  Everyday Environments Using Brain–Computer Interface
                  Technology.
                </em>{" "}
                Frontiers in Computational Neuroscience.
              </span>
            </li>
            <li id="r2" className={styles.refrow} style={refRowStyle}>
              <span className={styles.num} style={refNum}>
                2
              </span>
              <span style={refText}>
                Söderlund, G., Sikström, S., &amp; Smart, A. (2007).{" "}
                <em>
                  Listen to the noise: Noise is beneficial for cognitive
                  performance in ADHD.
                </em>{" "}
                Journal of Child Psychology and Psychiatry.
              </span>
            </li>
            <li id="r3" className={styles.refrow} style={refRowStyle}>
              <span className={styles.num} style={refNum}>
                3
              </span>
              <span style={refText}>
                Lin, H.-Y., et al. (2022).{" "}
                <em>
                  The Effects of White Noise on Attentional Performance and
                  On-Task Behaviors in Preschoolers with ADHD.
                </em>{" "}
                International Journal of Environmental Research and Public Health.
              </span>
            </li>
            <li id="r4" className={styles.refrow} style={refRowStyle}>
              <span className={styles.num} style={refNum}>
                4
              </span>
              <span style={refText}>
                Csikszentmihalyi, M. (1990).{" "}
                <em>Flow: The Psychology of Optimal Experience.</em> Harper &amp;
                Row.
              </span>
            </li>
            <li id="r5" className={styles.refrow} style={refRowStyle}>
              <span className={styles.num} style={refNum}>
                5
              </span>
              <span style={refText}>
                Moore, B. C. J. (2012).{" "}
                <em>An Introduction to the Psychology of Hearing</em> (6th ed.).
                Brill, on masking and the auditory noise floor.
              </span>
            </li>
            <li id="r6" className={styles.refrow} style={refRowStyle}>
              <span className={styles.num} style={refNum}>
                6
              </span>
              <span style={refText}>
                Diamond, A. (2013). <em>Executive Functions.</em> Annual Review of
                Psychology, 64, 135–168.
              </span>
            </li>
            <li id="r7" className={styles.refrow} style={refRowStyle}>
              <span className={styles.num} style={refNum}>
                7
              </span>
              <span style={refText}>
                Gollwitzer, P. M. (1999).{" "}
                <em>Implementation intentions: Strong effects of simple plans.</em>{" "}
                American Psychologist, 54(7), 493–503.
              </span>
            </li>
            <li id="r8" className={styles.refrow} style={refRowStyle}>
              <span className={styles.num} style={refNum}>
                8
              </span>
              <span style={refText}>
                Zeigarnik, B. (1927).{" "}
                <em>On finished and unfinished tasks.</em> Psychologische
                Forschung.
              </span>
            </li>
            <li id="r9" className={styles.refrow} style={refRowStyle}>
              <span className={styles.num} style={refNum}>
                9
              </span>
              <span style={refText}>
                Sweller, J. (1988).{" "}
                <em>
                  Cognitive load during problem solving: Effects on learning.
                </em>{" "}
                Cognitive Science, 12(2), 257–285.
              </span>
            </li>
            <li id="r10" className={styles.refrow} style={refRowStyle}>
              <span className={styles.num} style={refNum}>
                10
              </span>
              <span style={refText}>
                Breines, J. G., &amp; Chen, S. (2012).{" "}
                <em>Self-Compassion Increases Self-Improvement Motivation.</em>{" "}
                Personality and Social Psychology Bulletin, 38(9), 1133–1143.
              </span>
            </li>
            <li id="r11" className={styles.refrow} style={refRowStyle}>
              <span className={styles.num} style={refNum}>
                11
              </span>
              <span style={refText}>
                Zajonc, R. B. (1965). <em>Social facilitation.</em> Science,
                149(3681), 269–274.
              </span>
            </li>
            <li
              id="r12"
              className={styles.refrow}
              style={{
                display: "flex",
                gap: 16,
                padding: "15px 12px",
                borderRadius: 10,
              }}
            >
              <span className={styles.num} style={refNum}>
                12
              </span>
              <span style={refText}>
                Barkley, R. A. (1997).{" "}
                <em>
                  Behavioral inhibition, sustained attention, and executive
                  functions.
                </em>{" "}
                Psychological Bulletin, 121(1), 65–94, on time perception and
                executive function.
              </span>
            </li>
          </ol>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.55,
              color: "#a8a49c",
              margin: "24px 0 0",
              maxWidth: 640,
            }}
          >
            These works informed our design decisions. They study sound,
            attention, and behavior in general. They are not evaluations of
            Aqademiq, and we don&apos;t present them as proof that the app will
            work for you.
          </p>
        </div>
      </section>

      <section
        style={{
          padding: "clamp(60px,9vh,120px) clamp(20px,6vw,60px)",
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
            background:
              "radial-gradient(circle,rgba(107,92,240,.1),transparent 64%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{ maxWidth: 680, margin: "0 auto", position: "relative" }}
          data-reveal=""
        >
          <div style={{ display: "inline-block", marginBottom: 24 }}>
            <AdaCube
              size={74}
              rating={4}
              expr="happy"
              style={{
                filter: "drop-shadow(0 12px 26px rgba(107,92,240,.28))",
              }}
            />
          </div>
          <h2
            style={{
              fontWeight: 800,
              fontSize: "clamp(2rem,4.2vw,3.2rem)",
              letterSpacing: "-.03em",
              lineHeight: 1.05,
              margin: "0 0 18px",
              color: "#14130f",
              textWrap: "balance",
            }}
          >
            The theory is nice. Starting is better.
          </h2>
          <p
            style={{
              fontSize: "clamp(1.05rem,1.35vw,1.2rem)",
              lineHeight: 1.5,
              color: "#4a4742",
              margin: "0 auto 28px",
              fontWeight: 500,
            }}
          >
            Feel the whole thing work for yourself. Free, right in your browser.
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
                fontSize: "16.5px",
              }}
            >
              Start studying free
            </a>
            <Link
              href="/how-it-works"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "16px 28px",
                background: "transparent",
                color: "#14130f",
                border: "1.5px solid rgba(20,19,15,.18)",
                borderRadius: 100,
                fontWeight: 700,
                fontSize: "15.5px",
              }}
            >
              See how it works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
