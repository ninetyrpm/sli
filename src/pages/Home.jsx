import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BackgroundLayers } from '../components/BackgroundLayers.jsx';
import { SigilReveal } from '../components/SigilReveal.jsx';
import { SkipButton } from '../components/SkipButton.jsx';
import { Transmission } from '../components/Transmission.jsx';
import { FINAL_SCENE_INDEX, LOADING_SCENE_INDEX, SCENES, SECRET_SEQUENCE } from '../data/scenes.js';

function startSigilRevealDrift(isRevealedRef) {
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
      animationFrameId = window.requestAnimationFrame(apply);
      return;
    }

    if (!revealStart) revealStart = timestamp;

    const revealT = clamp01((timestamp - revealStart) / 2400);
    const ramp = easeOutCubic(revealT);
    const t = (timestamp - revealStart) / 1000;

    // Slower overlapping waves: candle-breath rather than glitch.
    const slow = Math.sin(t * 0.55);
    const medium = Math.sin(t * 1.05 + 1.7);
    const small = Math.sin(t * 2.35 + 0.4);
    const micro = Math.sin(t * 3.75 + Math.sin(t * 0.32) * 1.2);

    const brightness = 0.32 + ramp * (0.74 + slow * 0.12 + medium * 0.055 + small * 0.025 + micro * 0.012);
    const contrast = 0.90 + ramp * (0.24 + slow * 0.10 + medium * 0.065 + small * 0.025);
    const opacity = ramp * (0.68 + slow * 0.10 + medium * 0.045 + small * 0.020);
    const wash = ramp * (0.10 + slow * 0.045 + medium * 0.025 + small * 0.012);
    const halo = ramp * (0.16 + slow * 0.055 + medium * 0.035 + small * 0.018);

    root.style.setProperty('--sigil-opacity', Math.max(0, opacity).toFixed(3));
    root.style.setProperty('--sigil-brightness', Math.max(0, brightness).toFixed(3));
    root.style.setProperty('--sigil-contrast', Math.max(0, contrast).toFixed(3));
    root.style.setProperty('--sigil-wash', Math.max(0, wash).toFixed(3));
    root.style.setProperty('--sigil-halo', Math.max(0, halo).toFixed(3));

    animationFrameId = window.requestAnimationFrame(apply);
  };

  animationFrameId = window.requestAnimationFrame(apply);

  return () => {
    window.cancelAnimationFrame(animationFrameId);
  };
}

export function Home() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [secretProgress, setSecretProgress] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  const submittedRef = useRef(false);
  submittedRef.current = hasSubmitted;

  useEffect(() => startSigilRevealDrift(submittedRef), []);

  const currentScene = SCENES[sceneIndex];
  const isBlackout = currentScene.type === 'blackout';
  const isLoading = currentScene.type === 'loading';
  const isFinal = currentScene.type === 'final';
  const canSkip = sceneIndex > LOADING_SCENE_INDEX && !isFinal && !hasSubmitted;

  const sceneClassName = useMemo(() => {
    return [
      'page-shell',
      isBlackout ? 'is-blackout' : '',
      isLoading ? 'is-loading' : '',
      hasSubmitted ? 'is-revealed' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }, [isBlackout, isLoading, hasSubmitted]);

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

  return (
    <main className={sceneClassName} aria-label="Scenic Loop Insanity teaser">
      <BackgroundLayers includeSigil />

      <Transmission
        currentScene={currentScene}
        isLoading={isLoading}
        isFinal={isFinal}
        hasSubmitted={hasSubmitted}
        onSubmit={() => setHasSubmitted(true)}
      />

      {canSkip && <SkipButton onSkip={() => setSceneIndex(FINAL_SCENE_INDEX)} />}
      {hasSubmitted && <SigilReveal showSecret={showSecret} />}
    </main>
  );
}
