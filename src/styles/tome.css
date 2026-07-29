/* Tome pass: restore the single-candle opening glow and turn scripture into an occult book. */
.spatial-shell:not(.is-spatial-revealed) .spatial-background .intro-glow {
  left: 25%;
  top: 50svh;
  width: clamp(780px, 132vw, 1680px);
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
  background:
    radial-gradient(
      circle,
      rgba(235, 166, 78, 0.28) 0%,
      rgba(154, 67, 31, 0.16) 28%,
      rgba(74, 29, 17, 0.075) 52%,
      transparent 77%
    );
  mix-blend-mode: screen;
}

.spatial-shell:not(.is-spatial-revealed) .spatial-background .base-darkness {
  background:
    radial-gradient(circle at 25% 50%, rgba(116, 52, 25, 0.15), transparent 34%),
    radial-gradient(circle at 25% 50%, rgba(220, 176, 108, 0.07), transparent 22%),
    linear-gradient(180deg, #010101 0%, var(--asphalt) 48%, #010101 100%);
}

.spatial-shell:not(.is-spatial-revealed) .spatial-background .vignette {
  background:
    radial-gradient(circle at 25% 50%, transparent 26%, rgba(0, 0, 0, 0.42) 72%, rgba(0, 0, 0, 0.9) 98%),
    linear-gradient(90deg, rgba(255,255,255,0.006), transparent 18%, transparent 82%, rgba(255,255,255,0.006));
}

.tome-shell {
  min-height: 100svh;
  display: grid;
  place-items: center;
  padding: clamp(1rem, 3vw, 2rem);
  overflow: hidden;
}

.tome-return {
  position: fixed;
  left: clamp(1rem, 3vw, 2rem);
  top: clamp(1rem, 3vw, 2rem);
  z-index: 35;
  padding: 0.5rem 0.6rem;
  border: 1px solid rgba(214, 196, 152, 0.12);
  background: rgba(7, 6, 4, 0.42);
  backdrop-filter: blur(3px);
}

.tome-stage {
  width: min(92vw, 900px);
  margin: 0 auto;
  padding: clamp(2.6rem, 6vw, 4.6rem) 0 clamp(1.4rem, 4vw, 2.4rem);
}

.tome-book {
  --book-depth: rgba(0, 0, 0, 0.66);
  position: relative;
  min-height: min(76svh, 720px);
  border: 1px solid rgba(214, 196, 152, 0.18);
  background:
    linear-gradient(90deg, rgba(0,0,0,0.46) 0 4%, transparent 10% 100%),
    radial-gradient(circle at 50% 8%, rgba(107, 33, 28, 0.18), transparent 40%),
    linear-gradient(180deg, rgba(27, 21, 15, 0.96), rgba(8, 6, 4, 0.98));
  box-shadow:
    0 38px 110px rgba(0, 0, 0, 0.62),
    0 0 0 1px rgba(0, 0, 0, 0.72),
    inset 0 0 70px rgba(0, 0, 0, 0.48);
  overflow: hidden;
  transform-style: preserve-3d;
}

.tome-book::before {
  content: '';
  position: absolute;
  inset: 0.82rem;
  z-index: 5;
  border: 1px solid rgba(214, 196, 152, 0.09);
  pointer-events: none;
}

.tome-book::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 22;
  pointer-events: none;
  background:
    linear-gradient(90deg, rgba(214, 196, 152, 0.04), transparent 18%, transparent 82%, rgba(0, 0, 0, 0.16)),
    radial-gradient(circle at 72% 50%, rgba(214, 142, 72, 0.07), transparent 44%);
  opacity: 0.85;
}

