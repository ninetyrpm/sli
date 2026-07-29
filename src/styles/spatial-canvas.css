.spatial-shell {
  position: relative;
  width: 100%;
  height: 100svh;
  overflow: hidden;
  isolation: isolate;
  background: var(--black);
}

.spatial-grid {
  position: relative;
  width: calc(var(--grid-columns) * 100vw);
  height: calc(var(--grid-rows) * 100svh);
  transform: translate3d(calc(var(--view-x) * -100vw), calc(var(--view-y) * -100svh), 0);
  transition: transform 1450ms cubic-bezier(0.76, 0, 0.24, 1);
  will-change: transform;
}

.spatial-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.spatial-background .base-darkness,
.spatial-background .intro-glow,
.spatial-background .sigil-pattern,
.spatial-background .sigil-warmth,
.spatial-background .tape-damage,
.spatial-background .vignette,
.spatial-background .analog-noise,
.spatial-background .reveal-wave {
  position: absolute;
}

.spatial-background .sigil-pattern {
  background-size: 610px auto;
}

.spatial-shell:not(.is-spatial-revealed) .spatial-background .intro-glow {
  left: var(--crossroads-center-x, 50vw);
  top: var(--crossroads-center-y, 50svh);
}

.spatial-shell.is-spatial-revealed .spatial-background .sigil-warmth {
  opacity: 1;
}

.spatial-shell.is-spatial-revealed .spatial-background .analog-noise {
  opacity: 0.11;
}

.spatial-shell.is-spatial-revealed .spatial-background .vignette {
  background: radial-gradient(circle at 50% 50%, transparent 28%, rgba(0, 0, 0, 0.22) 68%, rgba(0, 0, 0, 0.74) 96%);
}

.spatial-chamber {
  position: absolute;
  left: calc(var(--chamber-x) * 100vw);
  top: calc(var(--chamber-y) * 100svh);
  width: 100vw;
  height: 100svh;
  overflow: hidden;
}

.spatial-shell .page-shell,
.spatial-shell .scripture-shell {
  min-height: 100svh;
  background: transparent;
}

.crossroads-chamber,
.scriptorium-chamber {
  z-index: 2;
}

.spatial-shell.view-scriptorium .scripture-document {
  animation: tome-arrival-horizontal 1450ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes tome-arrival-horizontal {
  from { opacity: 0.3; transform: translateX(4vw) scale(0.985); }
  to { opacity: 1; transform: translateX(0) scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .spatial-grid { transition-duration: 180ms; }
  .spatial-shell.view-scriptorium .scripture-document { animation: none; }
}
