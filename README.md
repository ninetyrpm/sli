# Scenic Loop Insanity 2026 — Hype Site

A Vite/React teaser experience for **Scenic Loop Insanity III**.

The site is intentionally being revealed in stages. The current build establishes the opening ritual, spatial architecture, visual language, and lore experience before practical event information, registration, and additional chambers are released.

## The known chambers

- `/` — **The Crossroads**, the central hub from which the known passages divide
  - **The Passage** is the opening transmission and submission sequence within The Crossroads
- `/scripture` — **The Scriptorium**, an interactive occult tome containing prototype lore and incantations

The Scripture is entertainment and thematic foundation. Its current writing is placeholder copy and is not intended to carry practical event logistics.

## Current features

- Timed opening transmission beginning in complete darkness with “LIGHTING A CANDLE”
- Skip control for quickly reaching the final invitation
- Submission interaction with an expanding candlelight wave that reveals the sigil field as it passes
- Centered Scenic Loop Insanity III plaque with “The Rite of Mutual Suffering,” date, location, premise, and teaser line
- Crossroads-only d-pad Easter egg after submission: `↑ ↓ ← → → ← ↓ ↑`, with a smoke transition and looping watchful-eye vision
- Chamber registry defining names, routes, coordinates, and labels
- Continuous spatial canvas with panning transitions between chambers
- Foldable ritual map navigation styled as a worn handwritten guide
- The Scriptorium occult tome:
  - closed book cover
  - index of incantations
  - sequential page controls
  - direct jumps from the index
  - horizontal page swipes on touch devices
  - enlarged invisible page-edge touch targets
- Refactored modular CSS
- Vercel SPA rewrite support
- Basic favicon and Open Graph image

## Navigation behavior

Chambers occupy coordinates in one continuous spatial world. Navigation translates the entire world, including the shared background, so movement feels like traveling through connected rooms rather than swapping pages.

Chamber navigation is explicit through the ritual map and in-world links. The site does **not** use swipe gestures to move between chambers. This avoids inconsistent behavior as the world expands in horizontal and vertical directions and prevents conflict with native browser gestures.

After the Crossroads plaque has fully settled, the ritual map arrives from below in its folded “UNFOLD MAP” state. It can then be opened for navigation or folded away again whenever it obscures the current chamber.

Within the tome, horizontal touch swipes turn pages. Vertical movement remains native scrolling.

## Project structure

```txt
src/
  App.jsx
  main.jsx
  components/
    BackgroundLayers.jsx
    RitualMap.jsx
    SigilReveal.jsx
    SkipButton.jsx
    Transmission.jsx
    WatchfulEye.jsx
  config/
    chambers.js
  data/
    scenes.js
    verses.js
  pages/
    Home.jsx
    Scripture.jsx
  styles/
    index.css
    tokens.css
    base.css
    background.css
    passage.css
    spatial-canvas.css
    tome.css
    navigation.css
    responsive.css
    watchful-eye.css
```

## Chamber registry

`src/config/chambers.js` is the source of truth for the spatial layout. Each chamber defines:

- internal ID
- thematic name
- map label
- URL path
- X/Y coordinates
- accessible label

Future chambers can be positioned above, below, left, right, or diagonally from The Crossroads without replacing the navigation model.

## Roadmap

The site will be built gradually as event details become available and as the campaign moves through successive hype phases.

### Near term

- Refine the visual treatment of the ritual map
- Replace prototype Scripture copy with final incantations
- Add the first practical event-information chamber
- Establish locked, obscured, or unrevealed routes on the map
- Add visual transitions for newly revealed chambers
- Continue mobile layout and touch-target refinement
- Validate the experience across major mobile browsers

### Planned event chambers and content

- What the Rite is
- Full Rite, Half-Madness, and relay participation
- Route, lap count, hills, landmarks, and course map
- Safety covenant and rider expectations
- Date, schedule, gathering point, parking, food, and support
- Registration or commitment ledger
- Sponsors, collaborators, vendors, and supporters
- History of the first, second, and third editions
- The Final Procession

## Backlog

### Navigation and state

- Persist completed submission state with `localStorage`
- Create a deliberate returning-visitor experience
- Remember ritual-map visibility between chamber visits or sessions
- Support progressively unlocked map routes
- Add a larger map or directory once the chamber network expands

### Tome

- Improve the physical page-turn animation
- Show outgoing and incoming page faces during turns
- Add page stack, shadows, edge deformation, and resistance at the first/last page
- Refine swipe feedback and page-turn velocity behavior

### Accessibility and motion

- Full `prefers-reduced-motion` treatment across all atmospheric layers
- Pause control for the opening transmission
- User-facing motion and flicker controls
- Keyboard navigation review
- Screen-reader and focus-order review
- Contrast and text-scaling validation

### Visual assets

- Event-specific imagery for Bridge #2, Baringer Hill, Hogan’s Fountain, Christensen Fountain, Big Rock, Bonnycastle Hill, and the former pavilion
- Ritualized route map
- Archival, woodcut, illuminated-manuscript, relic-card, or surveillance-inspired treatments
- Final sigils, illustrations, textures, and chamber-specific environmental assets

### Content and launch

- Final Scripture copy
- Practical event details
- Registration workflow
- Sponsor and vendor content
- Social sharing refinements
- Analytics and conversion tracking
- SEO and structured event metadata
- Performance optimization for lower-powered mobile devices

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```


## v0.7.0

- Corrected the opening so the candle glow remains absent during `LIGHTING A CANDLE`, then grows from the center during ignition.
- Removed a legacy Scriptorium stylesheet override that forced the opening glow to appear immediately.
- Refined the Crossroads plaque title, occult-styled edition numeral, location, and declaration copy.


## Watchful Eye Easter egg

The existing arrow-key sequence can be entered only while viewing **The Crossroads**. A successful entry summons a full-screen smoke transition and then reveals a looping eye video. Clicking the invisible circular target centered over the eye closes the vision and returns the visitor to The Crossroads.

Store the video at:

```text
public/media/watchful-eye.mp4
```

The application references it as `/media/watchful-eye.mp4`. Keep that path and filename unchanged. H.264 video in an MP4 container is recommended for broad browser compatibility.
