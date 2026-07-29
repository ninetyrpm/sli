import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SigilReveal } from '../components/SigilReveal.jsx';
import { SkipButton } from '../components/SkipButton.jsx';
import { Transmission } from '../components/Transmission.jsx';
import { CANDLE_SCENE_INDEX, FINAL_SCENE_INDEX, LOADING_SCENE_INDEX, SCENES, SECRET_SEQUENCE } from '../data/scenes.js';

function startSigilRevealDrift(isRevealedRef, revealCompleteRef) {
  const root = document.documentElement;
  let animationFrameId;
  let revealStart;

  const clamp01 = (value) => Math.min(1, Math.max(0, value));
  const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);

  const apply = (timestamp) => {
    const isRevealed = isRevealedRef.current;

    if (!isRevealed) {
      revealStart = undefined;
      root.style.setProperty('--sigil-opacity', '0');
      root.style.setProperty('--sigil-brightness', '0.32');
      root.style.setProperty('--sigil-contrast', '0.90');
      root.style.setProperty('--sigil-wash', '0.000');
      root.style.setProperty('--sigil-halo', '0.00');
      root.style.setProperty('--sigil-reveal-radius', '0vmax');
      root.style.setProperty('--reveal-wave-opacity', '0');
      root.style.setProperty('--candle-scale', '1');
      root.style.setProperty('--candle-opacity', '1');
      animationFrameId = window.requestAnimationFrame(apply);
      return;
    }

    if (!revealStart) {
      revealStart = revealCompleteRef.current ? timestamp - 6200 : timestamp;
    }

    const revealT = clamp01((timestamp - revealStart) / 4200);
    const ramp = revealCompleteRef.current ? 1 : easeOutCubic(revealT);
    const waveProgress = revealCompleteRef.current ? 1 : revealT;
    const t = (timestamp - revealStart) / 1000;

    // Slow overlapping waves: cathedral candlelight, not screen glitch.
    const slow = Math.sin(t * 0.38);
    const medium = Math.sin(t * 0.82 + 1.7);
    const small = Math.sin(t * 1.65 + 0.4);
    const micro = Math.sin(t * 2.45 + Math.sin(t * 0.24) * 1.2);

    const brightness = 0.32 + ramp * (0.82 + slow * 0.10 + medium * 0.045 + small * 0.018 + micro * 0.008);
    const contrast = 0.90 + ramp * (0.25 + slow * 0.08 + medium * 0.045 + small * 0.018);
    const opacity = ramp * (0.76 + slow * 0.075 + medium * 0.035 + small * 0.014);
    const wash = ramp * (0.14 + slow * 0.036 + medium * 0.020 + small * 0.010);
    const halo = ramp * (0.23 + slow * 0.048 + medium * 0.026 + small * 0.012);

    root.style.setProperty('--sigil-opacity', Math.max(0, opacity).toFixed(3));
    root.style.setProperty('--sigil-brightness', Math.max(0, brightness).toFixed(3));
    root.style.setProperty('--sigil-contrast', Math.max(0, contrast).toFixed(3));
    root.style.setProperty('--sigil-wash', Math.max(0, wash).toFixed(3));
    root.style.setProperty('--sigil-halo', Math.max(0, halo).toFixed(3));
    const candleFadeT = clamp01((waveProgress - 0.16) / 0.66);
    const candleOpacity = 1 - easeOutCubic(candleFadeT);

    root.style.setProperty('--sigil-reveal-radius', `${(waveProgress * 235).toFixed(2)}vmax`);
    root.style.setProperty('--reveal-wave-opacity', revealCompleteRef.current ? '0' : Math.sin(Math.PI * waveProgress).toFixed(3));
    root.style.setProperty('--candle-scale', (1 + waveProgress * 5.2).toFixed(3));
    root.style.setProperty('--candle-opacity', Math.max(0, candleOpacity).toFixed(3));

    if (revealT >= 1 && !revealCompleteRef.current) {
      revealCompleteRef.current = true;
    }

    animationFrameId = window.requestAnimationFrame(apply);
  };

  animationFrameId = window.requestAnimationFrame(apply);

  return () => {
    window.cancelAnimationFrame(animationFrameId);
  };
}

