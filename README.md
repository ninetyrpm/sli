# Scenic Loop Insanity Hype Site

A Vite/React prototype for the Scenic Loop Insanity teaser site and scripture page.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy on Vercel

Use the Vite preset. The included `vercel.json` rewrites all paths back to `index.html` so `/scripture` works on direct load.

Recommended settings:

- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`
- Root Directory: folder containing this `package.json`

## Current behavior

- Home page opens with a candlelit transmission sequence.
- The doctrine text has been scaled down relative to the opening/rules sections.
- Text uses subtle candlelight-style text shadow drift.
- Bottom-right arrow skips the full transmission and immediately shows the submit button.
- Submitting slowly illuminates the sigil background, then reveals the October plaque.
- The sigil glow/flicker uses slower overlapping waves rather than jumpy random steps.
- `Read the Scripture →` triggers an exit transition before navigating to `/scripture`.
- `/scripture` uses a dark scripture/manuscript design with incantations, verse, and interpretation.
- Secret d-pad code after submission: ↑ ↓ ← → → ← ↓ ↑ reveals `Godspeed`.
