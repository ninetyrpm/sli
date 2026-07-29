import { useEffect, useMemo, useState } from 'react';
import { scriptureSections } from '../data/verses.js';

const COVER_PAGE = 0;
const INDEX_PAGE = 1;
const FIRST_INCANTATION_PAGE = 2;

function pageLabel(pageIndex) {
  if (pageIndex === COVER_PAGE) return 'Closed cover';
  if (pageIndex === INDEX_PAGE) return 'Index of Incantations';

  const section = scriptureSections[pageIndex - FIRST_INCANTATION_PAGE];
  return section ? `Incantation ${section.numeral}: ${section.title}` : 'Scripture page';
}

export function Scripture({ onReturnHome }) {
  const [pageIndex, setPageIndex] = useState(COVER_PAGE);
  const [turnDirection, setTurnDirection] = useState('');
  const maxPageIndex = scriptureSections.length + FIRST_INCANTATION_PAGE - 1;

  useEffect(() => {
    if (!turnDirection) return undefined;

    const timer = window.setTimeout(() => setTurnDirection(''), 780);
    return () => window.clearTimeout(timer);
  }, [turnDirection]);

  const handleReturnHome = (event) => {
    event.preventDefault();
    onReturnHome?.();
  };

  const goToPage = (nextPageIndex) => {
    const boundedPage = Math.max(COVER_PAGE, Math.min(maxPageIndex, nextPageIndex));
    if (boundedPage === pageIndex) return;

    setTurnDirection(boundedPage > pageIndex ? 'turning-forward' : 'turning-backward');
    window.setTimeout(() => setPageIndex(boundedPage), 210);
  };

  const currentSection = scriptureSections[pageIndex - FIRST_INCANTATION_PAGE];
  const canGoBackward = pageIndex > COVER_PAGE;
  const canGoForward = pageIndex < maxPageIndex;

  const tomeClassName = useMemo(
    () => ['tome-book', pageIndex === COVER_PAGE ? 'is-closed' : 'is-open', turnDirection]
      .filter(Boolean)
      .join(' '),
    [pageIndex, turnDirection],
  );

  return (
    <div className="scripture-shell tome-shell" aria-labelledby="scripture-title">
      <a className="return-link tome-return" href="/" onClick={handleReturnHome}>← Return to Home</a>

      <article className="scripture-document tome-stage" aria-live="polite">
        <div className={tomeClassName}>
          <div className="tome-spine" aria-hidden="true" />

          {pageIndex === COVER_PAGE ? (
            <section className="tome-cover" aria-label="Book cover">
              <p className="archive-label">Book of the Third Rite</p>
              <h1 id="scripture-title">The Scripture of the Loop</h1>
              <p className="scripture-subtitle">
                Incantations of the Loop, with interpretations provided for the insufficiently initiated.
              </p>
              <div className="cover-sigil" aria-hidden="true" />
              <p className="cover-warning">Open only after submitting to the Loop.</p>
              <button
                className="book-arrow book-arrow-right cover-open"
                type="button"
                onClick={() => goToPage(INDEX_PAGE)}
                aria-label="Open the Book of the Third Rite"
              >
                →
              </button>
            </section>
          ) : (
            <section className="tome-page" aria-label={pageLabel(pageIndex)}>
              {pageIndex === INDEX_PAGE ? (
                <div className="tome-page-content index-page-content">
                  <p className="archive-label">Index of Incantations</p>
                  <h2>Choose the Verse</h2>
                  <p className="index-instruction">
                    Turn the pages in order, or place your finger upon an incantation and be taken there.
                  </p>

                  <nav className="incantation-index tome-index" aria-label="Index of incantations">
                    <ol>
                      {scriptureSections.map((section, index) => (
                        <li key={section.id}>
                          <button
                            className="index-entry"
                            type="button"
                            onClick={() => goToPage(index + FIRST_INCANTATION_PAGE)}
                          >
                            <span>{section.numeral}</span>
                            {section.title}
                          </button>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </div>
              ) : (
                <div className="tome-page-content incantation-page-content">
                  <div className="section-kicker">Incantation {currentSection.numeral}</div>
                  <h2>{currentSection.title}</h2>

                  <div className="verse-block">
                    <h3>Verse</h3>
                    {currentSection.verse.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>

                  <div className="interpretation-block">
                    <h3>Interpretation</h3>
                    {currentSection.interpretation.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              )}

              <footer className="tome-page-footer">
                <span>{pageLabel(pageIndex)}</span>
                <a href="/" onClick={handleReturnHome}>Return before it notices →</a>
              </footer>

              {canGoBackward && (
                <button
                  className="book-arrow book-arrow-left"
                  type="button"
                  onClick={() => goToPage(pageIndex - 1)}
                  aria-label="Turn to the previous page"
                >
                  ←
                </button>
              )}

              {canGoForward && (
                <button
                  className="book-arrow book-arrow-right"
                  type="button"
                  onClick={() => goToPage(pageIndex + 1)}
                  aria-label="Turn to the next page"
                >
                  →
                </button>
              )}
            </section>
          )}
        </div>
      </article>
    </div>
  );
}
