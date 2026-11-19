"use client";

import Link from "next/link";
import { useState, type CSSProperties, type FormEvent } from "react";
import { AdaCube } from "@/components/ds";
import { CONTACT_EMAIL } from "@/lib/config";

type Status = "idle" | "sending" | "done" | "error";

const h1: CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontWeight: 800,
  fontSize: "clamp(1.9rem,4vw,2.6rem)",
  letterSpacing: "-.03em",
  lineHeight: 1.1,
  color: "#14130f",
  margin: "0 0 12px",
  textWrap: "balance",
};
const body: CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "clamp(1rem,1.4vw,1.1rem)",
  lineHeight: 1.55,
  color: "#4a4742",
  margin: "0 0 26px",
};
const primary: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "14px 28px",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: 100,
  fontFamily: "var(--font-sans)",
  fontWeight: 800,
  fontSize: 15,
  cursor: "pointer",
};
const ghost: CSSProperties = {
  ...primary,
  background: "transparent",
  color: "#14130f",
  border: "1.5px solid rgba(20,19,15,.18)",
  fontWeight: 700,
};

export function UnsubscribeForm({ initialEmail }: { initialEmail: string }) {
  const [email, setEmail] = useState(initialEmail);
  const [status, setStatus] = useState<Status>("idle");
  const fromLink = initialEmail !== "";

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div style={{ maxWidth: 480 }} role="status">
        <div style={{ display: "inline-block", marginBottom: 18 }}>
          <AdaCube size={72} rating={3} expr="smile" />
        </div>
        <h1 style={h1}>You&apos;re unsubscribed.</h1>
        <p style={body}>
          We won&apos;t send update emails to <b style={{ color: "#14130f", overflowWrap: "anywhere" }}>{email}</b> again.
          Emails about your account still arrive.
        </p>
        <Link href="/" style={primary}>
          Back to Aqademiq
        </Link>
      </div>
    );
  }

  return (
    <form style={{ maxWidth: 480, width: "100%" }} onSubmit={submit}>
      <div style={{ display: "inline-block", marginBottom: 18 }}>
        <AdaCube size={72} rating={4} expr="happy" />
      </div>
      <h1 style={h1}>Stop update emails?</h1>
      {fromLink ? (
        <p style={body}>
          We&apos;ll stop sending Aqademiq updates to{" "}
          <b style={{ color: "#14130f", overflowWrap: "anywhere" }}>{email}</b>. No hard feelings.
        </p>
      ) : (
        <>
          <p style={{ ...body, marginBottom: 18 }}>
            Enter the address our emails reach and we&apos;ll stop sending Aqademiq updates to it.
          </p>
          <label htmlFor="unsub-email" style={{ position: "absolute", left: -9999 }}>
            Email address
          </label>
          <input
            id="unsub-email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              margin: "0 0 18px",
              padding: "14px 18px",
              borderRadius: 14,
              border: "1.5px solid rgba(20,19,15,.14)",
              background: "#fff",
              fontFamily: "var(--font-sans)",
              fontSize: 16,
              color: "#14130f",
            }}
          />
        </>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
        <button type="submit" style={primary} disabled={status === "sending"}>
          {status === "sending" ? "Unsubscribing…" : "Unsubscribe"}
        </button>
        <Link href="/" style={ghost}>
          Keep getting updates
        </Link>
      </div>
      {status === "error" && (
        <p role="alert" style={{ ...body, fontSize: 14, margin: "18px 0 0" }}>
          That didn&apos;t go through. Try again, or email{" "}
          <a href={`mailto:${CONTACT_EMAIL}?subject=Unsubscribe`} style={{ color: "#5941d6" }}>
            {CONTACT_EMAIL}
          </a>{" "}
          and we&apos;ll take you off the list.
        </p>
      )}
    </form>
  );
}
