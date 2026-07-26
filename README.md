# Scenic Loop Insanity — Hype Landing Page Prototype

A minimal Vite/React prototype for a cursed, VHS-like teaser page.

## Features

- Full-screen occult landing page
- Sigil stays hidden until the visitor submits to the Loop
- Smooth sine-wave candlelight drift on the revealed sigil background
- Sequential text reveal/disappear scenes
- No bottom candle animation
- No audio
- Final button: `I Submit to the Loop`
- Button reveal hides all prior text and shows `October 2026. The details will find the worthy.` as dark negative-space text over the sigil
- Secret d-pad code: ↑ ↓ ← → → ← ↓ ↑ reveals `Godspeed`

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

Import this repo into Vercel. The default Vite settings should work:

- Build command: `npm run build`
- Output directory: `dist`
