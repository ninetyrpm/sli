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
      root.style.setProperty('--sigil-brightness', '0.24');
      root.style.setProperty('--sigil-contrast', '0.86');
      root.style.setProperty('--sigil-wash', '0.000');
      root.style.setProperty('--sigil-halo', '0.00');
      animationFrameId = window.requestAnimationFrame(apply);
      return;
    }

    if (!revealStart) revealStart = timestamp;

    // Slow cathedral illumination: starts as almost nothing, then opens into a larger room.
    const revealT = clamp01((timestamp - revealStart) / 5400);
    const ramp = easeOutCubic(revealT);
    const t = (timestamp - revealStart) / 1000;

    // Slow overlapping waves: candle-breath rather than digital jitter.
    const slow = Math.sin(t * 0.32);
    const medium = Math.sin(t * 0.72 + 1.7);
    const small = Math.sin(t * 1.36 + 0.4);
    const micro = Math.sin(t * 2.05 + Math.sin(t * 0.23) * 0.8);

    const brightness = 0.24 + ramp * (0.86 + slow * 0.10 + medium * 0.052 + small * 0.022 + micro * 0.008);
    const contrast = 0.86 + ramp * (0.34 + slow * 0.075 + medium * 0.044 + small * 0.017);
    const opacity = ramp * (0.76 + slow * 0.075 + medium * 0.036 + small * 0.014);
    const wash = ramp * (0.13 + slow * 0.035 + medium * 0.020 + small * 0.008);
    const halo = ramp * (0.25 + slow * 0.050 + medium * 0.028 + small * 0.012);

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
  const [hasSkipped, setHasSkipped] = useState(false);
  const [isEnteringScripture, setIsEnteringScripture] = useState(false);
  const [secretProgress, setSecretProgress] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  const submittedRef = useRef(false);
  submittedRef.current = hasSubmitted;

  useEffect(() => startSigilRevealDrift(submittedRef), []);

  const currentScene = SCENES[sceneIndex];
  const isBlackout = currentScene.type === 'blackout';
  const isLoading = currentScene.type === 'loading';
  const isFinal = currentScene.type === 'final';
  const immediateFinal = isFinal && hasSkipped && !hasSubmitted;
  const canSkip = sceneIndex > LOADING_SCENE_INDEX && !isFinal && !hasSubmitted;

  const sceneClassName = useMemo(() => {
    return [
      'page-shell',
      isBlackout ? 'is-blackout' : '',
      isLoading ? 'is-loading' : '',
      hasSubmitted ? 'is-revealed' : '',
      hasSkipped ? 'has-skipped' : '',
      isEnteringScripture ? 'is-entering-scripture' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }, [isBlackout, isLoading, hasSubmitted, hasSkipped, isEnteringScripture]);

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
    setHasSkipped(true);
    setSceneIndex(FINAL_SCENE_INDEX);
  };

  const handleScriptureClick = (event) => {
    event.preventDefault();
    if (isEnteringScripture) return;
    setIsEnteringScripture(true);
    window.setTimeout(() => {
      window.location.href = '/scripture';
    }, 3200);
  };

  return (
    <main className={sceneClassName} aria-label="Scenic Loop Insanity teaser">
      <BackgroundLayers includeSigil />

      <Transmission
        currentScene={currentScene}
        isLoading={isLoading}
        isFinal={isFinal}
        hasSubmitted={hasSubmitted}
        onSubmit={() => setHasSubmitted(true)}
        immediateFinal={immediateFinal}
      />

      {canSkip && <SkipButton onSkip={handleSkip} />}
      {hasSubmitted && <SigilReveal showSecret={showSecret} onScriptureClick={handleScriptureClick} />}
    </main>
  );
}
