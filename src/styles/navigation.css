.ritual-map,
.ritual-map-tab {
  position: fixed;
  z-index: 40;
  right: max(0.8rem, env(safe-area-inset-right));
  bottom: max(0.8rem, env(safe-area-inset-bottom));
}

.ritual-map {
  width: min(18rem, calc(100vw - 1.6rem));
  transform: rotate(-1.2deg);
  filter: drop-shadow(0 12px 22px rgba(0, 0, 0, 0.7));
}

.ritual-map-paper {
  position: relative;
  min-height: 12rem;
  padding: 0.85rem 0.95rem 0.75rem;
  color: #2d2116;
  background:
    linear-gradient(rgba(81, 55, 31, 0.08), rgba(81, 55, 31, 0.08)),
    repeating-linear-gradient(7deg, rgba(70, 45, 22, 0.025) 0 1px, transparent 1px 5px),
    #b8a47a;
  border: 1px solid rgba(36, 24, 14, 0.8);
  clip-path: polygon(1% 4%, 9% 1%, 20% 3%, 34% 0, 50% 2%, 67% 0, 82% 3%, 99% 1%, 97% 18%, 100% 34%, 98% 53%, 100% 72%, 97% 99%, 77% 97%, 61% 100%, 42% 97%, 23% 100%, 2% 96%, 4% 78%, 1% 61%, 3% 43%, 0 23%);
  box-shadow: inset 0 0 26px rgba(49, 31, 14, 0.28);
}

.ritual-map-paper::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(circle at 72% 18%, rgba(74, 41, 20, 0.16), transparent 19%);
  mix-blend-mode: multiply;
}

.ritual-map-heading,
.ritual-map-links,
.ritual-map-note {
  position: relative;
  z-index: 2;
}

.ritual-map-heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(45, 33, 22, 0.45);
  padding-bottom: 0.35rem;
}

.ritual-map-heading button,
.ritual-map-links button,
.ritual-map-tab {
  border: 0;
  background: transparent;
  cursor: pointer;
}

.ritual-map-heading button {
  color: inherit;
  font-size: 0.62rem;
  text-decoration: underline;
  text-underline-offset: 0.18em;
}

.ritual-map-drawing {
  position: absolute;
  inset: 2.7rem 1.2rem 2.7rem;
  z-index: 1;
  pointer-events: none;
}

.map-line {
  position: absolute;
  left: 24%;
  right: 22%;
  top: 48%;
  height: 2px;
  background: rgba(47, 31, 18, 0.72);
  transform: rotate(-5deg);
}

.map-line::after {
  content: '';
  position: absolute;
  right: -0.2rem;
  top: -0.25rem;
  width: 0.55rem;
  height: 0.55rem;
  border-top: 2px solid rgba(47, 31, 18, 0.72);
  border-right: 2px solid rgba(47, 31, 18, 0.72);
  transform: rotate(45deg);
}

.map-scratch {
  position: absolute;
  font-family: 'Brush Script MT', cursive;
  font-size: 1.4rem;
  opacity: 0.6;
}
.map-scratch-one { left: 8%; top: 8%; transform: rotate(-14deg); }
.map-scratch-two { right: 4%; bottom: 4%; transform: rotate(11deg); }

.ritual-map-links {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.8rem 1rem;
  margin-top: 1rem;
}

.ritual-map-links button {
  position: relative;
  min-height: 3.1rem;
  color: inherit;
  font-size: 0.82rem;
  font-style: italic;
  text-align: center;
  transform: rotate(-2deg);
}

.ritual-map-links button:nth-child(2) { transform: rotate(2deg); }
.ritual-map-links button:disabled { cursor: default; opacity: 0.7; }
.ritual-map-links button:not(:disabled):hover,
.ritual-map-links button:not(:disabled):focus-visible { text-decoration: underline; text-underline-offset: 0.25em; }

.map-node {
  display: block;
  width: 0.62rem;
  height: 0.62rem;
  margin: 0 auto 0.35rem;
  border: 1px solid currentColor;
  border-radius: 50%;
}

.ritual-map-links .is-current .map-node {
  background: currentColor;
  box-shadow: 0 0 0 3px rgba(45, 33, 22, 0.14);
}

.ritual-map-note {
  margin: 0.8rem 0 0;
  font-size: 0.62rem;
  font-style: italic;
  text-align: right;
  opacity: 0.72;
}

.ritual-map-tab {
  min-width: 6.5rem;
  min-height: 2.75rem;
  padding: 0.55rem 0.8rem;
  color: #2d2116;
  background: #b8a47a;
  border: 1px solid rgba(36, 24, 14, 0.8);
  clip-path: polygon(3% 7%, 97% 2%, 100% 88%, 5% 100%);
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.55), inset 0 0 16px rgba(49, 31, 14, 0.2);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transform: rotate(-1deg);
}

.ritual-map-tab:hover,
.ritual-map-tab:focus-visible { transform: rotate(0deg) translateY(-2px); }
