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

  let current = {
    contrast: 1.12,
    brightness: 1.04,
    opacity: 0.82,
    wash: 0.12,
    warmth: 0.1,
  };

  let velocity = {
    contrast: 0,
    brightness: 0,
    opacity: 0,
    wash: 0,
    warmth: 0,
  };

  let cancelled = false;
  let timeoutId;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const apply = (duration = 720) => {
    root.style.setProperty('--flicker-duration', `${duration}ms`);
    root.style.setProperty('--sigil-contrast', current.contrast.toFixed(3));
    root.style.setProperty('--sigil-brightness', current.brightness.toFixed(3));
    root.style.setProperty('--sigil-opacity', current.opacity.toFixed(3));
    root.style.setProperty('--sigil-wash', current.wash.toFixed(3));
    root.style.setProperty('--sigil-warmth', current.warmth.toFixed(3));
  };

  const chooseTarget = () => {
    // The sigil is intentionally prominent now. These values shift it from
    // nearly-hidden wallpaper to candlelit occult pattern without becoming neon.
    return {
      contrast: 0.96 + Math.random() * 0.52,
      brightness: 0.82 + Math.random() * 0.58,
      opacity: 0.62 + Math.random() * 0.34,
      wash: 0.055 + Math.random() * 0.14,
      warmth: 0.055 + Math.random() * 0.13,
    };
  };

  const driftToward = (target) => {
    const spring = 0.075 + Math.random() * 0.055;
    const damping = 0.68 + Math.random() * 0.16;

    for (const key of Object.keys(current)) {
      const force = (target[key] - current[key]) * spring;
      velocity[key] = velocity[key] * damping + force;
      current[key] += velocity[key];
    }

    current.contrast = clamp(current.contrast, 0.88, 1.58);
    current.brightness = clamp(current.brightness, 0.72, 1.55);
    current.opacity = clamp(current.opacity, 0.52, 0.98);
    current.wash = clamp(current.wash, 0.03, 0.24);
    current.warmth = clamp(current.warmth, 0.03, 0.22);
  };

  const scheduleNext = () => {
    if (cancelled) return;

    const target = chooseTarget();
    const quickFlutter = Math.random() < 0.12;

    const duration = quickFlutter
      ? 150 + Math.random() * 220
      : 620 + Math.random() * 1500;

    const steps = quickFlutter ? 2 : 5 + Math.floor(Math.random() * 6);
    let step = 0;

    const tick = () => {
      if (cancelled) return;

      driftToward(target);
      apply(duration);

      step += 1;

      if (step < steps) {
        timeoutId = window.setTimeout(tick, duration / steps);
        return;
      }

      const pause = quickFlutter
        ? 70 + Math.random() * 220
        : 180 + Math.random() * 900;

      timeoutId = window.setTimeout(scheduleNext, pause);
    };

    tick();
  };

  apply();
  scheduleNext();

  return () => {
    cancelled = true;
    window.clearTimeout(timeoutId);
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
