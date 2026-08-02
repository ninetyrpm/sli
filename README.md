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

The website will be developed toward a full public launch while the dedicated Scenic Loop Insanity social account builds awareness, history, and anticipation. The site URL will remain private during that campaign rather than publishing a separate teaser branch or staging partial public releases.

At launch, the website should feel like a complete world worth exploring, while still leaving room for event details and discoveries to evolve as planning continues.

### Core chamber plan

- **The Crossroads** — central hub, current announcement board, and access to the known chambers
- **The Scriptorium** — lore, incantations, and thematic foundation
- **The Archive** — documentation of the First and Second Rites, styled as a collection of occult and ritual supplies
- **The Loop Map** — a fantasy-map treatment of Cherokee Park's physical loop, lore landmarks, and official event locations
- **The Doctrine** — the event's ethos, rules, safety covenant, and expectations for everyone involved
- **Participation / registration experience** — final chamber or in-world interface to indicate intended involvement

The final spatial arrangement and chamber names may continue to evolve as the content is designed.

### Planned Crossroads additions

- **Signs & Omens** announcement board beneath the Crossroads plaque
- Current planning updates, confirmed information, volunteer calls, collaborator reveals, and other notices visible immediately upon return
- Content presentation that remains thematic but clearly distinguishes current information from lore

### Planned participation registry

Add an informal, low-friction form for estimating attendance and planning support. It is not intended to be formal race registration and should collect no unnecessary personally identifiable information.

Possible participation choices:

- Participant / pilgrim
  - Full Rite
  - Half Rite
  - Relay
- Spectator / observer
- Volunteer
- Other support roles as planning develops, such as photographer, musician, vendor, or cheerleader

The form should provide enough aggregate information to anticipate rosters, supplies, support needs, and likely event scale without creating a contractual registration process.

### The Archive

The Archive will combine several related concepts into a single chamber:

- Photographs from the First and Second Rites
- Witness accounts and participant testimonials
- Finishers and the Book of Names
- Strava evidence and lap records
- Relics, recovered objects, damaged supplies, and other artifacts
- A chronological record of the event's development

Its presentation should resemble a ritual storeroom, evidence archive, or collection of ceremonial materials rather than a conventional gallery.

### Mythologized Loop map

Create a richly illustrated, Middle-earth-like map devoted to the Cherokee Park Scenic Loop. It should combine real geography with the event's mythological interpretation.

Potential content includes:

- Bridge #2
- Baringer Hill
- Bonnycastle Hill
- Big Rock
- Christensen Fountain
- Hogan's Fountain
- The former Hogan's Fountain Pavilion
- Start, finish, gathering, support, food, vendor, and volunteer locations
- Important climbs, hazards, and repeated ritual landmarks

### The Doctrine

The Doctrine should serve as both the event ethos and the practical rules or expectations for all participants. Topics will include:

- No prizes, podiums, or official winner
- Shared hardship rather than competitive hierarchy
- Mutual care and assistance
- Safety taking priority over theatrical commitment
- Respect for Cherokee Park, bystanders, and other road users
- Participation-format responsibilities
- Final Procession expectations
- The distinction between the Loop's indifference and the congregation's empathy

## Backlog

### Audio system

- Determine and document exact sound-cue parameters for every source recording:
  - source file
  - audible start time
  - audible end time
  - fade-in and fade-out
  - ambience ducking amount
  - duck attack and release timing
  - overlap rules
  - replay behavior
  - muted and failed-media behavior
- Replace the provisional Crossroads and Scriptorium whisper timestamps after the source recording is reviewed
- Add chamber-specific ambient layers and acoustic character once suitable recordings are sourced
- Consider separate ambience and effects controls only if the single master control proves insufficient
- Continue balancing foreground effects against the persistent ritual soundscape

### Navigation and state

- Persist completed submission state with `localStorage`
- Create a deliberate returning-visitor experience
- Remember ritual-map visibility between chamber visits or sessions
- Support progressively discovered map routes
- Add a larger map or directory once the chamber network expands
- Add a hidden ritual-reset mechanism for development and first-run testing

### Tome

- Improve the physical page-turn animation
- Show outgoing and incoming page faces during turns
- Add page stack, shadows, edge deformation, and resistance at the first/last page
- Refine swipe feedback and page-turn velocity behavior
- Revisit the transparent opening in the tome cover as a future medallion, aperture, sealed element, or filled surface

### Accessibility and motion

- Full `prefers-reduced-motion` treatment across all atmospheric layers
- Pause control for the opening transmission
- User-facing motion and flicker controls
- Keyboard navigation review
- Screen-reader and focus-order review
- Contrast and text-scaling validation

### Visual assets

- Event-specific imagery for Bridge #2, Baringer Hill, Hogan's Fountain, Christensen Fountain, Big Rock, Bonnycastle Hill, and the former pavilion
- Final mythologized route map
- Archival, woodcut, illuminated-manuscript, relic-card, or surveillance-inspired treatments
- Final sigils, illustrations, textures, and chamber-specific environmental assets
- Improve or replace the current sigil tile so it repeats without visible seams

