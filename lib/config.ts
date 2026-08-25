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

/** App-store listings (placeholders until the listings exist). */
export const APP_STORE_URL = process.env.NEXT_PUBLIC_APP_STORE_URL ?? "#";
export const PLAY_STORE_URL = process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? "#";

/** Support / grievance contact. */
export const CONTACT_EMAIL = "support@aqademiq.com";

/** Canonical site origin — used for metadataBase, sitemap and robots. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aqademiq.com";
