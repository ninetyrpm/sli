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
    duration: 1200,
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
    duration: 1200,
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
    duration: 1150,
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

function startSigilCandleDrift() {
  const root = document.documentElement;
  let animationFrameId;
  let startTime;

  const apply = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const t = (timestamp - startTime) / 1000;

    // Smooth overlapping waves: no step changes, no abrupt target jumps.
    // The higher-frequency waves add candle instability while still ramping continuously.
    const slow = Math.sin(t * 0.72);
    const medium = Math.sin(t * 1.83 + 1.7);
    const fast = Math.sin(t * 4.9 + 0.4);
    const flutter = Math.sin(t * 9.8 + Math.sin(t * 0.31) * 1.8);
    const breath = 0.52 + 0.28 * slow + 0.13 * medium + 0.05 * fast + 0.025 * flutter;
    const normalized = Math.max(0, Math.min(1, breath));

    const contrast = 1.02 + normalized * 0.38;
    const brightness = 0.92 + normalized * 0.34;
    const opacity = 0.52 + normalized * 0.24;
    const wash = 0.055 + normalized * 0.09;
    const warmth = 0.045 + normalized * 0.105;
    const halo = 0.18 + normalized * 0.22;

    root.style.setProperty('--sigil-contrast', contrast.toFixed(3));
    root.style.setProperty('--sigil-brightness', brightness.toFixed(3));
    root.style.setProperty('--sigil-opacity', opacity.toFixed(3));
    root.style.setProperty('--sigil-wash', wash.toFixed(3));
    root.style.setProperty('--sigil-warmth', warmth.toFixed(3));
    root.style.setProperty('--reveal-halo', halo.toFixed(3));

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

  useEffect(() => startSigilCandleDrift(), []);

  const currentScene = SCENES[sceneIndex];
  const isBlackout = currentScene.type === 'blackout';
  const isLoading = currentScene.type === 'loading';
  const isFinal = currentScene.type === 'final';

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
    if (currentScene.duration === null) return undefined;

    const timer = window.setTimeout(() => {
      setSceneIndex((index) => Math.min(index + 1, SCENES.length - 1));
    }, currentScene.duration);

    return () => window.clearTimeout(timer);
  }, [currentScene]);

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
      <div className="sigil-pattern" aria-hidden="true" />
      <div className="candle-wash" aria-hidden="true" />
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

      <section className="negative-reveal" aria-live="polite" aria-hidden={!hasSubmitted}>
        <p>October 2026.</p>
        <p>The details will find the worthy.</p>
        <p className={`secret ${showSecret ? 'visible' : ''}`}>Godspeed</p>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
