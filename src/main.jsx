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
    duration: 1350,
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
    duration: 1350,
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
    duration: 1250,
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

function App() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [secretProgress, setSecretProgress] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    const applyFlicker = () => {
      const contrast = (0.72 + Math.random() * 0.82).toFixed(2);
      const brightness = (0.42 + Math.random() * 0.42).toFixed(2);
      const opacity = (0.18 + Math.random() * 0.22).toFixed(2);
      const wash = (0.04 + Math.random() * 0.08).toFixed(2);

      document.documentElement.style.setProperty('--sigil-contrast', contrast);
      document.documentElement.style.setProperty('--sigil-brightness', brightness);
      document.documentElement.style.setProperty('--sigil-opacity', opacity);
      document.documentElement.style.setProperty('--sigil-wash', wash);
    };

    let timeoutId;
    let cancelled = false;

    const scheduleFlicker = () => {
      if (cancelled) return;
      applyFlicker();
      timeoutId = window.setTimeout(scheduleFlicker, 95 + Math.random() * 360);
    };

    scheduleFlicker();

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  const currentScene = SCENES[sceneIndex];
  const isBlackout = currentScene.type === 'blackout';
  const isLoading = currentScene.type === 'loading';
  const isFinal = currentScene.type === 'final';

  const sceneClassName = useMemo(() => {
    return ['page-shell', isBlackout ? 'is-blackout' : '', isLoading ? 'is-loading' : '']
      .filter(Boolean)
      .join(' ');
  }, [isBlackout, isLoading]);

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
        } else {
          setSecretProgress(nextProgress);
        }
        return;
      }

      setSecretProgress(event.key === SECRET_SEQUENCE[0] ? 1 : 0);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [secretProgress]);

  return (
    <main className={sceneClassName} aria-label="Scenic Loop Insanity teaser">
      <div className="analog-noise" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="sigil-pattern" aria-hidden="true" />
      <div className="tape-damage" aria-hidden="true" />
      <div className="candle-wrap" aria-hidden="true">
        <div className="candle-flame" />
        <div className="candle-body" />
        <div className="candle-glow" />
      </div>

      <section className="transmission" aria-labelledby="site-title">
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

            <div className={`details ${hasSubmitted ? 'visible' : ''}`} aria-live="polite">
              <p>October 2026.</p>
              <p>The details will find the worthy.</p>
            </div>

            <div className={`secret ${showSecret ? 'visible' : ''}`} aria-live="polite">
              Godspeed
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
