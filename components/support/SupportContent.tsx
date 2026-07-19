"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/config";
import styles from "./support.module.css";

const CATEGORIES = [
  "General Question",
  "Bug Report",
  "Feature Request",
  "Account & Billing",
  "Other",
] as const;

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "How do I reset my password?",
    a: 'Go to the sign-in page and select "Forgot password". You’ll receive a reset email. If it doesn’t arrive within a few minutes, check spam or use the resend button on the confirmation screen.',
  },
  {
    q: "I didn’t receive my verification / reset email. What do I do?",
    a: (
      <>
        Verification and reset emails are sent from{" "}
        <strong>{CONTACT_EMAIL}</strong>. Check your spam folder, ensure the address is whitelisted,
        and use the in-app &quot;Resend Email&quot; button (60-second cooldown).
      </>
    ),
  },
  {
    q: "How does Ada AI work?",
    a: (
      <>
        Ada AI provides study recommendations, schedule suggestions, and document parsing. See{" "}
        <Link href="/how-it-works#ada">how it works</Link> for details. AI output is informational
        and should not be your only source for academic decisions.
      </>
    ),
  },
  {
    q: "How do I connect my calendar?",
    a: "Open Settings → Integrations and connect Google Calendar. Your use of third-party integrations is subject to their terms.",
  },
  {
    q: "Is my data private?",
    a: (
      <>
        Yes. You own your content. See our <Link href="/privacy-policy">Privacy Policy</Link> for how
        data is stored and processed.
      </>
    ),
  },
  {
    q: "How do I delete my account?",
    a: "Open Settings → Account → Delete Account. This permanently removes your data.",
  },
  {
    q: "The app isn’t working / I found a bug. How do I report it?",
    a: 'Use the contact form below and select "Bug Report". Include steps to reproduce, your device, and screenshots if possible.',
  },
];

type Values = {
  name: string;
  email: string;
  category: string;
  subject: string;
  message: string;
  company: string; // honeypot
};

type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = {
  name: "",
  email: "",
  category: "",
  subject: "",
  message: "",
  company: "",
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 1 || v.name.trim().length > 80)
    e.name = "Please enter your name (up to 80 characters).";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (!CATEGORIES.includes(v.category as (typeof CATEGORIES)[number]))
    e.category = "Please choose a category.";
  if (v.subject.trim().length < 3 || v.subject.trim().length > 120)
    e.subject = "Subject must be 3–120 characters.";
  const msg = v.message.trim().length;
  if (msg < 10 || msg > 2000) e.message = "Message must be 10–2000 characters.";
  return e;
}

