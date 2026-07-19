import { NextResponse } from "next/server";
import { CONTACT_EMAIL } from "@/lib/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CATEGORIES = [
  "General Question",
  "Bug Report",
  "Feature Request",
  "Account & Billing",
  "Other",
];

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

type Body = {
  name?: unknown;
  email?: unknown;
  category?: unknown;
  subject?: unknown;
  message?: unknown;
};

function validate(b: Body): string | null {
  const s = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const name = s(b.name),
    email = s(b.email),
    category = s(b.category),
    subject = s(b.subject),
    message = s(b.message);
  if (name.length < 1 || name.length > 80) return "name";
  if (!EMAIL_RE.test(email)) return "email";
  if (!CATEGORIES.includes(category)) return "category";
  if (subject.length < 3 || subject.length > 120) return "subject";
  if (message.length < 10 || message.length > 2000) return "message";
  return null;
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Never trust the client — re-validate every field.
  const bad = validate(body);
  if (bad) return NextResponse.json({ error: `invalid_${bad}` }, { status: 422 });

  const name = String(body.name).trim();
  const email = String(body.email).trim();
  const category = String(body.category).trim();
  const subject = String(body.subject).trim();
  const message = String(body.message).trim();

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Email provider not configured — tell the client so it can show the
    // direct-email fallback (support@…) instead of a false success.
    return NextResponse.json({ error: "email_not_configured" }, { status: 503 });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const from = process.env.SUPPORT_FROM_EMAIL ?? `Aqademiq Support <${CONTACT_EMAIL}>`;
    const to = process.env.SUPPORT_TO_EMAIL ?? CONTACT_EMAIL;

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[Support][${category}] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nCategory: ${category}\nSubject: ${subject}\n\n${message}\n`,
    });
    if (error) return NextResponse.json({ error: "send_failed" }, { status: 502 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
