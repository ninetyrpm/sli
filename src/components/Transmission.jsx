export function Transmission({ currentScene, isLoading, isFinal, hasSubmitted, onSubmit, immediateFinal = false }) {
  return (
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
          <div
            className={`copy-block candlelit-text ${currentScene.tone || ''} ${immediateFinal ? 'immediate' : ''}`}
            key={`${currentScene.key}-${immediateFinal ? 'instant' : 'timed'}`}
          >
            {currentScene.lines.map((line, index) => (
              <p
                className="line"
                style={{ '--delay': immediateFinal ? '0ms' : `${0.45 + index * 1.05}s` }}
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
          <button
            className={`submit-button ${immediateFinal ? 'immediate' : ''}`}
            type="button"
            onClick={onSubmit}
          >
            I Submit to the Loop
          </button>
        </div>
      )}
    </section>
  );
}
