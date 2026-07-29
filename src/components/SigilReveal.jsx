export function SigilReveal({ showSecret, onReadScripture }) {
  return (
    <section className="negative-reveal" aria-live="polite">
      <div className="negative-plaque">
        <h2 className="reveal-title">
          <span className="reveal-title-name">Scenic Loop Insanity</span>
          <span className="reveal-title-number" aria-label="three">III</span>
        </h2>
        <p className="reveal-tagline">The Rite of Mutual Suffering</p>
        <p className="reveal-date">October 2026</p>
        <p className="reveal-location">Cherokee Park · Louisville</p>
        <p className="reveal-declaration">Forty-something laps. One hundred miles. No winners.</p>
        <p className="reveal-message">The details will find the worthy.</p>
        <a className="scripture-link" href="/scripture" onClick={onReadScripture}>Enter the Scriptorium →</a>
      </div>
      <p className={`secret ${showSecret ? 'visible' : ''}`}>Godspeed</p>
    </section>
  );
}
