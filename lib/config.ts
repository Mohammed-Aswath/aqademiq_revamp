/**
 * Central configuration constants for the Aqademiq marketing site.
 *
 * Every "Start free" / "Log in" CTA that pointed at the placeholder `#start`
 * in the original .dc.html site now reads APP_URL — flip the env var (or the
 * fallback here) in one place when the real web-app URL is known.
 */

/** The live web app — powers both "Start free" and "Log in" CTAs. */
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "#";

/** App-store listings (placeholders until the listings exist). */
export const APP_STORE_URL = process.env.NEXT_PUBLIC_APP_STORE_URL ?? "#";
export const PLAY_STORE_URL = process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? "#";

/** Support / grievance contact. */
export const CONTACT_EMAIL = "support@aqademiq.com";

/** Canonical site origin — used for metadataBase, sitemap and robots. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aqademiq.com";
