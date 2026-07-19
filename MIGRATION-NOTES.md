# Migration notes

How the original `.dc.html` / `support.js` site maps onto this Next.js app, the deliberate deviations, and the verbatim legal-text artifacts that were preserved (flagged for your review).

## Construct mapping

| Original (DC runtime) | Here |
| --- | --- |
| `<x-dc>` template + `class Component extends DCLogic` | React component (server by default; `'use client'` only where interactive) |
| `renderVals()` return values | values derived in render / props |
| `<sc-for>` / `<sc-if>` | `.map()` / `&&` conditional JSX |
| `<dc-import name="SiteHeader/SiteFooter">` | moved into the root `app/layout.tsx` (not per page) |
| `<x-import …AqademiqDesignSystem_fcabcc.X>` | `import { X } from "@/components/ds"` |
| `<helmet>` (tokens, fonts, page `<style>`) | `globals.css` + CSS Modules + `next/font` + `metadata` |
| `IntersectionObserver` scroll-reveal | `lib/useReveal.ts` + `<RevealController>` island |
| Web Audio hero engine | `lib/audio-engine.ts` (framework-free) driven by `components/home/HomeClient.tsx` |
| `window.dispatchEvent('aq:ios')` (Get-the-app) | `AppProvider` context `openGetApp()` (a back-compat `aq:ios` listener remains) |
| comfort toggles in `localStorage` | `AppProvider` + pre-paint inline script in `layout.tsx` |

## Routes

`/` · `/how-it-works` · `/science` · `/about` · `/faq` · `/students` · `/support` · `/privacy-policy` · `/terms-of-use` — plus generated `/sitemap.xml` and `/robots.txt`, a branded 404, and the `/api/support` form handler. Internal `X.dc.html#frag` links became `/x#frag`; in-page anchors and `:target` highlights (Science references, legal TOCs) are preserved.

## Deliberate deviations (with rationale)

1. **Next.js 16 (latest), not 15.** `create-next-app` installs the current stable (16.2.x). App Router APIs used here are identical; Turbopack is the default builder. No code impact.
2. **Home is one `'use client'` island** rather than a server shell + hero island. The hero (audio), both scroll-triggered demos, the marquee, and the FAQ "Get the app" button are all interactive and share the reduced-motion/DOM context, so a single client component is simpler and lower-risk than many islands. It still server-renders to full HTML (verified), so SEO is unaffected. All other pages are server components with tiny client islands.
3. **Two ESLint rules relaxed for two files.** React's experimental Compiler rules (`react-hooks/set-state-in-effect`, `immutability`, `purity`) flag the legitimate imperative escape hatches in `HomeClient.tsx` (Web Audio + IntersectionObserver controller) and `AppProvider.tsx` (pre-paint DOM sync). They are turned off *only* for those two files in `eslint.config.mjs`, with a comment. Everything else lints clean.
4. **`npm run lint` runs `eslint`** (Next 16 removed `next lint`).
5. **Logo optimized at build.** The source 3.24 MB PNG is downscaled to `public/logo.png` (128², ~26 KB, transparent `contain`) and `app/icon.png`, so the tiny 32/36 px render never ships 3 MB.

## Verification done

- `next build` — all 8 routes + sitemap + robots prerender statically; TypeScript passes.
- `eslint` — clean.
- Dev server — every route returns HTTP 200; server-rendered HTML contains the hero, the ported design-system SVGs, testimonials, Science reference anchors, and the verbatim legal text (incl. the artifacts below). All three `next/font` variable classes are applied to `<html>`.
- Live screenshots could not be captured in this environment (no browser was reachable to the QA tool; the home page's perpetual marquee/breathe animations and the external Material-Icons stylesheet prevent the tool's idle heuristic from settling). Recommend a quick manual pass in a browser after first deploy.

## Verbatim legal-text artifacts preserved (please review)

Per your instruction, `Privacy.dc.html` and `Terms.dc.html` were reproduced **word-for-word**, including the following pre-existing artifacts. None were "fixed" — listed here so you can decide whether to correct them in the source copy later.

### Privacy (`/privacy-policy`)
1. Definition of "Consent" — **missing opening quotation mark**: `Consent" means …`.
2. Definition of "Processing" — **doubled word**: `… combination, sharing, sharing, transmission …`.
3. §5.4 — stray `I` / dropped word: `… including I Interaction Data Processed by AI Service Provider …`.
4. §4(3)(a) — stray `-,`: `… suggestions through Ada-,based on a User's prompts …`.
5. §13(1) — **stray backtick** (unclosed): `… Applicable Laws, the ⁠`Services offered through …`.
6. Definition of "Services" — hyphen + space split: `grade- tracking`.
7. §6.3 — space before period: `… cross-border transfer . Upon expiry …`.
8. Mixed straight vs curly quotes throughout (e.g. "IOS", "Android", "Applicable Laws").
9. Effective Date ends with a period (`19/07/2026.`) while Last Updated does not.

### Terms (`/terms-of-use`)
1. §1.1(a) — doubled word: `means a a neurodevelopment condition`.
2. §1.1(d) — doubled comma: `the IT Act, , the IT (Reasonable Security …`.
3. §1.1(d/e) — sentence split into a stray fragment with no terminal period; `made available,.` (comma + period).
4. §3.1 — garbled/duplicated: `at least (18) eighteen years at least eighteen (18) years of age … under Applicable Laws, The Digital Platform under Applicable Laws.`
5. §3.2 / §3.3 — section number duplicated **inside** the sentence text.
6. §3.3 — duplicated/garbled liability sentence: `and the shall not be responsible eligibility and shall not be responsible or liable …`.
7. §6.5 — misspelling `Aquademiq` (vs "Aqademiq"); grammar `are shall take reasonable steps`.
8. §6.3 — cross-reference to "Section 14" for AI disclaimers (14 is Term & Termination) — likely wrong reference.
9. §11.2(c) — `everytime` (one word).
10. §12.2 — space before period: `Applicable Laws .`.
11. §15.3 — `Subject to Section 20.4` — there is no Section 20 (only 17).
12. Grievance address `coimbatore 641045` (lowercase); liability cap ₹5,000 preserved with the ₹ symbol.
13. §7.3 — oddly nested quoting: `("as defined in the Privacy Policy")`.

## Things that still need your input

- **Real URLs**: set `NEXT_PUBLIC_APP_URL` (Start-free / Log-in), and the App-/Play-Store URLs, when available. Until then the CTAs point at `#` (unchanged behavior).
- **Placeholder links** kept inert (bare `#`): footer "Exam season", "ADHD & focus", "Blog", "Your data · Accessibility", and the Home "Explore Prism" link — wire these up when destinations exist.
- **Whether to correct the legal artifacts above** in the source text (kept verbatim for now).
