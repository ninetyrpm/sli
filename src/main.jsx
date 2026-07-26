import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const SECRET_SEQUENCE = [
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowRight',
  'ArrowLeft',
  'ArrowDown',
  'ArrowUp',
];

const SCENES = [
  {
    key: 'loading',
    type: 'loading',
    duration: 2600,
    lines: ['TUNING THE SIGNAL'],
  },
  {
    key: 'summons',
    type: 'text',
    duration: 4300,
    tone: 'whisper',
    lines: ['The Loop beckons once more...'],
  },
  {
    key: 'flicker-one',
    type: 'blackout',
    duration: 1150,
    lines: [],
  },
  {
    key: 'doctrine',
    type: 'text',
    duration: 7200,
    tone: 'doctrine',
    lines: ['Pain cleanses.', 'Distance redeems.', 'Through suffering,', 'We become one.'],
  },
  {
    key: 'flicker-two',
    type: 'blackout',
    duration: 1150,
    lines: [],
  },
  {
    key: 'rules',
    type: 'text',
    duration: 6200,
    tone: 'rule',
    lines: ['No prizes.', 'No podiums.', 'No mercy.', 'Just insanity.'],
  },
  {
    key: 'flicker-three',
    type: 'blackout',
    duration: 1100,
    lines: [],
  },
  {
    key: 'closing',
    type: 'final',
    duration: null,
    tone: 'closing',
    lines: ['The Third Rite approaches.', 'Will you join the madness?'],
  },
];

const LOADING_SCENE_INDEX = 0;
const FINAL_SCENE_INDEX = SCENES.length - 1;

function startSigilRevealDrift(isRevealedRef) {
  const root = document.documentElement;
  let animationFrameId;
  let revealStart;
  let globalStart;

  const clamp01 = (value) => Math.min(1, Math.max(0, value));
  const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);

  const apply = (timestamp) => {
    if (!globalStart) globalStart = timestamp;

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

    const revealT = clamp01((timestamp - revealStart) / 2200);
    const ramp = easeOutCubic(revealT);
    const t = (timestamp - revealStart) / 1000;

    // Smooth, faster candle-flicker: overlapping sine waves with no random step jumps.
    const slow = Math.sin(t * 1.15);
    const medium = Math.sin(t * 2.9 + 1.2);
    const fast = Math.sin(t * 7.2 + 0.7);
    const flutter = Math.sin(t * 13.4 + Math.sin(t * 0.77) * 2.0);
    const raw = 0.5 + slow * 0.22 + medium * 0.16 + fast * 0.075 + flutter * 0.045;
    const flicker = clamp01(raw);

    const opacity = ramp * (0.64 + flicker * 0.22);
    const brightness = 0.35 + ramp * (0.76 + flicker * 0.28);
    const contrast = 0.95 + ramp * (0.26 + flicker * 0.28);
    const wash = ramp * (0.045 + flicker * 0.10);
    const halo = ramp * (0.08 + flicker * 0.22);

    root.style.setProperty('--sigil-opacity', opacity.toFixed(3));
    root.style.setProperty('--sigil-brightness', brightness.toFixed(3));
    root.style.setProperty('--sigil-contrast', contrast.toFixed(3));
    root.style.setProperty('--sigil-wash', wash.toFixed(3));
    root.style.setProperty('--sigil-halo', halo.toFixed(3));

    animationFrameId = window.requestAnimationFrame(apply);
  };

  animationFrameId = window.requestAnimationFrame(apply);

  return () => {
    window.cancelAnimationFrame(animationFrameId);
  };
}

function App() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [secretProgress, setSecretProgress] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  const submittedRef = React.useRef(false);
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
  }, [secretProgress]);

  return (
    <main className={sceneClassName} aria-label="Scenic Loop Insanity teaser">
      <div className="base-darkness" aria-hidden="true" />
      <div className="intro-glow" aria-hidden="true" />
      <div className="sigil-pattern" aria-hidden="true" />
      <div className="sigil-warmth" aria-hidden="true" />
      <div className="tape-damage" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="analog-noise" aria-hidden="true" />

      <section className="transmission" aria-labelledby="site-title" aria-hidden={hasSubmitted}>
        <h1 id="site-title" className="sr-only">
          Scenic Loop Insanity III
        </h1>

        <div className="copy-frame" aria-live="polite">
          {isLoading ? (
            <div className="loading-rite">
              <span className="loading-glyph" aria-hidden="true" />
              <p>TUNING THE SIGNAL</p>
            </div>
          ) : (
            <div className={`copy-block ${currentScene.tone || ''}`} key={currentScene.key}>
              {currentScene.lines.map((line, index) => (
                <p
                  className="line"
                  style={{ '--delay': `${0.45 + index * 1.05}s` }}
                  key={`${currentScene.key}-${line}`}
                >
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>

        {isFinal && (
          <div className="final-actions">
            <button className="submit-button" type="button" onClick={() => setHasSubmitted(true)}>
              I Submit to the Loop
            </button>
          </div>
        )}
      </section>

      {canSkip && (
        <button
          className="skip-button"
          type="button"
          aria-label="Skip transmission"
          onClick={() => setSceneIndex(FINAL_SCENE_INDEX)}
        >
          →
        </button>
      )}

      <section className="negative-reveal" aria-live="polite" aria-hidden={!hasSubmitted}>
        <div className="negative-plaque">
          <p>October 2026.</p>
          <p>The details will find the worthy.</p>
        </div>
        <p className={`secret ${showSecret ? 'visible' : ''}`}>Godspeed</p>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
