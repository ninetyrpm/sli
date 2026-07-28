import { BackgroundLayers } from '../components/BackgroundLayers.jsx';
import { scriptureSections } from '../data/verses.js';

export function Scripture() {
  return (
    <main className="scripture-shell" aria-labelledby="scripture-title">
      <BackgroundLayers includeSigil quiet />

      <article className="scripture-document">
        <a className="return-link" href="/">← Return to the transmission</a>

        <header className="scripture-header">
          <p className="archive-label">Recovered Archive / Third Rite</p>
          <h1 id="scripture-title">The Scripture of the Loop</h1>
          <p className="scripture-subtitle">
            Recovered verses pertaining to the Third Rite. Interpretations provided for the insufficiently initiated.
          </p>
        </header>

        <div className="scripture-divider" aria-hidden="true">✦</div>

        {scriptureSections.map((section) => (
          <section className="scripture-section" id={section.id} key={section.id}>
            <div className="section-kicker">Fragment {section.numeral}</div>
            <h2>{section.title}</h2>

            <div className="verse-block">
              <h3>Sacred Verse</h3>
              {section.verse.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <div className="interpretation-block">
              <h3>Interpretation</h3>
              {section.interpretation.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </section>
        ))}

        <footer className="scripture-footer">
          <p>The Loop remains indifferent.</p>
          <a href="/">Return before it notices →</a>
        </footer>
      </article>
    </main>
  );
}