### Discoverable content and Easter eggs

Add future discoveries sparingly so exploration is rewarded without turning the site into a hidden-hotspot scavenger hunt. Candidates include:

- Clickable marginal symbols
- Ritual-map input sequences
- Hidden audio fragments
- Time-dependent messages
- Content unlocked after visiting multiple chambers
- Long-idle discoveries
- Alternate Scripture passages
- A chamber that does not appear on the map
- Visual changes tied to previous visitor actions
- A touch-accessible counterpart to the Crossroads arrow-key code for mobile visitors

### Media resilience

- Expand thematic loading and failure states to future video, image, and audio assets
- Ensure every full-screen media experience remains escapable when an asset fails
- Prevent browser-native broken-image or media-error UI from entering the presentation

### Content, launch, and operations

- Final Scripture copy
- Practical event details and schedule
- Participation registry implementation
- Signs & Omens announcement workflow
- Sponsor, collaborator, vendor, volunteer, and supporter content
- Dedicated Instagram launch strategy, handle, bio, first posts, and website reveal campaign
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

## v0.7.2

- Centered the portrait Watchful Eye video using its rendered frame rather than viewport-width sizing.
- Prevented the folded Ritual Map tab from replaying its entrance animation after the map is folded.
- Redesigned the map around a central occult signpost at The Crossroads, with the discovered route to The Scriptorium and three muted unknown paths.
- Removed the direct Scriptorium link from the Crossroads plaque and changed the final message to the plaque's red accent color.


### v0.7.2
- Centers the portrait Watchful Eye video in the viewport through a document-level portal.
- Reserves mobile space so the folded Ritual Map does not cover the tome.
- Adds Return to the Index navigation and adjacent-page titles in Scripture footers.

### v0.7.3 — ritual audio

- Adds a match-strike recording to the opening `LIGHTING A CANDLE` sequence, beginning playback at 0.217 seconds so the strike transient starts immediately.
- Starts the ritual soundscape when the visitor selects `I SUBMIT TO THE LOOP`.
- Loops the soundscape continuously from a single App-level audio element so chamber navigation does not restart or interrupt it.
- Stores audio assets at:
  - `public/audio/match-strike.wav`
  - `public/audio/ritual-of-the-damned-atmosphere.mp3`

Note: modern browsers commonly block audible autoplay before the visitor interacts with a page. The opening match strike is therefore a best-effort playback on initial load; the submission-triggered soundscape is reliable because it starts from the visitor's button click.


### v0.7.6 — chamber and map audio refinement

- Delays the match strike within `LIGHTING A CANDLE` so the loading text can be read before the transient, while keeping the strike before candle ignition.
- Plays `paper-double.wav` only when the visitor explicitly folds or unfolds the Ritual Map.
- Centers the middle repeated sigil tile on The Crossroads so visible vertical seams are symmetric.
- Matches the visual height of the occult-styled `III` to the main event title.
- Plays the `0:00–0:05` whisper segment when entering The Crossroads and the `0:05.5–0:11` segment when entering The Scriptorium.


### v0.7.6 audio refinements

- Match strike keeps its timed automatic attempt and retries on the first pointer, touch, or keyboard interaction while the lighting sequence is still active. Browsers may still block audible playback until a user interacts with the page.
- Ritual Map paper audio begins at 0.237 seconds for tighter visual synchronization.
- Scripture page-turn audio plays for arrows, index links, Return to the Index, footer navigation, and swipe page turns.


### v0.7.6
- Added an audio-unlocking dark threshold before the candle ritual.
- Added a single master sound control and foreground-effect ambience ducking.
- Made the sigil tiles spatially static and aligned each tile midpoint to The Crossroads center.
- Added a one-time folded-map twitch, abstract passing shadows, plaque edge candlelight, media fallbacks, and chamber-aware browser titles.
- Backlog: chamber-specific ambient layers, separate ambience/effects controls if needed, and a hidden ritual reset.


### v0.7.8

- Replaced the custom speaker sigil with a familiar speaker/mute icon matching the sound-control text.
- Moved the vignette out of the repeated sigil layer and fixed it to the visible viewport so individual tile edges are no longer emphasized.
- Softened ambience ducking and made volume fades cancel-safe to prevent overlapping fades and abrupt returns.
- Added the expanded content architecture, social-first launch strategy, participation registry, Archive, Loop Map, Doctrine, Signs & Omens, sound-cue documentation, and discovery ideas to the roadmap and backlog.

### Continuous opening narration

The opening sequence now includes `public/audio/the-loop-beckons.wav` as one uninterrupted performance. The visual text cues are aligned to the recording: lead-in at 0:00, “The Loop beckons…” at 0:01.5, “Pain cleanses” at 0:08, “Distance redeems” at 0:13, “Through suffering” at 0:18, and “We become one” at 0:20. The file is never cropped or restarted during the sequence.
