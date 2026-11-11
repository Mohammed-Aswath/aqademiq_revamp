"use client";

import Image from "next/image";
import Link from "next/link";
import { APP_URL, CONTACT_EMAIL } from "@/lib/config";
import { useLoginHref } from "@/lib/useLoginHref";
import lockup from "@/public/assets/brand/aqademiq-lockup-white.png";
import r13 from "@/public/assets/brand/r13-lockup-night.png";
import { useApp } from "./AppProvider";
import styles from "./SiteFooter.module.css";

type FooterLink = { label: string; href: string };

// Section anchors are load-bearing: each one names an id on its target page.
const COLUMNS: { head: string; links: FooterLink[] }[] = [
  {
    head: "Product",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "App freeze", href: "/how-it-works#freeze" },
      { label: "Planning", href: "/how-it-works#plan" },
      { label: "Import", href: "/how-it-works#import" },
      { label: "Ada", href: "/how-it-works#ada" },
    ],
  },
  {
    head: "Focus",
    links: [
      { label: "Focus timer", href: "/how-it-works#focus" },
      { label: "Prism sound", href: "/science#prism" },
      { label: "Haptics", href: "/how-it-works#feel" },
      { label: "Lock Screen & Watch", href: "/how-it-works#ambient" },
      { label: "The Core", href: "/how-it-works#core" },
    ],
  },
  {
    head: "Students",
    links: [
      { label: "For students", href: "/students" },
      { label: "Exam season", href: "/students#exam-season" },
      { label: "The science", href: "/science" },
    ],
  },
  {
    head: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: `mailto:${CONTACT_EMAIL}` },
      { label: "Privacy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms-of-use" },
    ],
  },
];

function FooterAnchor({ label, href }: FooterLink) {
  // mailto: and other non-route hrefs stay plain anchors.
  return href.startsWith("/") ? (
    <Link className={styles.link} href={href}>
      {label}
    </Link>
  ) : (
    <a className={styles.link} href={href}>
      {label}
    </a>
  );
}

export function SiteFooter() {
  const { openGetApp } = useApp();
  const loginHref = useLoginHref();

  return (
    <footer style={{ background: "#14130f", color: "#f4f3f0", fontFamily: "var(--font-sans)" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(60px,8vw,104px) clamp(20px,6vw,80px) 34px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "40px 32px",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingBottom: "clamp(44px,6vw,72px)",
            borderBottom: "1px solid rgba(255,255,255,.1)",
          }}
        >
          <div style={{ maxWidth: 520 }}>
            <Link
              href="/"
              aria-label="Aqademiq home"
              style={{ display: "inline-flex", alignItems: "center", marginBottom: 22 }}
            >
              <Image
                src={lockup}
                alt="Aqademiq"
                sizes="162px"
                style={{ height: 44, width: "auto", display: "block" }}
              />
            </Link>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(24px,3vw,34px)",
                lineHeight: 1.18,
                fontWeight: 500,
                margin: 0,
                color: "#f4f3f0",
                textWrap: "balance",
              }}
            >
              Your focus sanctuary.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 210 }}>
            <a
              className={styles.cta}
              href={APP_URL}
              style={{
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "14px 24px",
                background: "#fff",
                color: "#111",
                borderRadius: 100,
                fontWeight: 800,
                fontSize: 15,
                textDecoration: "none",
                letterSpacing: ".01em",
              }}
            >
              Start studying free
            </a>
            <button
              className={styles.cta}
              onClick={openGetApp}
              style={{
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "13px 24px",
                background: "transparent",
                color: "#f4f3f0",
                border: "1.5px solid rgba(255,255,255,.22)",
                borderRadius: 100,
                fontWeight: 700,
                fontSize: 14,
                fontFamily: "var(--font-sans)",
                cursor: "pointer",
              }}
            >
              Get the app
            </button>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Footer">
          {COLUMNS.map((col) => (
            <div className={styles.col} key={col.head}>
              <div className={styles.head}>{col.head}</div>
              {col.links.map((l) => (
                <FooterAnchor key={l.label} {...l} />
              ))}
            </div>
          ))}
          <div className={styles.col}>
            <div className={styles.head}>Get started</div>
            <a className={styles.link} href={APP_URL}>
              Start free on the web
            </a>
            <button className={`${styles.link} ${styles.btn}`} onClick={openGetApp}>
              Get the app
            </button>
            <a className={styles.link} href={loginHref}>
              Log in
            </a>
          </div>
        </nav>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 30,
            borderTop: "1px solid rgba(255,255,255,.1)",
          }}
        >
          <a
            className={styles.sig}
            href="https://r13labs.com"
            target="_blank"
            rel="noopener"
            aria-label="A product of R13 Labs. Opens r13labs.com"
          >
            <span style={{ fontSize: 15, fontWeight: 500, letterSpacing: ".005em", lineHeight: 1 }}>
              A product of
            </span>
            <Image src={r13} alt="" sizes="103px" style={{ height: 24, width: "auto", display: "block" }} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
