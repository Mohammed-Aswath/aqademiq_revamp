import type { Metadata } from "next";
import Link from "next/link";
import { AdaCube } from "@/components/ds";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main
      style={{
        background: "var(--aq-paper)",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "clamp(48px,8vh,96px) clamp(20px,6vw,60px)",
      }}
    >
      <div style={{ maxWidth: 480 }}>
        <div style={{ display: "inline-block", marginBottom: 18 }}>
          <AdaCube size={72} rating={1} expr="meh" melt={0.5} />
        </div>
        <h1
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 800,
            fontSize: "clamp(1.9rem,4vw,2.8rem)",
            letterSpacing: "-.03em",
            color: "#14130f",
            margin: "0 0 12px",
          }}
        >
          This page melted away.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(1rem,1.4vw,1.15rem)",
            lineHeight: 1.55,
            color: "#4a4742",
            margin: "0 0 26px",
          }}
        >
          We couldn&apos;t find what you were looking for. Let&apos;s get you back on track.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "13px 26px",
              background: "#111",
              color: "#fff",
              borderRadius: 100,
              fontWeight: 800,
              fontSize: 15,
            }}
          >
            Back to home
          </Link>
          <Link
            href="/support"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "13px 26px",
              background: "transparent",
              color: "#14130f",
              border: "1.5px solid rgba(20,19,15,.18)",
              borderRadius: 100,
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            Get support
          </Link>
        </div>
      </div>
    </main>
  );
}