.tome-book.turning-forward::after {
  animation: cover-turn-forward 780ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

.tome-book.turning-backward::after {
  animation: cover-turn-backward 780ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

.tome-spine {
  position: absolute;
  inset: 0 auto 0 0;
  z-index: 10;
  width: clamp(18px, 4.2vw, 42px);
  background:
    linear-gradient(90deg, rgba(0,0,0,0.76), rgba(107,33,28,0.18), rgba(214,196,152,0.035), transparent),
    repeating-linear-gradient(0deg, transparent 0 26px, rgba(214,196,152,0.045) 27px, transparent 29px);
  border-right: 1px solid rgba(214, 196, 152, 0.09);
  pointer-events: none;
}

.tome-cover,
.tome-page {
  position: relative;
  min-height: min(76svh, 720px);
  display: grid;
  align-content: center;
  padding: clamp(2.2rem, 6vw, 4.2rem) clamp(1.4rem, 6vw, 4.8rem);
}

.tome-cover {
  text-align: center;
  background:
    radial-gradient(circle at 50% 42%, rgba(214, 142, 72, 0.06), transparent 34%),
    linear-gradient(180deg, rgba(36, 21, 16, 0.9), rgba(9, 6, 5, 0.98));
}

.tome-cover::before,
.tome-page::before {
  content: '';
  position: absolute;
  inset: 1.45rem;
  border: 1px solid rgba(154, 59, 49, 0.22);
  pointer-events: none;
}

.tome-cover::after,
.tome-page::after {
  content: '';
  position: absolute;
  right: -8rem;
  top: -8rem;
  width: min(82vw, 620px);
  aspect-ratio: 1;
  background-image: url('/sigil.png');
  background-repeat: repeat;
  background-size: 380px auto;
  opacity: 0.07;
  filter: brightness(1.28) contrast(1.26) saturate(0.72);
  pointer-events: none;
}

.tome-cover > *,
.tome-page > * {
  position: relative;
  z-index: 2;
}

.tome-cover .archive-label {
  margin: 0 auto;
}

.tome-cover h1 {
  max-width: 760px;
  margin: 1.15rem auto 0;
  color: rgba(235, 221, 188, 0.98);
  font-size: clamp(2.1rem, 8vw, 4.9rem);
  font-weight: 400;
  line-height: 0.96;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-shadow:
    0 0 13px rgba(214, 142, 72, 0.16),
    0 3px 20px rgba(0,0,0,0.92);
}

.tome-cover .scripture-subtitle {
  max-width: 650px;
  margin: 1.15rem auto 0;
}

.cover-sigil {
  width: clamp(68px, 16vw, 118px);
  aspect-ratio: 1;
  margin: clamp(1.3rem, 4vw, 2.2rem) auto 0;
  border: 1px solid rgba(154, 59, 49, 0.28);
  background:
    radial-gradient(circle, rgba(214, 196, 152, 0.14), transparent 62%),
    url('/sigil.png') center / 330px auto;
  opacity: 0.72;
  filter: brightness(0.92) contrast(1.1) saturate(0.75);
  box-shadow: inset 0 0 25px rgba(0,0,0,0.82), 0 0 28px rgba(107,33,28,0.18);
}

.cover-warning {
  margin: 1.1rem 0 0;
  color: rgba(159, 145, 107, 0.88);
  font-family: 'Courier New', Courier, monospace;
  font-size: clamp(0.68rem, 2vw, 0.8rem);
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.book-arrow {
  position: absolute;
  z-index: 30;
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2rem;
  border: 1px solid rgba(214, 196, 152, 0.22);
  border-radius: 0;
  background: rgba(10, 8, 7, 0.54);
  color: rgba(214, 196, 152, 0.66);
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
  cursor: pointer;
  transition: color 180ms ease, border-color 180ms ease, background 180ms ease, transform 180ms ease;
}

.book-arrow:hover,
.book-arrow:focus-visible {
  color: rgba(238, 228, 198, 0.96);
  border-color: rgba(154, 59, 49, 0.58);
  background: rgba(10, 8, 7, 0.78);
}

.book-arrow-right {
  right: clamp(0.75rem, 2.2vw, 1.35rem);
  top: 50%;
  transform: translateY(-50%);
}

.book-arrow-right:hover,
.book-arrow-right:focus-visible {
  transform: translateY(-50%) translateX(2px);
}

.book-arrow-left {
  left: clamp(0.75rem, 2.2vw, 1.35rem);
  top: 50%;
  transform: translateY(-50%);
}

.book-arrow-left:hover,
.book-arrow-left:focus-visible {
  transform: translateY(-50%) translateX(-2px);
}

.cover-open {
  right: clamp(1rem, 3vw, 2rem);
}

.tome-page {
  align-content: stretch;
  background:
    radial-gradient(circle at 40% 14%, rgba(154, 59, 49, 0.12), transparent 42%),
    linear-gradient(180deg, rgba(31, 24, 17, 0.96), rgba(10, 8, 6, 0.98));
}

.tome-page-content {
  width: min(100%, 720px);
  margin: auto;
  max-height: calc(76svh - 9.5rem);
  overflow: auto;
  padding: 0.25rem clamp(0.2rem, 1.5vw, 0.7rem);
  scrollbar-color: rgba(154, 59, 49, 0.55) rgba(7, 6, 4, 0.3);
}

.tome-page-content::-webkit-scrollbar {
  width: 8px;
}

.tome-page-content::-webkit-scrollbar-track {
  background: rgba(7, 6, 4, 0.28);
}

.tome-page-content::-webkit-scrollbar-thumb {
  background: rgba(154, 59, 49, 0.46);
}

.index-page-content {
  text-align: center;
}

.index-page-content h2,
.incantation-page-content h2 {
  margin: 0.85rem 0 1.1rem;
  color: rgba(235, 221, 188, 0.98);
  font-size: clamp(1.75rem, 5.4vw, 3rem);
  font-weight: 400;
  line-height: 1.02;
  letter-spacing: 0.035em;
  text-transform: uppercase;
}

.index-instruction {
  max-width: 560px;
  margin: 0 auto 1.4rem;
  color: rgba(159, 145, 107, 0.92);
  font-family: 'Courier New', Courier, monospace;
  font-size: clamp(0.72rem, 2.1vw, 0.84rem);
  line-height: 1.7;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.tome-index {
  margin: 0;
  text-align: left;
  background: rgba(7, 6, 4, 0.54);
}

.tome-index ol {
  grid-template-columns: 1fr;
}

.index-entry {
  width: 100%;
  border: 0;
  border-bottom: 1px solid rgba(214, 196, 152, 0.08);
  background: transparent;
  color: rgba(214, 196, 152, 0.78);
  font-family: 'Courier New', Courier, monospace;
  font-size: clamp(0.74rem, 2vw, 0.88rem);
  line-height: 1.42;
  text-align: left;
  cursor: pointer;
  padding: 0.45rem 0.2rem;
  transition: color 180ms ease, transform 180ms ease;
}

.index-entry span {
  display: inline-block;
  width: 2.2rem;
  color: rgba(154, 59, 49, 0.95);
}

.index-entry:hover,
.index-entry:focus-visible {
  color: rgba(235, 221, 188, 0.98);
  transform: translateX(3px);
}

.incantation-page-content {
  text-align: left;
}

.incantation-page-content .verse-block p {
  font-size: clamp(1rem, 2.7vw, 1.28rem);
}

.tome-page-footer {
  position: absolute;
  left: clamp(1.4rem, 6vw, 4.8rem);
  right: clamp(1.4rem, 6vw, 4.8rem);
  bottom: clamp(1rem, 3vw, 1.55rem);
  z-index: 3;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  border-top: 1px solid rgba(214, 196, 152, 0.09);
  padding-top: 0.7rem;
  color: rgba(159, 145, 107, 0.8);
  font-family: 'Courier New', Courier, monospace;
  font-size: clamp(0.58rem, 1.8vw, 0.72rem);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.tome-page-footer a {
  color: rgba(154, 59, 49, 0.94);
  text-decoration: none;
}

.tome-page-footer a:hover,
.tome-page-footer a:focus-visible {
  color: rgba(235, 221, 188, 0.95);
}

@keyframes cover-turn-forward {
  0% {
    opacity: 0.9;
    transform: translateX(0) scaleX(1);
    background-color: rgba(12, 8, 6, 0.78);
  }

  45% {
    opacity: 1;
    transform: translateX(-6%) scaleX(0.72) skewY(-1deg);
    background-color: rgba(31, 17, 12, 0.92);
  }

  100% {
    opacity: 0;
    transform: translateX(-48%) scaleX(0.18) skewY(-2deg);
    background-color: rgba(4, 3, 2, 0.1);
  }
}

@keyframes cover-turn-backward {
  0% {
    opacity: 0;
    transform: translateX(-48%) scaleX(0.18) skewY(-2deg);
  }

  45% {
    opacity: 1;
    transform: translateX(-6%) scaleX(0.72) skewY(-1deg);
  }

  100% {
    opacity: 0.9;
    transform: translateX(0) scaleX(1);
  }
}


.tome-book { touch-action: pan-y; }
.page-touch-zone {
  min-width: 3.25rem;
  min-height: 5rem;
}
.page-touch-zone span { pointer-events: none; }
