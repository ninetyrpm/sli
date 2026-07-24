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

function App() {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [secretProgress, setSecretProgress] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  const lines = useMemo(
    () => [
      { text: 'The Loop beckons once more...', className: 'whisper' },
      { text: 'Pain cleanses.', className: 'doctrine' },
      { text: 'Distance redeems.', className: 'doctrine' },
      { text: 'Through suffering, we become one.', className: 'doctrine' },
      { text: 'No prizes.', className: 'rule' },
      { text: 'No podiums.', className: 'rule' },
      { text: 'No mercy.', className: 'rule' },
      { text: 'Just insanity.', className: 'rule' },
      { text: 'The Third Rite approaches.', className: 'closing' },
      { text: 'Will you join the madness?', className: 'closing' },
    ],
    []
  );

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
    <main className="page-shell" aria-label="Scenic Loop Insanity teaser">
      <div className="analog-noise" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="sigil" aria-hidden="true">
        <span className="sigil-ring ring-one" />
        <span className="sigil-ring ring-two" />
        <span className="sigil-ring ring-three" />
        <span className="sigil-slash slash-one" />
        <span className="sigil-slash slash-two" />
      </div>

      <section className="transmission" aria-labelledby="site-title">
        <h1 id="site-title" className="sr-only">
          Scenic Loop Insanity III
        </h1>

        <div className="copy-block" aria-label="Transmission text">
          {lines.map((line, index) => (
            <p
              className={`line ${line.className}`}
              style={{ '--delay': `${0.3 + index * 0.62}s` }}
              key={line.text}
            >
              {line.text}
            </p>
          ))}
        </div>

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
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
