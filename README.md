# Scenic Loop Insanity Hype Site

A Vite/React prototype for the Scenic Loop Insanity III teaser site.

## Pages / chambers

- `/` — cursed transmission / hype landing page
- `/scripture` — the scripture chamber, positioned to the right of home inside the spatial canvas

## Features

- Sequential text scenes with restored single-candle seance glow
- Bottom-right skip button after loading
- Submit interaction: expands from single candle glow into illuminated sigil/cathedral candlelight
- Smooth sigil ramp/flicker effect using `requestAnimationFrame`
- Hidden d-pad easter egg after submission: `↑ ↓ ← → → ← ↓ ↑`
- Spatial canvas architecture for future chambers/pages
- Scripture page is now an interactive occult tome:
  - closed book cover with Book of the Third Rite / Scripture of the Loop header
  - right-side arrow opens the cover
  - index page lets users jump to incantations
  - left/right arrows turn page by page
- Vercel SPA rewrite support via `vercel.json`
- Basic favicon and Open Graph image

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Structure

```txt
src/
  App.jsx
  main.jsx
  components/
    BackgroundLayers.jsx
    SigilReveal.jsx
    SkipButton.jsx
    Transmission.jsx
  data/
    scenes.js
    verses.js
  pages/
    Home.jsx
    Scripture.jsx
  styles.css
```

## Spatial canvas note

The site uses a single horizontal world/canvas instead of separate route-transition scenes. The home/plaque chamber occupies the center cell and `/scripture` occupies the chamber to its right. Navigating between them translates the entire `spatial-grid`, including the shared sigil background, so it reads as one continuous pan rather than one background being replaced by another.

This structure is ready for future chambers: event details, sponsors, location, ledger, or other lore pages can be added above, below, left, or right by expanding the grid and changing the viewport translation.
