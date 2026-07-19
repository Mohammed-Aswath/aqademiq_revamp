import type { Metadata } from "next";
import Link from "next/link";
import { AdaCube } from "@/components/ds";
import { GetAppButton } from "@/components/site/GetAppButton";
import { RevealController } from "@/components/site/RevealController";
import { APP_URL } from "@/lib/config";
import styles from "./faq.module.css";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about Aqademiq — what it is, how the focus timer, soundscapes, haptics, and Ada work, plus privacy, pricing, devices, and accessibility.",
};

const h2Style: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontWeight: 800,
  fontSize: "clamp(1.35rem,2.4vw,1.85rem)",
  letterSpacing: "-.02em",
  color: "#14130f",
  margin: "0 0 12px",
};

const accStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: 20,
  padding: "6px 22px",
  boxShadow: "0 2px 16px rgba(0,0,0,.05)",
};

const inlineGetAppStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  padding: 0,
  color: "#5941d6",
  fontWeight: 700,
  fontSize: 15.5,
  fontFamily: "var(--font-sans)",
  cursor: "pointer",
  textDecoration: "underline",
};

const startFreeStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 9,
  padding: "16px 30px",
  background: "#111",
  color: "#fff",
  borderRadius: 100,
  fontWeight: 800,
  fontSize: 16,
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

