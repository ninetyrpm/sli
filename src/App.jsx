import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Home } from './pages/Home.jsx';
import { Scripture } from './pages/Scripture.jsx';
import { BackgroundLayers } from './components/BackgroundLayers.jsx';
import { RitualMap } from './components/RitualMap.jsx';
import { CHAMBERS, CHAMBER_LIST, getChamberFromPath } from './config/chambers.js';

const GRID_MIN_X = Math.min(...CHAMBER_LIST.map((chamber) => chamber.x));
const GRID_MAX_X = Math.max(...CHAMBER_LIST.map((chamber) => chamber.x));
const GRID_MIN_Y = Math.min(...CHAMBER_LIST.map((chamber) => chamber.y));
const GRID_MAX_Y = Math.max(...CHAMBER_LIST.map((chamber) => chamber.y));
const GRID_COLUMNS = GRID_MAX_X - GRID_MIN_X + 1;
const GRID_ROWS = GRID_MAX_Y - GRID_MIN_Y + 1;

export function App() {
  const [activeChamberId, setActiveChamberId] = useState(() => getChamberFromPath().id);
  const [homeHasSubmitted, setHomeHasSubmitted] = useState(() => getChamberFromPath().id !== 'crossroads');
  const [mapHidden, setMapHidden] = useState(true);
  const [mapReady, setMapReady] = useState(() => getChamberFromPath().id !== 'crossroads');
  const [mapHasEntered, setMapHasEntered] = useState(() => getChamberFromPath().id !== 'crossroads');
  const [candleLit, setCandleLit] = useState(() => getChamberFromPath().id !== 'crossroads');
  const ritualSoundscapeRef = useRef(null);
  const chamberWhispersRef = useRef(null);
  const whisperStopTimerRef = useRef(null);

  const activeChamber = CHAMBERS[activeChamberId] ?? CHAMBERS.crossroads;

  const beginRitualSoundscape = useCallback(() => {
    const audio = ritualSoundscapeRef.current;
    if (!audio) return;

    audio.loop = true;

    // Submission is a direct user gesture, so browsers permit audible
    // playback here. Keep the same element mounted at App level so the
    // soundscape continues uninterrupted while moving between chambers.
    const playback = audio.play();
    playback?.catch(() => {
      // A browser or device may still deny playback because of a local
      // media policy. A later submission click can retry without breaking
      // the visual transition.
    });
  }, []);


  const playChamberWhisper = useCallback((chamberId) => {
    const audio = chamberWhispersRef.current;
    if (!audio) return;

    window.clearTimeout(whisperStopTimerRef.current);

    const segment = chamberId === 'crossroads'
      ? { start: 0, end: 5 }
      : chamberId === 'scriptorium'
        ? { start: 5.5, end: 11 }
        : null;

    if (!segment) return;

    audio.pause();
    audio.currentTime = segment.start;
    audio.play()?.catch(() => {});
    whisperStopTimerRef.current = window.setTimeout(() => {
      audio.pause();
      audio.currentTime = segment.end;
    }, (segment.end - segment.start) * 1000);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const nextChamber = getChamberFromPath();
      playChamberWhisper(nextChamber.id);
      setActiveChamberId(nextChamber.id);
      if (nextChamber.id !== 'crossroads') setHomeHasSubmitted(true);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [playChamberWhisper]);

  const navigateTo = (nextChamberId) => {
    const nextChamber = CHAMBERS[nextChamberId];
    if (!nextChamber || nextChamber.id === activeChamberId) return;

    if (window.location.pathname !== nextChamber.path) {
      window.history.pushState({}, '', nextChamber.path);
    }

    playChamberWhisper(nextChamber.id);
    if (nextChamber.id !== 'crossroads') setHomeHasSubmitted(true);
    setActiveChamberId(nextChamber.id);
  };


  useEffect(() => () => {
    window.clearTimeout(whisperStopTimerRef.current);
  }, []);

  const shellClassName = useMemo(
    () => [
      'spatial-shell',
      `view-${activeChamberId}`,
      candleLit ? 'is-candle-lit' : '',
      homeHasSubmitted ? 'is-spatial-revealed' : '',
    ].filter(Boolean).join(' '),
    [activeChamberId, candleLit, homeHasSubmitted],
  );

  const spatialStyle = {
    '--grid-columns': GRID_COLUMNS,
    '--grid-rows': GRID_ROWS,
    '--view-x': activeChamber.x - GRID_MIN_X,
    '--view-y': activeChamber.y - GRID_MIN_Y,
    '--crossroads-center-x': `${(CHAMBERS.crossroads.x - GRID_MIN_X + 0.5) * 100}vw`,
    '--crossroads-center-y': `${(CHAMBERS.crossroads.y - GRID_MIN_Y + 0.5) * 100}svh`,
  };

  return (
    <main className={shellClassName} style={spatialStyle} aria-label="Scenic Loop Insanity">
      <div className="spatial-grid">
        <div className="spatial-background" aria-hidden="true">
          <BackgroundLayers includeSigil />
        </div>

        <section
          className="spatial-chamber crossroads-chamber"
          style={{ '--chamber-x': CHAMBERS.crossroads.x - GRID_MIN_X, '--chamber-y': CHAMBERS.crossroads.y - GRID_MIN_Y }}
          aria-label={CHAMBERS.crossroads.ariaLabel}
        >
          <Home
            initialSubmitted={homeHasSubmitted}
            isActive={activeChamberId === 'crossroads'}
            onSubmittedChange={setHomeHasSubmitted}
            onCandleLitChange={setCandleLit}
            onCrossroadsSettled={() => setMapReady(true)}
            onBeginSoundscape={beginRitualSoundscape}
            onSecretDismiss={() => navigateTo('crossroads')}
          />
        </section>

        <section
          className="spatial-chamber scriptorium-chamber"
          style={{ '--chamber-x': CHAMBERS.scriptorium.x - GRID_MIN_X, '--chamber-y': CHAMBERS.scriptorium.y - GRID_MIN_Y }}
          aria-label={CHAMBERS.scriptorium.ariaLabel}
        >
          <Scripture />
        </section>
      </div>

      <audio
        ref={ritualSoundscapeRef}
        src="/audio/ritual-of-the-damned-atmosphere.mp3"
        preload="auto"
        loop
        hidden
      />

      <audio
        ref={chamberWhispersRef}
        src="/audio/cult-whispers.wav"
        preload="auto"
        hidden
      />

      {homeHasSubmitted && mapReady && (
        <RitualMap
          currentChamberId={activeChamberId}
          isHidden={mapHidden}
          animateEntry={!mapHasEntered}
          onMarkEntered={() => setMapHasEntered(true)}
          onToggleHidden={() => setMapHidden((hidden) => !hidden)}
          onNavigate={navigateTo}
        />
      )}
    </main>
  );
}
