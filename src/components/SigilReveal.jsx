export function SigilReveal({ showSecret }) {
  return (
    <section className="negative-reveal" aria-live="polite">
      <div className="negative-plaque">
        <p className="reveal-date">October 2026.</p>
        <p className="reveal-message">The details will find the worthy.</p>
        <a className="scripture-link" href="/scripture">Read the Scripture →</a>
      </div>
      <p className={`secret ${showSecret ? 'visible' : ''}`}>Godspeed</p>
    </section>
  );
}
