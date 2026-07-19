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

No `vercel.json` is needed. Every page route is statically prerendered; `/api/support` runs as a serverless function.

### Support form email (optional)

`/support` has a contact form that POSTs to `app/api/support/route.ts`, which emails your support inbox via [Resend](https://resend.com). It is off by default — set `RESEND_API_KEY` (and, once your domain is verified in Resend, `SUPPORT_FROM_EMAIL` / `SUPPORT_TO_EMAIL`) in Vercel. Until then the form validates client- and server-side and gracefully points users to the direct email fallback shown on the page.

## Prism sound engine (hero)

The 20-second "Focus Sample" hero is powered by `lib/prism-engine.ts` — a Web Audio port of the Aqademiq Adaptive SoundScape Engine (originally Flutter + SoLoud; spec in `soundengine-for-flutter.md`). It plays the **real recorded stems** as a 4-layer generative bed:

- **Pad** — always-on F# minor drone loop, faded to ~0.6
- **Texture** — always-on masking loop (rain / sea / hum), level set from dB
- **Pulse** — one-shot per beat on a BPM clock (density > 1.5 → half-beats)
- **Spark** — stochastic one-shots, min 3 s gap, random pan ±0.7, level 0.4

over a master bus: biquad low-pass → algorithmic convolver reverb → gain → compressor → analyser (the analyser also drives the cube's "bloom"). The five hero buttons map onto Prism parameter presets (Deep Work / Flow / Review / Wind-down / No sound) over the shared Focus stem set. Stems load lazily on the first play tap (~2.5 MB total) and the `AudioContext` is created/resumed inside that user gesture (autoplay-policy safe) and closed on unmount.

### Rebuilding the audio assets

The raw WAV stems (`assets/audio/stems/…`, ~217 MB — the two pads alone are 202 MB) are the **source of truth** but are **not served at runtime**; they're tracked with **Git LFS** (`.gitattributes`) and `.vercelignore`d. The browser only ever loads the small compressed MP3s in `public/audio/prism/` (~2.5 MB, regular git files) — those contain the same audio, just trimmed and compressed for the web.

After cloning, fetch the source stems with `git lfs pull`. To regenerate the MP3s (trims the multi-minute pad drones to short loops and compresses everything):

```bash
git lfs pull                    # download the WAV stems from LFS
node scripts/build-audio.mjs    # uses the ffmpeg-static devDependency
```

## Structure

```
app/                      route per page + root layout, sitemap.ts, robots.ts, globals.css
  page.tsx                Home (renders the HomeClient island)
  how-it-works/ science/ about/ faq/ students/ support/ privacy-policy/ terms-of-use/
  api/support/route.ts    support contact-form handler (emails via Resend when configured)
  not-found.tsx           branded 404
components/
  ds/                     design-system components ported to TSX (AdaCube, IceTimer, TaskCard, …)
  site/                   SiteHeader, SiteFooter, GetAppModal, GetAppButton, AppProvider, RevealController
  home/                   HomeClient (Web Audio hero + demos), Home.module.css
  how-it-works/           FocusDemo, AdaPlanDemo (scroll-triggered client islands)
lib/
  config.ts               CTA / URL constants
  prism-engine.ts         Web Audio port of the Prism 4-layer sound engine + mode presets
  useReveal.ts            SSR-safe IntersectionObserver scroll-reveal hook
  testimonials.ts         marquee data (+ optimized photos in public/testimonials)
scripts/build-audio.mjs   ffmpeg asset pipeline: WAV stems → public/audio/prism/*.mp3
public/audio/prism/       shipped compressed stems (pad / texture / pulse / spark)
styles/tokens/*.css       design-system tokens copied verbatim (colors, typography, spacing, effects)
```

## Notes on the port

- **Styling**: the `_ds` CSS tokens are copied verbatim into `styles/tokens/` and imported (in order) by `app/globals.css`; page/component visuals use CSS Modules; DS primitives keep their original inline-style objects. No Tailwind, no invented colors/spacing.
- **Fonts**: Plus Jakarta Sans, Playfair Display and JetBrains Mono are loaded via `next/font/google` (exposed as the `--font-*` tokens). Material Icons Outlined stays a Google-Fonts stylesheet `@import` (next/font can't serve icon fonts).
- **Accessibility**: the reduce-motion and readable-font comfort toggles persist to `localStorage` (`aq-reduce` / `aq-dyslexia`) and set `data-reduce-motion` / `data-dyslexia` on `<html>`. A tiny inline script in the root layout applies them before first paint (no flash).
- **Logo**: the original 3.24 MB PNG is downscaled at build time to `public/logo.png` (128², ~26 KB) + `app/icon.png` favicon, served via `next/image`.
- See `MIGRATION-NOTES.md` for the full mapping, deliberate deviations, and the list of verbatim legal-text artifacts that were preserved.
