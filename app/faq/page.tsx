import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { AdaCube } from "@/components/ds";
import { GetAppButton } from "@/components/site/GetAppButton";
import { RevealController } from "@/components/site/RevealController";
import { APP_URL, CONTACT_EMAIL } from "@/lib/config";
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

const newTagStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  verticalAlign: "middle",
  padding: "3px 9px",
  borderRadius: 100,
  background: "#6b5cf0",
  color: "#fff",
  fontSize: 10.5,
  fontWeight: 800,
  letterSpacing: ".08em",
  textTransform: "uppercase",
  lineHeight: 1.2,
  marginLeft: 6,
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

const mailto = `mailto:${CONTACT_EMAIL}`;

type Faq = { q: string; a: ReactNode };
type FaqGroup = { title: string; isNew?: boolean; items: Faq[] };

const groups: FaqGroup[] = [
  {
    title: "About Aqademiq",
    items: [
      {
        q: "What is Aqademiq?",
        a: "A calm study planner that helps you start. It gives you a gentle daily plan, a focus timer you can watch melt away, focus soundscapes, and an AI companion (Ada) who breaks big tasks into small, doable steps. The whole thing is built around the hardest moment in studying: actually beginning.",
      },
      {
        q: "What does Aqademiq believe about studying?",
        a: "That not-starting isn't laziness, and it isn't a character flaw. The gap between sitting down and actually beginning is real, and for a lot of students it's the hardest part of the day. So instead of pushing you to try harder, Aqademiq makes the first step smaller, the room quieter, and the start gentler. Kindness over pressure. That's the whole philosophy, and it shapes every decision we make.",
      },
      {
        q: "Who is Aqademiq for, and who's behind it?",
        a: "It's for students who find starting hard: procrastinators, people who freeze at the blank page, and anyone whose brain just works differently, including if you have ADHD or trouble with executive function. You don't need a diagnosis or a label to belong here. And it's built with students, not just for them. Over 1,000 already use Aqademiq, and their feedback shapes where it goes next.",
      },
      {
        q: "What makes Aqademiq different?",
        a: "Most apps assume you've already started. They hand you a timer or a to-do list and leave the hardest part to you. Aqademiq is built for the moment before that: it makes the first step smaller, quiets the room around you, and gives you something gentle to move into the work. And there's no shame engine: no guilt-trips, no streak that punishes you for having a hard day. It's a place to begin, not a place to be nagged.",
      },
      {
        q: "Is Aqademiq free to use?",
        a: "Yes. Right now Aqademiq is completely free — on the web and on iPhone and Android, with no credit card. If we ever add a small fee, it'll be minimal and only to help keep it running.",
      },
      {
        q: "Is Aqademiq a productivity app or a wellbeing app?",
        a: "Both, gently. It helps you plan and focus, and it lets you check in with your mood and reflect on your day, because how you feel and how you study aren't separate. But it isn't a medical or mental-health tool, and it won't diagnose or treat anything.",
      },
    ],
  },
  {
    title: "Using it now & the app",
    items: [
      {
        q: "Can I use Aqademiq right now?",
        a: "Yes. Start free in your browser right now, or download the app on iPhone and Android. Over 1,000 students already use it.",
      },
      {
        q: "Is there a mobile app?",
        a: (
          <>
            Yes, on both iPhone and Android. Download it free from the App Store
            or Google Play.{" "}
            <GetAppButton style={inlineGetAppStyle}>Get the app →</GetAppButton>
          </>
        ),
      },
      {
        q: "Does it work on Android?",
        a: "Yes. Aqademiq is on the Google Play Store, and it also runs in your Android browser.",
      },
      {
        q: "What's different between the web version and the app?",
        a: (
          <>
            The web app gives you the full plan, the melting-cube focus timer,
            and the soundscapes. The iPhone and Android apps add{" "}
            <b>App freeze</b>, which only a phone app can do, and the full{" "}
            <b>haptics</b>, which a browser can&apos;t play.
          </>
        ),
      },
    ],
  },
  {
    title: "App freeze & import",
    isNew: true,
    items: [
      {
        q: "What is App freeze?",
        a: (
          <>
            App freeze holds the apps that pull you away, so the easiest thing
            left to open is the work. Freeze them for a session, an hour, or
            until you stop, or put them on a schedule called a <b>frost</b>,
            like Lecture hours on weekday mornings. Prefer it the other way
            round? Use <b>Keep only these</b> and everything else freezes.
          </>
        ),
      },
      {
        q: "What happens when I open a frozen app?",
        a: (
          <>
            Ada&apos;s sitting on it, with a short note and the time it&apos;s
            yours again. Tap <b>Back to focus</b>, or tap <b>Thaw</b>: wait 10
            seconds, then choose 2 to 15 minutes. Each thaw that day waits a
            little longer, and the app refreezes on its own.
          </>
        ),
      },
      {
        q: "What is Deep freeze?",
        a: "A freeze with no thawing until it ends, for the days you want the deal to hold. Phone, Messages, Maps and Wallet always stay open, even in Deep freeze.",
      },
      {
        q: "Can Aqademiq see which apps I freeze?",
        a: (
          <>
            No. Your list stays on your phone. On iPhone, Apple&apos;s Screen
            Time does the freezing, and it can&apos;t see, log or sync your
            picks. On Android, App freeze needs <b>Usage access</b> to know
            which app is open and <b>Display over other apps</b> to show the
            frozen screen. We never read your screen.
          </>
        ),
      },
      {
        q: "Does App freeze work on the web?",
        a: "No. Freezing other apps needs the iPhone or Android app. On some Android phones the battery manager can stop App freeze in the background; the app shows you how to fix it.",
      },
      {
        q: "Is App freeze free?",
        a: "Yes, like the rest of Aqademiq right now, including Deep freeze and Keep only these.",
      },
      {
        q: "Can I bring in my calendar, reminders or an existing list?",
        a: "Yes. Import from your calendar or reminders, or paste a list from your notes, a syllabus or a group chat. Each line becomes a task in your plan, ready to start or to hand to Ada.",
      },
    ],
  },
  {
    title: "Lock Screen, Watch & The Core",
    isNew: true,
    items: [
      {
        q: "Does a session show on my Lock Screen and Dynamic Island?",
        a: "Yes, on iPhone. A running session appears as a Live Activity on your Lock Screen and in the Dynamic Island, with a live clock. Freeze it, resume it or end it from there without opening the app. On StandBy, while your phone charges on its side, it becomes a desk clock for the session.",
      },
      {
        q: "Are there widgets and shortcuts?",
        a: (
          <>
            Three Home Screen widgets: what&apos;s next, how your week felt, and{" "}
            <b>Start 5 min</b>. You can also start five minutes from Control
            Center, or from the Action button on iPhone 15 Pro and later.
          </>
        ),
      },
      {
        q: "Does it work on Apple Watch?",
        a: "Yes. Freeze, resume or end a session from your wrist, with the Watch's own haptics.",
      },
      {
        q: "What do I get on Android?",
        a: "A Quick Settings tile that starts five minutes, a status chip while a session runs, and an ongoing notification for your session and App freeze.",
      },
      {
        q: "What is The Core?",
        a: "Your weekly report, told in nine short beats. Your week is drawn as an ice core, one band per day, tinted by your mood. It shows the shape of the week, one thing that happened, where your attention went and when you thawed, then offers one small thing for next week. It has exactly one number, and it's always a count of things that happened, never a rate, a percentage or a grade.",
      },
      {
        q: "Who can see my Core?",
        a: "Only you. It waits in its tab and never sends a notification. If you share it, the story image shows your week's shape only, with nothing about how you felt. What you wrote in reflections is never shown or exported. You can switch the report off whenever you like.",
      },
    ],
  },
  {
    title: "Privacy & your data",
    items: [
      {
        q: "Who can see my moods and reflections?",
        a: "Your mood logs and reflections are tied to your account and shown back to you in the app, so you can notice your own patterns over time.",
      },
      {
        q: "What data does Aqademiq collect?",
        a: "The essentials to run the app: your account, the tasks/subjects/plans you create, and what you choose to log, plus basic technical data to keep it working.",
      },
      {
        q: "Does Aqademiq use my camera, microphone, or location?",
        a: "No. The app doesn't ask for your camera, microphone, contacts, or precise location.",
      },
      {
        q: "Can I delete my data or my account?",
        a: (
          <>
            Yes. Email <a href={mailto}>{CONTACT_EMAIL}</a> or use your in-app
            account controls.
          </>
        ),
      },
    ],
  },
  {
    title: "Focus, sound & haptics",
    items: [
      {
        q: "How does the focus timer work?",
        a: "Pick a task, start a session, and a frosted ice cube slowly melts as your focus time passes, a calm visual instead of a countdown. When the cube is gone, the task ticks itself off in your plan.",
      },
      {
        q: "What are Prism modes?",
        a: (
          <>
            Focus soundscapes tuned for studying, not a playlist to get lost in.
            There&apos;s <b>Deep Work</b> for the thing you&apos;re avoiding,{" "}
            <b>Flow</b> to ride a good stretch, <b>Review</b> for going back
            over notes, and <b>Wind-down</b> to close the day, plus{" "}
            <b>No sound</b>, because silence is a mode too.
          </>
        ),
      },
      {
        q: "Do I need headphones?",
        a: "No, but they help the soundscapes do their job of covering the noise around you. On a phone, flip your ringer switch on so you can hear them.",
      },
      {
        q: "What are the haptics, and do they work on the web?",
        a: (
          <>
            In the iPhone and Android apps, every tap, freeze and thaw has its
            own feel, each based on something ice does: a freeze sets, a thaw
            melts, a finished session rings. Once a session starts, your phone
            stays still until it ends. Choose <b>Off</b>, <b>Essential</b> (the
            default: sessions, freezing and thawing) or <b>Full</b> (every tap
            and toggle) in Settings. In the browser you get the melting cube and
            the soundscapes.
          </>
        ),
      },
      {
        q: "Will a broken session ruin my progress?",
        a: "No. Stop whenever you need to. Nothing breaks, no streak dies, nothing shames you. You come back when you're ready.",
      },
    ],
  },
  {
    title: "Ada & AI",
    items: [
      {
        q: "What is Ada?",
        a: "Ada is your AI study companion. Tell it the messy pile of what you're behind on, and it breaks that into small, timed steps, and can plan them across your week around the hours you work best.",
      },
      {
        q: "Can Ada get things wrong?",
        a: "Yes. Ada is a helpful companion, not a human expert, and it can make mistakes. It always suggests; you decide what actually goes into your plan.",
      },
      {
        q: "How is my data used with Ada?",
        a: "What you share with Ada is used to generate your study help. As a habit, avoid putting other people's personal details into any AI prompt.",
      },
      {
        q: "Is Ada a coach or a therapist?",
        a: "No. Ada helps you plan and start your studying. It isn't a mental-health tool and doesn't give medical, clinical, or therapeutic advice.",
      },
      {
        q: "Do I have to use Ada?",
        a: "Not at all. You can plan and focus entirely on your own. Ada is there for the days when getting started feels impossible.",
      },
    ],
  },
  {
    title: "Students & pricing",
    items: [
      {
        q: "What does Aqademiq cost?",
        a: "Right now, Aqademiq is completely free — every part of it. Later we may add a small, optional fee, kept minimal and only to help cover what it costs to run, so we can keep supporting students.",
      },
      {
        q: "Is there a student discount?",
        a: "Right now everyone uses Aqademiq for free. If we ever introduce a fee, keeping it fair for students — with a discount and a hardship option if cost is a barrier — is a promise, not an afterthought.",
      },
      {
        q: "Do I need a .edu email to start?",
        a: "No. You can start free right now with any email. Any student verification only matters for a discount, later.",
      },
      {
        q: "Why do you charge at all?",
        a: "Right now we don't — it's free. If we ever add a small fee, it will only cover what it costs to run Aqademiq, so we can keep it alive and open to more students. Never to profit off you.",
      },
    ],
  },
  {
    title: "Devices & availability",
    items: [
      {
        q: "What do I need to use Aqademiq?",
        a: "Just a web browser. Open it on a laptop or your phone's browser and start. Nothing to install.",
      },
      {
        q: "Does it work on my phone's browser?",
        a: (
          <>
            Yes, on both iPhone and Android browsers. For the fullest
            experience, including the gentle <b>haptics</b>, download the app
            free from the App Store or Google Play.
          </>
        ),
      },
      {
        q: "Can I use it offline?",
        a: "Aqademiq works best with a connection so your plan stays in sync across devices.",
      },
    ],
  },
  {
    title: "Accessibility",
    items: [
      {
        q: "Is Aqademiq accessible?",
        a: (
          <>
            We build to <b>WCAG 2.2 AA</b> and treat accessibility as part of
            the product, not an add-on. See our{" "}
            <a href="#">Accessibility statement</a> for specifics and how to
            reach us with issues.
          </>
        ),
      },
      {
        q: "Can I turn off motion and sound?",
        a: (
          <>
            Yes. Reduced motion and sound-off are first-class. The whole
            experience works beautifully quiet and still, and it respects your
            device&apos;s &quot;reduce motion&quot; setting automatically.
            You&apos;ll find <b>Reduce motion</b> and a <b>Readable font</b>{" "}
            toggle in the footer of this very site.
          </>
        ),
      },
      {
        q: "Is it designed for ADHD or executive-function struggles?",
        a: "It's designed around the difficulty of starting, which is exactly what many people with ADHD or executive-function challenges face: smaller first steps, quieter surroundings, visible time, and no shame. It's built to be welcoming, but it isn't a medical or diagnostic tool.",
      },
      {
        q: "Do you support screen readers and keyboard navigation?",
        a: (
          <>
            Yes. The site and app are built with proper labels, semantics,
            keyboard access, and a dyslexia-friendly reading option. If anything
            gets in your way, tell us at <a href={mailto}>{CONTACT_EMAIL}</a>{" "}
            and we&apos;ll fix it.
          </>
        ),
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div
      className={styles.page}
      style={{ background: "var(--aq-paper)", overflowX: "clip" }}
    >
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
              href={mailto}
              style={{ fontFamily: "var(--font-mono)", fontSize: ".92em" }}
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </section>

      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "0 clamp(20px,6vw,80px) clamp(40px,6vh,72px)",
        }}
      >
        {groups.map((group, gi) => (
          <div
            key={group.title}
            data-reveal=""
            style={{ marginBottom: gi === groups.length - 1 ? 8 : 40 }}
          >
            <h2 style={h2Style}>
              {group.title}
              {group.isNew && (
                <>
                  {" "}
                  <span style={newTagStyle}>New</span>
                </>
              )}
            </h2>
            <div className={styles.acc} style={accStyle}>
              {group.items.map((item) => (
                <details key={item.q}>
                  <summary>
                    {item.q}
                    <span
                      className={`${styles.chev} material-icons-outlined`}
                      aria-hidden="true"
                    >
                      expand_more
                    </span>
                  </summary>
                  <div className={styles.ans}>{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        ))}
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
              href={mailto}
              style={{ fontFamily: "var(--font-mono)", fontSize: ".92em" }}
            >
              {CONTACT_EMAIL}
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
