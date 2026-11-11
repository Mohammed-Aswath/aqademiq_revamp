import Link from "next/link";
import type { ReactNode } from "react";
import { GetAppButton } from "@/components/site/GetAppButton";
import s from "./home.module.css";

/*
 * FAQ (Home.dc.html section 14). Native <details> accordion, so it works
 * without JavaScript; only the "Get the app" link inside one answer is a
 * client island.
 */

function Q({ q, children }: { q: string; children: ReactNode }) {
  return (
    <details className={s["aq-fq"]}>
      <summary>
        {q}
        <span className={`${s.chev} material-icons-outlined`} aria-hidden="true">
          expand_more
        </span>
      </summary>
      <div className={s.a}>{children}</div>
    </details>
  );
}

export function FaqSection() {
  return (
    <section style={{ background: "#fff", padding: "clamp(56px,8vh,100px) clamp(20px,6vw,60px)" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 800,
            fontSize: "clamp(1.8rem,3.4vw,2.6rem)",
            letterSpacing: "-.026em",
            lineHeight: 1.08,
            margin: "0 0 clamp(20px,3vw,32px)",
            color: "#14130f",
            textAlign: "center",
          }}
        >
          Common questions
        </h2>
        <div data-reveal="">
          <Q q="Is Aqademiq free?">
            Yes. Aqademiq is completely free right now, App freeze included, on the web and on
            iPhone and Android, no credit card. Any future fee would be minimal and only to help
            keep it running.
          </Q>
          <Q q="How does App freeze work?">
            Pick the apps that pull you away and freeze them for a session, or on a schedule called
            a frost. If you open one, Ada&apos;s sitting on it. Still need it? Wait 10 seconds,
            then thaw it for 2 to 15 minutes. Turn on Deep freeze and nothing thaws until it ends.
          </Q>
          <Q q="Can Aqademiq see which apps I freeze?">
            No. Your list stays on your phone. On iPhone, Apple&apos;s Screen Time does the
            freezing, and it can&apos;t see, log or sync your picks. On Android, we never read your
            screen.
          </Q>
          <Q q="Is there a mobile app?">
            Yes, on iPhone and Android, free from the App Store or Google Play.{" "}
            <GetAppButton
              style={{
                background: "none",
                border: "none",
                padding: 0,
                color: "#5941d6",
                fontWeight: 700,
                fontSize: 15,
                fontFamily: "var(--font-sans)",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Get the app →
            </GetAppButton>
          </Q>
          <Q q="Is this an ADHD app?">
            It&apos;s built to be kind to brains that find starting hard, including ADHD and
            executive-function students. But it&apos;s for any student who procrastinates, and
            it&apos;s a study tool, not a medical one.
          </Q>
          <Q q="Do I need to install anything?">
            No. Aqademiq runs in your browser on laptop or phone. App freeze and the full haptics
            need the free iPhone or Android app, because only a phone app can freeze other apps
            and vibrate.
          </Q>
        </div>
        <div style={{ textAlign: "center", marginTop: 26 }}>
          <Link className={s["aq-plink"]} href="/faq" style={{ fontSize: 15.5 }}>
            All questions{" "}
            <span className="material-icons-outlined" aria-hidden="true" style={{ fontSize: 18 }}>
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
