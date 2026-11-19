import type { Metadata } from "next";
import { UnsubscribeForm } from "./UnsubscribeForm";

export const metadata: Metadata = {
  title: "Unsubscribe",
  description: "Stop Aqademiq update emails.",
  // A personal page reached from an email: keep it out of search results.
  robots: { index: false, follow: false },
};

/**
 * Target of the "Unsubscribe" link in Aqademiq emails:
 *   https://www.aqademiq.com/unsubscribe?email={{{EMAIL}}}
 * Opening the page changes nothing; the reader confirms with a button.
 */
export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const raw = (await searchParams).email;
  const email = typeof raw === "string" ? raw.trim() : "";

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
      <UnsubscribeForm initialEmail={email} />
    </main>
  );
}
