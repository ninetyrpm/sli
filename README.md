# Scenic Loop Insanity Hype Site

A small Vite/React prototype for the Scenic Loop Insanity III teaser site.

## Pages

- `/` — cursed transmission / hype landing page
- `/scripture` — scripture-based lore archive / Book of the Third Rite / Book of the Third Rite

## Features

- Sequential text scenes with warm seance glow
- Bottom-right skip button after loading
- Submit interaction: reveals the sigil background and final message plaque
- Smooth sigil ramp/flicker effect using `requestAnimationFrame`
- Hidden d-pad easter egg after submission: `↑ ↓ ← → → ← ↓ ↑`
- Reusable components and data files for future lore/buildout
- Scripture page uses incantations/verses taxonomy instead of fragments
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

## Notes

The site is intentionally minimal and atmospheric. The homepage is designed as a shareable artifact, not a full event page.

## Latest motion pass

- Submit transition no longer moves the final prompt upward while it fades.
- The sigil and October plaque illuminate slowly after submission.
- The skip arrow jumps directly to the visible submit prompt/button.
- `Read the Scripture →` now pans the plaque/sigil left before navigating to `/scripture`.
- `/scripture` pans in from the right after the home transition.
- `Return to Home` and `Return before it notices →` pan the scripture page right, then return to the submitted home state with the plaque/sigil sliding in from the left.

## Spatial canvas note

The site now uses a single horizontal world/canvas instead of separate route-transition scenes. The home/plaque chamber occupies the center cell and `/scripture` occupies the chamber to its right. Navigating between them translates the entire `spatial-grid`, including the shared sigil background, so it reads as one continuous pan rather than one background being replaced by another.

This structure is ready for future chambers: event details, sponsors, location, or other lore pages can be added above, below, left, or right by expanding the grid and changing the viewport translation.
