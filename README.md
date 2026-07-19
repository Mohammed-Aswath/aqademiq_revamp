# Aqademiq — marketing site (Next.js)

The Aqademiq marketing website, rebuilt as a clean, idiomatic **Next.js 16 (App Router) + React 19 + TypeScript** app for deployment on Vercel. This is a faithful, pixel-for-pixel migration of the original `.dc.html` / `support.js` runtime site — the design system, tokens, copy, and interactions are reproduced as real React, not wrapped around the old runtime.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (Turbopack)
npm start        # serve the production build
npm run lint     # ESLint
```

Node 20.9+ is required (Next 16).

## Environment variables

Copy `.env.example` → `.env.local` and fill in when the real URLs exist. All are optional and fall back to safe placeholders.

| Variable | Purpose | Fallback |
| --- | --- | --- |
| `NEXT_PUBLIC_APP_URL` | The live web app — powers **both** "Start free" and "Log in" CTAs | `#` |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for `metadataBase`, sitemap, robots | `https://www.aqademiq.com` |
| `NEXT_PUBLIC_APP_STORE_URL` | iOS listing (Get-the-app modal) | `#` |
| `NEXT_PUBLIC_PLAY_STORE_URL` | Android listing (Get-the-app modal) | `#` |

Every former `#start` placeholder now reads `APP_URL` from `lib/config.ts` — flip it in one place.

## Deploy to Vercel

1. Push this folder to a Git repo.
2. In Vercel, **New Project → Import** the repo. The Next.js preset is auto-detected (Build `next build`, Output `.next`, Install `npm install`).
3. Set the environment variables above under **Settings → Environment Variables**.
4. Deploy. Attach the `aqademiq.com` / `www` domain when ready and set `NEXT_PUBLIC_SITE_URL` to match.

No `vercel.json` is needed. Every route is statically prerendered.

## Structure

```
app/                      route per page + root layout, sitemap.ts, robots.ts, globals.css
  page.tsx                Home (renders the HomeClient island)
  how-it-works/ science/ about/ faq/ students/ privacy/ terms/
components/
  ds/                     design-system components ported to TSX (AdaCube, IceTimer, TaskCard, …)
  site/                   SiteHeader, SiteFooter, GetAppModal, GetAppButton, AppProvider, RevealController
  home/                   HomeClient (Web Audio hero + demos), Home.module.css
  how-it-works/           FocusDemo, AdaPlanDemo (scroll-triggered client islands)
lib/
  config.ts               CTA / URL constants
  audio-engine.ts         framework-free Web Audio graph for the hero
  useReveal.ts            SSR-safe IntersectionObserver scroll-reveal hook
  testimonials.ts         marquee data
styles/tokens/*.css       design-system tokens copied verbatim (colors, typography, spacing, effects)
```

## Notes on the port

- **Styling**: the `_ds` CSS tokens are copied verbatim into `styles/tokens/` and imported (in order) by `app/globals.css`; page/component visuals use CSS Modules; DS primitives keep their original inline-style objects. No Tailwind, no invented colors/spacing.
- **Fonts**: Plus Jakarta Sans, Playfair Display and JetBrains Mono are loaded via `next/font/google` (exposed as the `--font-*` tokens). Material Icons Outlined stays a Google-Fonts stylesheet `@import` (next/font can't serve icon fonts).
- **Accessibility**: the reduce-motion and readable-font comfort toggles persist to `localStorage` (`aq-reduce` / `aq-dyslexia`) and set `data-reduce-motion` / `data-dyslexia` on `<html>`. A tiny inline script in the root layout applies them before first paint (no flash).
- **Logo**: the original 3.24 MB PNG is downscaled at build time to `public/logo.png` (128², ~26 KB) + `app/icon.png` favicon, served via `next/image`.
- See `MIGRATION-NOTES.md` for the full mapping, deliberate deviations, and the list of verbatim legal-text artifacts that were preserved.
