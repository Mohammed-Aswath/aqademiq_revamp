import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Unsubscribes an address from every Aqademiq broadcast by setting
 * `unsubscribed: true` on its Resend contact — the same flag Resend's own
 * hosted page sets, so broadcasts skip it from then on.
 *
 * POST only: mail scanners open every link in an email, so a GET that acted
 * would unsubscribe people who never clicked. The /unsubscribe page posts here
 * when the reader presses the button.
 *
 * Accepts a JSON body `{ "email": "…" }`, or the address as `?email=` with an
 * RFC 8058 one-click form body, so this URL can also serve as a
 * List-Unsubscribe-Post target.
 */
export async function POST(req: Request) {
  let email = new URL(req.url).searchParams.get("email") ?? "";
  if (!email && req.headers.get("content-type")?.includes("application/json")) {
    try {
      const body = (await req.json()) as { email?: unknown };
      if (typeof body.email === "string") email = body.email;
    } catch {
      return NextResponse.json({ error: "invalid_json" }, { status: 400 });
    }
  }
  email = email.trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "invalid_email" }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "email_not_configured" }, { status: 503 });
  }

  try {
    const { Resend } = await import("resend");
    const { error } = await new Resend(apiKey).contacts.update({ email, unsubscribed: true });
    // An address that was never on the list is already "unsubscribed". Answer
    // the same either way, so this can't be used to probe who is a contact.
    if (error && error.name !== "not_found") {
      return NextResponse.json({ error: "update_failed" }, { status: 502 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "update_failed" }, { status: 502 });
  }
}
