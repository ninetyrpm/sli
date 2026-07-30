import { useEffect, useMemo, useRef, useState } from 'react';
import { scriptureSections } from '../data/verses.js';

const COVER_PAGE = 0;
const INDEX_PAGE = 1;
const FIRST_INCANTATION_PAGE = 2;
const SWIPE_THRESHOLD = 56;
const SWIPE_AXIS_BIAS = 1.25;

function pageLabel(pageIndex) {
  if (pageIndex === COVER_PAGE) return 'The Scripture of the Loop';
  if (pageIndex === INDEX_PAGE) return 'Index of Incantations';

  const section = scriptureSections[pageIndex - FIRST_INCANTATION_PAGE];
  return section ? section.title : 'Scripture page';
}

export function Scripture() {
  const [pageIndex, setPageIndex] = useState(COVER_PAGE);
  const [turnDirection, setTurnDirection] = useState('');
  const gestureRef = useRef(null);
  const pageFlipAudioRef = useRef(null);
  const maxPageIndex = scriptureSections.length + FIRST_INCANTATION_PAGE - 1;

  useEffect(() => {
    if (!turnDirection) return undefined;

    const timer = window.setTimeout(() => setTurnDirection(''), 780);
    return () => window.clearTimeout(timer);
  }, [turnDirection]);

  const playPageFlip = () => {
    const audio = pageFlipAudioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    audio.play()?.catch(() => {});
  };

  const goToPage = (nextPageIndex) => {
    const boundedPage = Math.max(COVER_PAGE, Math.min(maxPageIndex, nextPageIndex));
    if (boundedPage === pageIndex || turnDirection) return;

    playPageFlip();
    setTurnDirection(boundedPage > pageIndex ? 'turning-forward' : 'turning-backward');
    window.setTimeout(() => setPageIndex(boundedPage), 210);
  };

  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse' || turnDirection) return;
    gestureRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      axis: null,
    };
  };

  const handlePointerMove = (event) => {
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - gesture.startX;
    const deltaY = event.clientY - gesture.startY;

    if (!gesture.axis && (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10)) {
      gesture.axis = Math.abs(deltaX) > Math.abs(deltaY) * SWIPE_AXIS_BIAS ? 'horizontal' : 'vertical';
    }

    if (gesture.axis === 'horizontal' && event.cancelable) event.preventDefault();
  };

  const handlePointerEnd = (event) => {
    const gesture = gestureRef.current;
    gestureRef.current = null;
    if (!gesture || gesture.pointerId !== event.pointerId || gesture.axis !== 'horizontal') return;

    const deltaX = event.clientX - gesture.startX;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;

    if (deltaX < 0 && pageIndex < maxPageIndex) goToPage(pageIndex + 1);
    if (deltaX > 0 && pageIndex > COVER_PAGE) goToPage(pageIndex - 1);
  };

  const currentSection = scriptureSections[pageIndex - FIRST_INCANTATION_PAGE];
  const canGoBackward = pageIndex > COVER_PAGE;
  const canGoForward = pageIndex < maxPageIndex;
  const previousPageTitle = canGoBackward ? pageLabel(pageIndex - 1) : '';
  const nextPageTitle = canGoForward ? pageLabel(pageIndex + 1) : '';

  const tomeClassName = useMemo(
    () => ['tome-book', pageIndex === COVER_PAGE ? 'is-closed' : 'is-open', turnDirection]
      .filter(Boolean)
      .join(' '),
    [pageIndex, turnDirection],
  );

  return (
    <div className="scripture-shell tome-shell" aria-labelledby="scripture-title">
      <audio ref={pageFlipAudioRef} src="/audio/page-flip.wav" preload="auto" hidden />
      <article className="scripture-document tome-stage" aria-live="polite">
        <div
          className={tomeClassName}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={() => { gestureRef.current = null; }}
        >
          <div className="tome-spine" aria-hidden="true" />

          {pageIndex === COVER_PAGE ? (
            <section className="tome-cover" aria-label="Book cover">
              <p className="archive-label">Book of Scenic Loop Insanity III</p>
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
                aria-label="Open the Book of Scenic Loop Insanity III"
              >
                →
              </button>
            </section>
          ) : (
            <section className="tome-page" aria-label={pageLabel(pageIndex)}>
              <header className="tome-page-header">
                <button
                  className="return-to-index"
                  type="button"
                  onClick={() => goToPage(INDEX_PAGE)}
                  aria-current={pageIndex === INDEX_PAGE ? 'page' : undefined}
                >
                  Return to the Index
                </button>
              </header>

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
                    {currentSection.verse.map((line) => <p key={line}>{line}</p>)}
                  </div>

                  <div className="interpretation-block">
                    <h3>Interpretation</h3>
                    {currentSection.interpretation.map((line) => <p key={line}>{line}</p>)}
                  </div>
                </div>
              )}

              <footer className="tome-page-footer" aria-label="Scripture page navigation">
                <div className="tome-footer-side tome-footer-previous">
                  {canGoBackward && (
                    <button type="button" onClick={() => goToPage(pageIndex - 1)}>
                      <span className="tome-footer-direction">Previous</span>
                      <span className="tome-footer-title">{previousPageTitle}</span>
                    </button>
                  )}
                </div>
                <div className="tome-footer-side tome-footer-next">
                  {canGoForward && (
                    <button type="button" onClick={() => goToPage(pageIndex + 1)}>
                      <span className="tome-footer-direction">Next</span>
                      <span className="tome-footer-title">{nextPageTitle}</span>
                    </button>
                  )}
                </div>
              </footer>

              {canGoBackward && (
                <button
                  className="book-arrow book-arrow-left page-touch-zone"
                  type="button"
                  onClick={() => goToPage(pageIndex - 1)}
                  aria-label="Turn to the previous page"
                >
                  <span aria-hidden="true">←</span>
                </button>
              )}

              {canGoForward && (
                <button
                  className="book-arrow book-arrow-right page-touch-zone"
                  type="button"
                  onClick={() => goToPage(pageIndex + 1)}
                  aria-label="Turn to the next page"
                >
                  <span aria-hidden="true">→</span>
                </button>
              )}
            </section>
          )}
        </div>
      </article>
    </div>
  );
}
