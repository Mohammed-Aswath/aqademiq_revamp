"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { APP_URL } from "@/lib/config";
import logo from "@/public/logo.png";
import styles from "./SiteHeader.module.css";

const NAV: { href: string; label: string; key: string }[] = [
  { href: "/how-it-works", label: "How it works", key: "how" },
  { href: "/science", label: "Science", key: "science" },
  { href: "/students", label: "For students", key: "students" },
  { href: "/about", label: "About", key: "about" },
];

function activeKey(pathname: string): string {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/how-it-works")) return "how";
  if (pathname.startsWith("/science")) return "science";
  if (pathname.startsWith("/students")) return "students";
  if (pathname.startsWith("/about")) return "about";
  return "";
}

export function SiteHeader() {
  const pathname = usePathname();
  const active = activeKey(pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const onScroll = () => {
      const s = window.scrollY > 6;
      if (el.dataset.scrolled !== String(s)) el.dataset.scrolled = String(s);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const burgerStyle: React.CSSProperties = {
    display: "block",
    width: 20,
    height: 2,
    background: "#111",
    borderRadius: 2,
    position: "relative",
    transition: "all .2s",
    boxShadow: `0 ${menuOpen ? 0 : -6}px 0 #111, 0 ${menuOpen ? 0 : 6}px 0 #111`,
    transform: `rotate(${menuOpen ? 45 : 0}deg)`,
  };

  return (
    <header
      ref={headerRef}
      className={styles.header}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        fontFamily: "var(--font-sans)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 clamp(18px,5vw,44px)",
          height: 66,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <Image
            src={logo}
            alt="Aqademiq"
            width={32}
            height={32}
            priority
            style={{ height: 32, width: 32, objectFit: "contain", flexShrink: 0 }}
          />
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 800,
              fontSize: 21,
              letterSpacing: "-.02em",
              color: "#111",
            }}
          >
            Aqademiq
          </span>
        </Link>

        <nav
          className={`${styles.nav} ${styles.desktop}`}
          style={{ display: "flex", alignItems: "center", gap: 30 }}
        >
          {NAV.map((n) => (
            <Link
              key={n.key}
              href={n.href}
              data-active={active === n.key}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div
          className={styles.desktop}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            flexShrink: 0,
          }}
        >
          <a className={styles.login} href={APP_URL}>
            Log in
          </a>
          <a
            href={APP_URL}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "11px 22px",
              background: "#111",
              color: "#fff",
              borderRadius: 100,
              fontWeight: 800,
              fontSize: 14.5,
              textDecoration: "none",
              letterSpacing: ".01em",
              whiteSpace: "nowrap",
            }}
          >
            Start free
          </a>
        </div>

        <button
          className={styles.burger}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menu"
          style={{
            width: 44,
            height: 44,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span style={burgerStyle} />
        </button>
      </div>

      {menuOpen && (
        <div
          style={{
            background: "rgba(244,243,240,.98)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(0,0,0,.06)",
            boxShadow: "0 12px 28px rgba(0,0,0,.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "14px clamp(18px,5vw,44px) 22px",
              gap: 2,
            }}
          >
            {NAV.map((n) => (
              <Link
                key={n.key}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: "14px 0",
                  color: "#111",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: 17,
                  borderBottom: "1px solid rgba(0,0,0,.06)",
                }}
              >
                {n.label}
              </Link>
            ))}
            <a
              href={APP_URL}
              style={{
                padding: "14px 0",
                color: "#57534d",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              Log in
            </a>
            <a
              href={APP_URL}
              style={{
                marginTop: 12,
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "14px 22px",
                background: "#111",
                color: "#fff",
                borderRadius: 100,
                fontWeight: 800,
                fontSize: 15,
                textDecoration: "none",
              }}
            >
              Start studying free
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default SiteHeader;
