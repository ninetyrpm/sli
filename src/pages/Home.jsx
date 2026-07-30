import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SigilReveal } from '../components/SigilReveal.jsx';
import { SkipButton } from '../components/SkipButton.jsx';
import { Transmission } from '../components/Transmission.jsx';
import { WatchfulEye } from '../components/WatchfulEye.jsx';
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

export function Home({ initialSubmitted = false, isActive = true, soundMuted = false, onEffect, onSubmittedChange, onCandleLitChange, onCrossroadsSettled, onBeginSoundscape, onSecretOpenChange, onSecretDismiss }) {
  const [sceneIndex, setSceneIndex] = useState(() => (initialSubmitted ? FINAL_SCENE_INDEX : 0));
  const [hasStarted, setHasStarted] = useState(() => initialSubmitted);
  const [hasSubmitted, setHasSubmitted] = useState(() => initialSubmitted);
  const [skipToSubmit, setSkipToSubmit] = useState(false);
  const [secretProgress, setSecretProgress] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  const submittedRef = useRef(false);
  const matchStrikeRef = useRef(null);
  const revealCompleteRef = useRef(initialSubmitted);
  const sceneIndexRef = useRef(sceneIndex);
  sceneIndexRef.current = sceneIndex;
  submittedRef.current = hasSubmitted;

  useEffect(() => startSigilRevealDrift(submittedRef, revealCompleteRef), []);

  useEffect(() => {
    const audio = matchStrikeRef.current;
    if (!audio || initialSubmitted || !hasStarted || soundMuted) return undefined;

    let cancelled = false;
    const timer = window.setTimeout(() => {
      if (cancelled) return;
      audio.pause();
      audio.currentTime = 0.217;
      audio.volume = 1;
      onEffect?.(1500);
      audio.play()?.catch(() => {});
    }, 1450);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [hasStarted, initialSubmitted, onEffect, soundMuted]);

  useEffect(() => {
    onSubmittedChange?.(hasSubmitted);
  }, [hasSubmitted, onSubmittedChange]);

  useEffect(() => {
    if (!hasSubmitted) return undefined;

    // The plaque begins its entrance 2.6 seconds after submission and completes
    // 4.3 seconds later. Keep the folded map off-screen until the plaque has
    // fully settled, then allow a brief pause before its own entrance.
    const timer = window.setTimeout(() => {
      onCrossroadsSettled?.();
    }, 7600);

    return () => window.clearTimeout(timer);
  }, [hasSubmitted, onCrossroadsSettled]);

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
    if (!hasStarted || hasSubmitted || currentScene.duration === null) return undefined;

    const timer = window.setTimeout(() => {
      setSceneIndex((index) => Math.min(index + 1, SCENES.length - 1));
    }, currentScene.duration);

    return () => window.clearTimeout(timer);
  }, [currentScene, hasStarted, hasSubmitted]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!hasSubmitted || !isActive || showSecret) return;

      const expectedKey = SECRET_SEQUENCE[secretProgress];

      if (event.key === expectedKey) {
        const nextProgress = secretProgress + 1;

        if (nextProgress === SECRET_SEQUENCE.length) {
          setShowSecret(true);
          onSecretOpenChange?.(true);
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
  }, [hasSubmitted, isActive, secretProgress, showSecret]);

  const handleSkip = () => {
    setSceneIndex(FINAL_SCENE_INDEX);
    setSkipToSubmit(true);
  };

  const handleStart = () => {
    if (hasStarted) return;
    const audio = matchStrikeRef.current;
    if (audio && !soundMuted) {
      audio.muted = true;
      audio.play()?.then(() => {
        audio.pause();
        audio.currentTime = 0.217;
        audio.muted = false;
      }).catch(() => { audio.muted = false; });
    }
    setHasStarted(true);
  };

  const handleSubmit = () => {
    onBeginSoundscape?.();
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

  const handleSecretDismiss = () => {
    setShowSecret(false);
    onSecretOpenChange?.(false);
    setSecretProgress(0);
    onSecretDismiss?.();
  };


  return (
    <div className={sceneClassName} aria-label="Scenic Loop Insanity teaser">
      <audio
        ref={matchStrikeRef}
        src="/audio/match-strike.wav"
        preload="auto"
        hidden
      />
      {!hasStarted && !initialSubmitted ? (
        <section className="dark-threshold" aria-label="Begin the ritual">
          <button className="dark-threshold-button" type="button" onClick={handleStart}>
            IT'S DARK IN HERE
          </button>
          <p>Sound is part of the ritual.</p>
        </section>
      ) : (
        <Transmission
          currentScene={currentScene}
          isLoading={isLoading}
          isFinal={isFinal}
          hasSubmitted={hasSubmitted}
          skipToSubmit={skipToSubmit}
          onSubmit={handleSubmit}
        />
      )}

      {hasStarted && canSkip && <SkipButton onSkip={handleSkip} />}
      {hasSubmitted && <SigilReveal />}
      <WatchfulEye isOpen={showSecret} onDismiss={handleSecretDismiss} />
    </div>
  );
}
