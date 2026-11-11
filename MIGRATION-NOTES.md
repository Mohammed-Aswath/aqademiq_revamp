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
| Web Audio hero engine | `lib/prism-engine.ts` (framework-free) driven by `components/home/v2/HeroSection.tsx` |
| `window.dispatchEvent('aq:ios')` (Get-the-app) | `AppProvider` context `openGetApp()` (a back-compat `aq:ios` listener remains) |
| comfort toggles in `localStorage` | `AppProvider` + pre-paint inline script in `layout.tsx` |

## Routes

`/` · `/how-it-works` · `/science` · `/about` · `/faq` · `/students` · `/support` · `/privacy-policy` · `/terms-of-use` — plus generated `/sitemap.xml` and `/robots.txt`, a branded 404, and the `/api/support` form handler. Internal `X.dc.html#frag` links became `/x#frag`; in-page anchors and `:target` highlights (Science references, legal TOCs) are preserved.

## Deliberate deviations (with rationale)

1. **Next.js 16 (latest), not 15.** `create-next-app` installs the current stable (16.2.x). App Router APIs used here are identical; Turbopack is the default builder. No code impact.
2. **Home is one component per design section** (`components/home/v2/`, composed in `app/page.tsx`). No section shares state with another, so the interactive ones (hero, App freeze, Lock Screen & Watch, melt and Ada demos, Import, Haptics, The Core) are separate client islands and the static ones stay server components. Shared section classes are the design's page `<style>`, verbatim, in `components/home/v2/home.module.css`.
3. **Three ESLint rules relaxed for two files.** React's experimental Compiler rules (`react-hooks/set-state-in-effect`, `immutability`, `purity`) flag the legitimate imperative escape hatches in `components/home/v2/HeroSection.tsx` (Web Audio session controller; `performance.now()` inside handlers reads as "impure during render") and `AppProvider.tsx` (pre-paint DOM sync). They are turned off *only* for those files in `eslint.config.mjs`, with a comment. Everything else lints clean.
4. **`npm run lint` runs `eslint`** (Next 16 removed `next lint`).
5. **Logo optimized at build.** The source 3.24 MB PNG is downscaled to `public/logo.png` (128², ~26 KB, transparent `contain`) and `app/icon.png`, so the tiny 32/36 px render never ships 3 MB.

## V2: matching the approved render, not just the markup

The canvas renders a few things differently from what its markup says. Where they differ, the site follows what was approved on the canvas, and the code says why at each spot:

- **Styles on `<x-import>` are dropped by the canvas runtime** (the import becomes a `display:contents` host). So the drop-shadows, margins and `data-breathe` written on design-system imports never showed, and are left out here.
- **Numeric attributes arrive as strings.** `<IceTimer size="128">` puts `width:"128"` (invalid) on its box, which then hugs Ada while the ring overflows it. Reproduced with `style={{ width: "auto", height: "auto" }}` on the three literal-size timers (Home melt demo, How it works focus, Science).
- **Italic weights.** The design's Google Fonts import ships Plus Jakarta italics at 400/600 and Playfair italics at 400/700 only, so a `font-weight:500` italic quote renders at 400. Our variable font has a real 500, which is wider and rewraps; those quotes are set to 400.
- **Specificity accidents kept.** e.g. About's `.st p` beats `.pq`, so pull-quotes inside `.st` are Plus Jakarta italic and the others Playfair. Ported with the same selectors.
- **One deliberate departure:** in Readable-font mode the canvas (and the old site) turned Material Icons spans into Verdana, spelling them out as text ("expand_more"). `globals.css` now excludes icon spans from that rule.

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
10. §1(1) has no closing full stop; §1(2) reads `collectively referred to as the ("Platform")`; §2(1) `“Applicable Laws” mean`.
11. §1(5) says "Terms of Service"; the site's page is "Terms of Use".
12. Two headings run straight into their body with no bold label (3.5 "…AI-enabled features Where a User…", 4(4) "…for Platform Security To maintain…"); 4(3)'s heading is not bold like its siblings; 3.2(d) is a bold label with no semicolon.
13. V2 moved "Last Updated" from 16/08/2026 back to 19/07/2026, now the same as the Effective Date.

### Terms (`/terms-of-use`)
V2's copy fixed the V1 artifacts ("a a", ", ,", "Aquademiq", "Section 20.4", lowercase "coimbatore"). Still present in V2:
1. §3.1 — garbled/duplicated: `at least (18) eighteen years at least eighteen (18) years of age … under Applicable Laws, The Digital Platform under Applicable Laws.`
2. §3.5 says "(including a Child or dependent)", but "Child" is no longer a defined term; §3.3 and the indemnity clause still mention parental or guardian consent although that section was removed.
3. Third Party Service Providers clause: `are shall take reasonable steps`.
4. No-malware warranty clause: `everytime` as one word.
5. Mixed straight and curly quotes, sometimes within one term (`“Applicable Laws"`), and a nested quote `(“as defined in the Privacy Policy”)`.
6. §1.1(e) gives a bracketed page title instead of a URL: `[Aqademiq — AI Study Planner for Students Who Procrastinate | ADHD-Friendly]`.
7. The opening paragraph's last sentence starts lowercase: `if You do not agree to these terms…`.
