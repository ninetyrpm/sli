import { scriptureSections } from '../data/verses.js';

export function Scripture({ onReturnHome }) {
  const handleReturnHome = (event) => {
    event.preventDefault();
    onReturnHome?.();
  };

  return (
    <div className="scripture-shell" aria-labelledby="scripture-title">
      <article className="scripture-document">
        <a className="return-link" href="/" onClick={handleReturnHome}>← Return to Home</a>

        <header className="scripture-header">
          <p className="archive-label">Book of the Third Rite</p>
          <h1 id="scripture-title">The Scripture of the Loop</h1>
          <p className="scripture-subtitle">
            Incantations of the Loop, with interpretations provided for the insufficiently initiated.
          </p>
        </header>

        <div className="scripture-divider" aria-hidden="true">✦</div>

        <nav className="incantation-index" aria-label="Index of incantations">
          <p>Index of Incantations</p>
          <ol>
            {scriptureSections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.numeral}. {section.title}</a>
              </li>
            ))}
          </ol>
        </nav>

        {scriptureSections.map((section, index) => (
          <section
            className="scripture-section"
            id={section.id}
            key={section.id}
            style={{ '--section-index': index }}
          >
            <div className="section-kicker">Incantation {section.numeral}</div>
            <h2>{section.title}</h2>

            <div className="verse-block">
              <h3>Verse</h3>
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
          <a href="/" onClick={handleReturnHome}>Return before it notices →</a>
        </footer>
      </article>
    </div>
  );
}