export default function FaqPage() {
  return (
    <div style={{ background: "var(--aq-paper)", overflowX: "clip" }}>
      <RevealController threshold={0.08} rootMargin="-4%" />

      <section
        style={{
          padding:
            "clamp(56px,9vh,104px) clamp(20px,6vw,80px) clamp(36px,5vh,56px)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto" }} data-reveal="">
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
            Support &amp; FAQ
          </div>
          <h1
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 800,
              fontSize: "clamp(2.6rem,5vw,4.2rem)",
              lineHeight: 1.04,
              letterSpacing: "-.03em",
              margin: "0 0 20px",
              color: "#14130f",
            }}
          >
            Questions, answered calmly.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.05rem,1.4vw,1.24rem)",
              lineHeight: 1.55,
              color: "#4a4742",
              margin: 0,
            }}
          >
            If something isn&apos;t here, email us. A real person replies.{" "}
            <a
              href="mailto:support@aqademiq.com"
              style={{ fontFamily: "var(--font-mono)", fontSize: ".92em" }}
            >
              support@aqademiq.com
            </a>
          </p>
        </div>
      </section>

      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding:
            "0 clamp(20px,6vw,80px) clamp(40px,6vh,72px)",
        }}
      >
        <div data-reveal="" style={{ marginBottom: 40 }}>
          <h2 style={h2Style}>About Aqademiq</h2>
          <div className={styles.acc} style={accStyle}>
            <details>
              <summary>
                What is Aqademiq?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                A calm study planner that helps you start. It gives you a gentle
                daily plan, a focus timer you can watch melt away, focus
                soundscapes, and an AI companion (Ada) who breaks big tasks into
                small, doable steps. The whole thing is built around the hardest
                moment in studying: actually beginning.
              </div>
            </details>
            <details>
              <summary>
                What does Aqademiq believe about studying?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                That not-starting isn&apos;t laziness, and it isn&apos;t a
                character flaw. The gap between sitting down and actually
                beginning is real, and for a lot of students it&apos;s the
                hardest part of the day. So instead of pushing you to try harder,
                Aqademiq makes the first step smaller, the room quieter, and the
                start gentler. Kindness over pressure. That&apos;s the whole
                philosophy, and it shapes every decision we make.
              </div>
            </details>
            <details>
              <summary>
                Who is Aqademiq for, and who&apos;s behind it?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                It&apos;s for students who find starting hard: procrastinators,
                people who freeze at the blank page, and anyone whose brain just
                works differently, including if you have ADHD or trouble with
                executive function. You don&apos;t need a diagnosis or a label to
                belong here. And it&apos;s built with students, not just for them.
                Over 1,000 already use Aqademiq, and their feedback shapes where
                it goes next.
              </div>
            </details>
            <details>
              <summary>
                What makes Aqademiq different?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                Most apps assume you&apos;ve already started. They hand you a
                timer or a to-do list and leave the hardest part to you. Aqademiq
                is built for the moment before that: it makes the first step
                smaller, quiets the room around you, and gives you something
                gentle to move into the work. And there&apos;s no shame engine: no
                guilt-trips, no streak that punishes you for having a hard day.
                It&apos;s a place to begin, not a place to be nagged.
              </div>
            </details>
            <details>
              <summary>
                Is Aqademiq free to use?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                Yes. Right now Aqademiq is completely free — on the web and on
                iPhone and Android, with no credit card. If we ever add a small
                fee, it&apos;ll be minimal and only to help keep it running.
              </div>
            </details>
            <details>
              <summary>
                Is Aqademiq a productivity app or a wellbeing app?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                Both, gently. It helps you plan and focus, and it lets you check
                in with your mood and reflect on your day, because how you feel
                and how you study aren&apos;t separate. But it isn&apos;t a
                medical or mental-health tool, and it won&apos;t diagnose or treat
                anything.
              </div>
            </details>
          </div>
        </div>

        <div data-reveal="" style={{ marginBottom: 40 }}>
          <h2 style={h2Style}>Using it now &amp; the app</h2>
          <div className={styles.acc} style={accStyle}>
            <details>
              <summary>
                Can I use Aqademiq right now?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                Yes. Start free in your browser right now, or download the app on
                iPhone and Android. Over 1,000 students already use it.
              </div>
            </details>
            <details>
              <summary>
                Is there a mobile app?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                Yes, on both iPhone and Android. Download it free from the App
                Store or Google Play.{" "}
                <GetAppButton style={inlineGetAppStyle}>
                  Get the app →
                </GetAppButton>
              </div>
            </details>
            <details>
              <summary>
                Does it work on Android?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                Yes. Aqademiq is on the Google Play Store, and it also runs in
                your Android browser.
              </div>
            </details>
            <details>
              <summary>
                What&apos;s different between the web version and the app?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                The web app gives you the full plan, the melting-cube focus timer,
                and the soundscapes. The iPhone and Android apps add the gentle{" "}
                <b>haptics</b>: the quiet taps you feel during a session, which a
                browser can&apos;t do as fully.
              </div>
            </details>
          </div>
        </div>

        <div data-reveal="" style={{ marginBottom: 40 }}>
          <h2 style={h2Style}>Privacy &amp; your data</h2>
          <div className={styles.acc} style={accStyle}>
            <details>
              <summary>
                Who can see my moods and reflections?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                Your mood logs and reflections are tied to your account and shown
                back to you in the app, so you can notice your own patterns over
                time.
              </div>
            </details>
            <details>
              <summary>
                What data does Aqademiq collect?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                The essentials to run the app: your account, the
                tasks/subjects/plans you create, and what you choose to log, plus
                basic technical data to keep it working.
              </div>
            </details>
            <details>
              <summary>
                Does Aqademiq use my camera, microphone, or location?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                No. The app doesn&apos;t ask for your camera, microphone,
                contacts, or precise location.
              </div>
            </details>
            <details>
              <summary>
                Can I delete my data or my account?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                Yes. Email{" "}
                <a href="mailto:support@aqademiq.com">support@aqademiq.com</a> or
                use your in-app account controls.
              </div>
            </details>
          </div>
        </div>

        <div data-reveal="" style={{ marginBottom: 40 }}>
          <h2 style={h2Style}>Focus, sound &amp; haptics</h2>
          <div className={styles.acc} style={accStyle}>
            <details>
              <summary>
                How does the focus timer work?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                Pick a task, start a session, and a frosted ice cube slowly melts
                as your focus time passes, a calm visual instead of a countdown.
                When the cube is gone, the task ticks itself off in your plan.
              </div>
            </details>
            <details>
              <summary>
                What are Prism modes?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                Focus soundscapes tuned for studying, not a playlist to get lost
                in. There&apos;s <b>Deep Work</b> for the thing you&apos;re
                avoiding, <b>Flow</b> to ride a good stretch, <b>Review</b> for
                going back over notes, and <b>Wind-down</b> to close the day, plus{" "}
                <b>No sound</b>, because silence is a mode too.
              </div>
            </details>
            <details>
              <summary>
                Do I need headphones?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                No, but they help the soundscapes do their job of covering the
                noise around you. On a phone, flip your ringer switch on so you
                can hear them.
              </div>
            </details>
            <details>
              <summary>
                What are the haptics, and do they work on the web?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                During a session the app can speak in gentle taps: a quiet pulse
                to begin, to breathe, and to come back if you drift. This is
                fullest on the <b>iPhone app</b>; in the browser you get the
                melting cube and the soundscapes.
              </div>
            </details>
            <details>
              <summary>
                Will a broken session ruin my progress?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                No. Stop whenever you need to. Nothing breaks, no streak dies,
                nothing shames you. You come back when you&apos;re ready.
              </div>
            </details>
          </div>
        </div>

        <div data-reveal="" style={{ marginBottom: 40 }}>
          <h2 style={h2Style}>Ada &amp; AI</h2>
          <div className={styles.acc} style={accStyle}>
            <details>
              <summary>
                What is Ada?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                Ada is your AI study companion. Tell it the messy pile of what
                you&apos;re behind on, and it breaks that into small, timed steps,
                and can plan them across your week around the hours you work best.
              </div>
            </details>
            <details>
              <summary>
                Can Ada get things wrong?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                Yes. Ada is a helpful companion, not a human expert, and it can
                make mistakes. It always suggests; you decide what actually goes
                into your plan.
              </div>
            </details>
            <details>
              <summary>
                How is my data used with Ada?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                What you share with Ada is used to generate your study help. As a
                habit, avoid putting other people&apos;s personal details into any
                AI prompt.
              </div>
            </details>
            <details>
              <summary>
                Is Ada a coach or a therapist?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                No. Ada helps you plan and start your studying. It isn&apos;t a
                mental-health tool and doesn&apos;t give medical, clinical, or
                therapeutic advice.
              </div>
            </details>
            <details>
              <summary>
                Do I have to use Ada?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                Not at all. You can plan and focus entirely on your own. Ada is
                there for the days when getting started feels impossible.
              </div>
            </details>
          </div>
        </div>

        <div data-reveal="" style={{ marginBottom: 40 }}>
          <h2 style={h2Style}>Students &amp; pricing</h2>
          <div className={styles.acc} style={accStyle}>
            <details>
              <summary>
                What does Aqademiq cost?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                Right now, Aqademiq is completely free — every part of it. Later
                we may add a small, optional fee, kept minimal and only to help
                cover what it costs to run, so we can keep supporting students.
              </div>
            </details>
            <details>
              <summary>
                Is there a student discount?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                Right now everyone uses Aqademiq for free. If we ever introduce a
                fee, keeping it fair for students — with a discount and a hardship
                option if cost is a barrier — is a promise, not an afterthought.
              </div>
            </details>
            <details>
              <summary>
                Do I need a .edu email to start?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                No. You can start free right now with any email. Any student
                verification only matters for a discount, later.
              </div>
            </details>
            <details>
              <summary>
                Why do you charge at all?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                Right now we don&apos;t — it&apos;s free. If we ever add a small
                fee, it will only cover what it costs to run Aqademiq, so we can
                keep it alive and open to more students. Never to profit off you.
              </div>
            </details>
          </div>
        </div>

        <div data-reveal="" style={{ marginBottom: 40 }}>
          <h2 style={h2Style}>Devices &amp; availability</h2>
          <div className={styles.acc} style={accStyle}>
            <details>
              <summary>
                What do I need to use Aqademiq?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                Just a web browser. Open it on a laptop or your phone&apos;s
                browser and start. Nothing to install.
              </div>
            </details>
            <details>
              <summary>
                Does it work on my phone&apos;s browser?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                Yes, on both iPhone and Android browsers. For the fullest
                experience, including the gentle <b>haptics</b>, download the app
                free from the App Store or Google Play.
              </div>
            </details>
            <details>
              <summary>
                Can I use it offline?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                Aqademiq works best with a connection so your plan stays in sync
                across devices.
              </div>
            </details>
          </div>
        </div>

        <div data-reveal="" style={{ marginBottom: 8 }}>
          <h2 style={h2Style}>Accessibility</h2>
          <div className={styles.acc} style={accStyle}>
            <details>
              <summary>
                Is Aqademiq accessible?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                We build to <b>WCAG 2.2 AA</b> and treat accessibility as part of
                the product, not an add-on. See our{" "}
                <a href="#">Accessibility statement</a> for specifics and how to
                reach us with issues.
              </div>
            </details>
            <details>
              <summary>
                Can I turn off motion and sound?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                Yes. Reduced motion and sound-off are first-class. The whole
                experience works beautifully quiet and still, and it respects your
                device&apos;s &quot;reduce motion&quot; setting automatically.
                You&apos;ll find <b>Reduce motion</b> and a <b>Readable font</b>{" "}
                toggle in the footer of this very site.
              </div>
            </details>
            <details>
              <summary>
                Is it designed for ADHD or executive-function struggles?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                It&apos;s designed around the difficulty of starting, which is
                exactly what many people with ADHD or executive-function
                challenges face: smaller first steps, quieter surroundings,
                visible time, and no shame. It&apos;s built to be welcoming, but it
                isn&apos;t a medical or diagnostic tool.
              </div>
            </details>
            <details>
              <summary>
                Do you support screen readers and keyboard navigation?
                <span className={`${styles.chev} material-icons-outlined`}>
                  expand_more
                </span>
              </summary>
              <div className={styles.ans}>
                Yes. The site and app are built with proper labels, semantics,
                keyboard access, and a dyslexia-friendly reading option. If
                anything gets in your way, tell us at{" "}
                <a href="mailto:support@aqademiq.com">support@aqademiq.com</a> and
                we&apos;ll fix it.
              </div>
            </details>
          </div>
        </div>
      </div>

      <section
        style={{
          padding:
            "clamp(50px,7vh,90px) clamp(20px,6vw,80px) clamp(70px,10vh,120px)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 640, margin: "0 auto" }} data-reveal="">
          <div style={{ display: "inline-block", marginBottom: 20 }}>
            <AdaCube size={60} rating={4} expr="happy" />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 800,
              fontSize: "clamp(1.6rem,3vw,2.3rem)",
              letterSpacing: "-.025em",
              color: "#14130f",
              margin: "0 0 14px",
            }}
          >
            Still have a question?
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 16,
              lineHeight: 1.55,
              color: "#4a4742",
              margin: "0 0 26px",
            }}
          >
            If your question isn&apos;t here, email{" "}
            <a
              href="mailto:support@aqademiq.com"
              style={{ fontFamily: "var(--font-mono)", fontSize: ".92em" }}
            >
              support@aqademiq.com
            </a>
            . A real person, not a bot, will get back to you.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 13,
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            <a href={APP_URL} style={startFreeStyle}>
              Start studying free
            </a>
            <GetAppButton style={getAppBtnStyle}>Get the app</GetAppButton>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px 18px",
              justifyContent: "center",
              fontSize: 14,
              color: "#8e8a83",
            }}
          >
            <Link href="/privacy-policy">Privacy</Link>
            <span style={{ color: "#c0bdb6" }}>·</span>
            <Link href="/terms-of-use">Terms</Link>
            <span style={{ color: "#c0bdb6" }}>·</span>
            <a href="#">Your data</a>
            <span style={{ color: "#c0bdb6" }}>·</span>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </section>
    </div>
  );
}