export function Home({ initialSubmitted = false, onSubmittedChange, onCandleLitChange, onCrossroadsSettled, onReadScripture }) {
  const [sceneIndex, setSceneIndex] = useState(() => (initialSubmitted ? FINAL_SCENE_INDEX : 0));
  const [hasSubmitted, setHasSubmitted] = useState(() => initialSubmitted);
  const [skipToSubmit, setSkipToSubmit] = useState(false);
  const [secretProgress, setSecretProgress] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  const submittedRef = useRef(false);
  const revealCompleteRef = useRef(initialSubmitted);
  submittedRef.current = hasSubmitted;

  useEffect(() => startSigilRevealDrift(submittedRef, revealCompleteRef), []);

  useEffect(() => {
    onSubmittedChange?.(hasSubmitted);
  }, [hasSubmitted, onSubmittedChange]);

  useEffect(() => {
    if (!hasSubmitted || initialSubmitted) return undefined;

    // The plaque begins entering after the reveal wave and takes 1.2 seconds
    // to settle. Hold the folded map back a little longer so the visitor can
    // take in the Crossroads before another navigational element arrives.
    const timer = window.setTimeout(() => {
      onCrossroadsSettled?.();
    }, 5400);

    return () => window.clearTimeout(timer);
  }, [hasSubmitted, initialSubmitted, onCrossroadsSettled]);

  useEffect(() => {
    const candleIsLit = sceneIndex >= CANDLE_SCENE_INDEX || hasSubmitted;
    onCandleLitChange?.(candleIsLit);
  }, [sceneIndex, hasSubmitted, onCandleLitChange]);

  const currentScene = SCENES[sceneIndex];
  const isBlackout = currentScene.type === 'blackout';
  const isLoading = currentScene.type === 'loading';
  const isFinal = currentScene.type === 'final';
  const canSkip = sceneIndex > CANDLE_SCENE_INDEX && !isFinal && !hasSubmitted;

  const sceneClassName = useMemo(() => {
    return [
      'page-shell',
      isBlackout ? 'is-blackout' : '',
      isLoading ? 'is-loading' : '',
      sceneIndex >= CANDLE_SCENE_INDEX || hasSubmitted ? 'is-candle-lit' : '',
      hasSubmitted ? 'is-revealed' : '',
      skipToSubmit ? 'has-skipped' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }, [isBlackout, isLoading, hasSubmitted, skipToSubmit, sceneIndex]);

  useEffect(() => {
    if (hasSubmitted || currentScene.duration === null) return undefined;

    const timer = window.setTimeout(() => {
      setSceneIndex((index) => Math.min(index + 1, SCENES.length - 1));
    }, currentScene.duration);

    return () => window.clearTimeout(timer);
  }, [currentScene, hasSubmitted]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!hasSubmitted) return;

      const expectedKey = SECRET_SEQUENCE[secretProgress];

      if (event.key === expectedKey) {
        const nextProgress = secretProgress + 1;

        if (nextProgress === SECRET_SEQUENCE.length) {
          setShowSecret(true);
          setSecretProgress(0);
          return;
        }

        setSecretProgress(nextProgress);
        return;
      }

      setSecretProgress(event.key === SECRET_SEQUENCE[0] ? 1 : 0);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasSubmitted, secretProgress]);

  const handleSkip = () => {
    setSceneIndex(FINAL_SCENE_INDEX);
    setSkipToSubmit(true);
  };

  const handleSubmit = () => {
    const root = document.documentElement;

    // Prime the reveal synchronously so the lit candle never drops to black
    // while React changes from the transmission to the revealed chamber.
    root.style.setProperty('--sigil-opacity', '0');
    root.style.setProperty('--sigil-reveal-radius', '0vmax');
    root.style.setProperty('--reveal-wave-opacity', '0');
    root.style.setProperty('--candle-scale', '1');
    root.style.setProperty('--candle-opacity', '1');

    revealCompleteRef.current = false;
    setHasSubmitted(true);
  };

  const handleReadScripture = (event) => {
    event.preventDefault();
    onReadScripture?.();
  };

  return (
    <div className={sceneClassName} aria-label="Scenic Loop Insanity teaser">
      <Transmission
        currentScene={currentScene}
        isLoading={isLoading}
        isFinal={isFinal}
        hasSubmitted={hasSubmitted}
        skipToSubmit={skipToSubmit}
        onSubmit={handleSubmit}
      />

      {canSkip && <SkipButton onSkip={handleSkip} />}
      {hasSubmitted && <SigilReveal showSecret={showSecret} onReadScripture={handleReadScripture} />}
    </div>
  );
}
