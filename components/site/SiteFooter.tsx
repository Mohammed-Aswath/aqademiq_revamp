"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { APP_URL, CONTACT_EMAIL } from "@/lib/config";
import logo from "@/public/logo.png";
import { useApp } from "./AppProvider";
import styles from "./SiteFooter.module.css";

const COL_HEAD: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: ".16em",
  textTransform: "uppercase",
  color: "#8e8a83",
  marginBottom: 4,
};

const LINK_FS: CSSProperties = { fontSize: 14.5 };

function toggleStyle(on: boolean): CSSProperties {
  return {
    padding: "7px 13px",
    borderRadius: 100,
    fontSize: 12.5,
    fontWeight: 700,
    fontFamily: "var(--font-sans)",
    cursor: "pointer",
    border: `1.5px solid ${on ? "transparent" : "rgba(255,255,255,.22)"}`,
    background: on ? "#6b5cf0" : "transparent",
    color: on ? "#fff" : "rgba(244,243,240,.7)",
  };
}

export function SiteFooter() {
  const { openGetApp, reduce, dyslexia, toggleReduce, toggleDyslexia } = useApp();

  return (
    <footer style={{ background: "#14130f", color: "#f4f3f0", fontFamily: "var(--font-sans)" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(60px,8vw,104px) clamp(20px,6vw,80px) 36px",
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
            <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 22 }}>
              <Image
                src={logo}
                alt="Aqademiq"
                width={36}
                height={36}
                style={{ height: 36, width: 36, objectFit: "contain", flexShrink: 0 }}
              />
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 24, letterSpacing: "-.02em" }}>
                Aqademiq
              </span>
            </div>
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

        <nav
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
            gap: "36px 24px",
            padding: "clamp(44px,6vw,68px) 0",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={COL_HEAD}>Product</div>
            <Link className={styles.link} href="/how-it-works" style={LINK_FS}>How it works</Link>
            <Link className={styles.link} href="/how-it-works#focus" style={LINK_FS}>Focus &amp; sound</Link>
            <Link className={styles.link} href="/how-it-works#plan" style={LINK_FS}>Planning</Link>
            <Link className={styles.link} href="/how-it-works#ada" style={LINK_FS}>Ada</Link>
            <Link className={styles.link} href="/science" style={LINK_FS}>The science</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={COL_HEAD}>For you</div>
            <Link className={styles.link} href="/students" style={LINK_FS}>Students</Link>
            <a className={styles.link} href="#" style={LINK_FS}>Exam season</a>
            <a className={styles.link} href="#" style={LINK_FS}>ADHD &amp; focus</a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={COL_HEAD}>Company</div>
            <Link className={styles.link} href="/about" style={LINK_FS}>About</Link>
            <Link className={styles.link} href="/about" style={LINK_FS}>Manifesto</Link>
            <a className={styles.link} href="#" style={LINK_FS}>Blog</a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={COL_HEAD}>Get started</div>
            <a className={styles.link} href={APP_URL} style={LINK_FS}>Start free on the web</a>
            <button
              onClick={openGetApp}
              className={styles.link}
              style={{
                ...LINK_FS,
                background: "none",
                border: "none",
                padding: 0,
                textAlign: "left",
                cursor: "pointer",
                fontFamily: "var(--font-sans)",
              }}
            >
              Get the app
            </button>
            <a className={styles.link} href={APP_URL} style={LINK_FS}>Log in</a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={COL_HEAD}>Support &amp; legal</div>
            <Link className={styles.link} href="/faq" style={LINK_FS}>FAQ</Link>
            <a className={styles.link} href={`mailto:${CONTACT_EMAIL}`} style={LINK_FS}>Contact</a>
            <Link className={styles.link} href="/privacy-policy" style={LINK_FS}>Privacy</Link>
            <Link className={styles.link} href="/terms-of-use" style={LINK_FS}>Terms</Link>
            <a className={styles.link} href="#" style={LINK_FS}>Your data · Accessibility</a>
          </div>
        </nav>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "18px 28px",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 32,
            borderTop: "1px solid rgba(255,255,255,.1)",
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#8e8a83", letterSpacing: ".02em" }}>
            R13 Labs · © 2026 Aqademiq
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                fontSize: 11,
                color: "#8e8a83",
                fontFamily: "var(--font-mono)",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                marginRight: 2,
              }}
            >
              Comfort
            </span>
            <button className={styles.toggle} onClick={toggleReduce} style={toggleStyle(reduce)}>
              Reduce motion
            </button>
            <button className={styles.toggle} onClick={toggleDyslexia} style={toggleStyle(dyslexia)}>
              Readable font
            </button>
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 15, color: "rgba(244,243,240,.55)" }}>
            Private by design.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
