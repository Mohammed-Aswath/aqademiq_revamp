/**
 * Central configuration constants for the Aqademiq marketing site.
 *
 * Every "Start free" / "Log in" CTA reads from here. The fallback used to be
 * "#", and with NEXT_PUBLIC_APP_URL unset that is what shipped — so every
 * call to action on the live site was a dead link that scrolled to the top of
 * the page. It now points at the real web app.
 */

/** The live web app. Env var still wins, so a preview can aim elsewhere. */
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://aqademiq.app";

/** "Log in" on a laptop or desktop: the web app itself. */
export const APP_LOGIN_URL = APP_URL;

/**
 * "Log in" on a phone or tablet: a device-aware smart link that opens the app
 * where it's installed, else the App Store or Google Play. Read both through
 * `useLoginHref`, which only swaps to this after hydration.
 */
export const APP_LOGIN_MOBILE_URL =
  process.env.NEXT_PUBLIC_APP_LOGIN_MOBILE_URL ?? "https://onelink.to/q5tsxu";

/** App-store listings. Env vars still win so a preview can aim elsewhere. */
export const APP_STORE_URL =
  process.env.NEXT_PUBLIC_APP_STORE_URL ??
  "https://apps.apple.com/in/app/aqademiq-study-calmly/id6792360288";
export const PLAY_STORE_URL =
  process.env.NEXT_PUBLIC_PLAY_STORE_URL ??
  "https://play.google.com/store/apps/details?id=com.r13.aqademiq";

/** Support / grievance contact. */
export const CONTACT_EMAIL = "support@aqademiq.com";

/** Canonical site origin — used for metadataBase, sitemap and robots. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aqademiq.com";
