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

/**
 * Sign-in specifically.
 *
 * "Start free" and "Log in" are different intents and deserve different
 * landings: a new visitor should meet the welcome screen, someone returning
 * should land on the form. `/signin` renders the sign-in pane directly.
 */
export const APP_LOGIN_URL = `${APP_URL.replace(/\/+$/, "")}/signin`;

/**
 * "Log in" on a phone opens the app rather than the web app. A device-aware
 * smart link: the App Store on iOS, Google Play on Android, and the app itself
 * where it's installed. Desktop keeps APP_LOGIN_URL. Read it through
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