export function SupportContent() {
  const router = useRouter();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);

  const set = (k: keyof Values, val: string) => {
    setValues((p) => ({ ...p, [k]: val }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;
    // Honeypot: a filled hidden field means a bot — pretend success, send nothing.
    if (values.company) {
      setStatus({ ok: true, msg: "Message sent — we’ll reply to your email soon." });
      setValues(EMPTY);
      return;
    }
    const eObj = validate(values);
    if (Object.keys(eObj).length) {
      setErrors(eObj);
      const first = Object.keys(eObj)[0];
      document.getElementById(`support-${first}`)?.focus();
      return;
    }
    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      setStatus({
        ok: false,
        msg: `You appear to be offline. Please email us directly at ${CONTACT_EMAIL}.`,
      });
      return;
    }
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          category: values.category,
          subject: values.subject.trim(),
          message: values.message.trim(),
        }),
      });
      if (res.ok) {
        setStatus({ ok: true, msg: "Message sent — we’ll reply to your email soon." });
        setValues(EMPTY);
        setErrors({});
      } else {
        setStatus({
          ok: false,
          msg: `Something went wrong sending your message. Please try again, or email us at ${CONTACT_EMAIL}.`,
        });
      }
    } catch {
      setStatus({
        ok: false,
        msg: `We couldn’t reach the server. Please try again, or email us at ${CONTACT_EMAIL}.`,
      });
    } finally {
      setSubmitting(false);
    }
  }

  const websiteHost = SITE_URL.replace(/^https?:\/\//, "");

  return (
    <div style={{ background: "var(--aq-paper)", minHeight: "60vh" }}>
      <div className={styles.container}>
        <button className={styles.back} onClick={() => router.back()} type="button">
          <span className="material-icons-outlined" style={{ fontSize: 18 }}>
            arrow_back
          </span>
          Back
        </button>

        <h1 className={styles.h1}>Support</h1>
        <p className={styles.subtitle}>
          We&apos;re here to help. Find answers below or reach out to our team directly.
        </p>

        {/* Quick help cards */}
        <div className={styles.cards}>
          <a className={styles.card} href="#faq">
            <span className="material-icons-outlined" aria-hidden="true" style={{ fontSize: 26, color: "var(--accent)", marginBottom: 12, display: "block" }}>
              menu_book
            </span>
            <div className={styles.cardTitle}>Browse FAQs</div>
            <p className={styles.cardDesc}>Answers to the most common questions.</p>
          </a>
          <a className={styles.card} href="#contact">
            <span className="material-icons-outlined" aria-hidden="true" style={{ fontSize: 26, color: "var(--accent)", marginBottom: 12, display: "block" }}>
              mail
            </span>
            <div className={styles.cardTitle}>Email Us</div>
            <p className={styles.cardDesc}>Reach the team directly.</p>
          </a>
          <Link className={styles.card} href="/how-it-works">
            <span className="material-icons-outlined" aria-hidden="true" style={{ fontSize: 26, color: "var(--accent)", marginBottom: 12, display: "block" }}>
              description
            </span>
            <div className={styles.cardTitle}>Docs &amp; Guides</div>
            <p className={styles.cardDesc}>Learn how features work.</p>
          </Link>
        </div>

        {/* FAQ */}
        <section id="faq" className={styles.section}>
          <h2 className={styles.h2}>Frequently Asked Questions</h2>
          <div className={styles.acc}>
            {FAQS.map((item) => (
              <details key={item.q}>
                <summary>
                  {item.q}
                  <span className={`${styles.chev} material-icons-outlined`}>expand_more</span>
                </summary>
                <div className={styles.ans}>{item.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Contact form */}
        <section id="contact" className={styles.section}>
          <h2 className={styles.h2}>Contact Us</h2>
          <p className={styles.intro}>
            Can&apos;t find what you need? Send us a message and we&apos;ll get back to you.
          </p>

          <form className={styles.form} onSubmit={onSubmit} noValidate>
            {status && (
              <div
                className={`${styles.status} ${status.ok ? styles.statusOk : styles.statusErr}`}
                role="status"
                aria-live="polite"
              >
                {status.msg}
              </div>
            )}

            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="support-name">
                  Name<span className={styles.req}>*</span>
                </label>
                <input
                  id="support-name"
                  className={styles.input}
                  value={values.name}
                  onChange={(e) => set("name", e.target.value)}
                  maxLength={80}
                  aria-invalid={!!errors.name}
                  autoComplete="name"
                />
                {errors.name && <span className={styles.error}>{errors.name}</span>}
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="support-email">
                  Email<span className={styles.req}>*</span>
                </label>
                <input
                  id="support-email"
                  type="email"
                  className={styles.input}
                  value={values.email}
                  onChange={(e) => set("email", e.target.value)}
                  aria-invalid={!!errors.email}
                  autoComplete="email"
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="support-category">
                Category<span className={styles.req}>*</span>
              </label>
              <select
                id="support-category"
                className={styles.select}
                value={values.category}
                onChange={(e) => set("category", e.target.value)}
                aria-invalid={!!errors.category}
              >
                <option value="">Select a category…</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.category && <span className={styles.error}>{errors.category}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="support-subject">
                Subject<span className={styles.req}>*</span>
              </label>
              <input
                id="support-subject"
                className={styles.input}
                value={values.subject}
                onChange={(e) => set("subject", e.target.value)}
                maxLength={120}
                aria-invalid={!!errors.subject}
              />
              {errors.subject && <span className={styles.error}>{errors.subject}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="support-message">
                Message<span className={styles.req}>*</span>
              </label>
              <textarea
                id="support-message"
                className={styles.textarea}
                value={values.message}
                onChange={(e) => set("message", e.target.value)}
                maxLength={2000}
                aria-invalid={!!errors.message}
              />
              <span className={styles.count}>{values.message.length} / 2000</span>
              {errors.message && <span className={styles.error}>{errors.message}</span>}
            </div>

            {/* Honeypot — hidden from users, catches bots. */}
            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="support-company">Company</label>
              <input
                id="support-company"
                tabIndex={-1}
                autoComplete="off"
                value={values.company}
                onChange={(e) => set("company", e.target.value)}
              />
            </div>

            <button className={styles.submit} type="submit" disabled={submitting}>
              {submitting && <span className={styles.spinner} aria-hidden="true" />}
              {submitting ? "Sending…" : "Send Message"}
            </button>
          </form>

          {/* Direct contact fallback */}
          <div className={styles.fallback}>
            <div>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </div>
            <div>
              <strong>Website:</strong>{" "}
              <a href={SITE_URL} target="_blank" rel="noopener noreferrer">
                {websiteHost}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SupportContent;
