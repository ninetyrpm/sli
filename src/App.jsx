import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Home } from './pages/Home.jsx';
import { Scripture } from './pages/Scripture.jsx';
import { BackgroundLayers } from './components/BackgroundLayers.jsx';
import { RitualMap } from './components/RitualMap.jsx';
import { SoundControl } from './components/SoundControl.jsx';
import { CHAMBERS, CHAMBER_LIST, getChamberFromPath } from './config/chambers.js';

const GRID_MIN_X = Math.min(...CHAMBER_LIST.map((chamber) => chamber.x));
const GRID_MAX_X = Math.max(...CHAMBER_LIST.map((chamber) => chamber.x));
const GRID_MIN_Y = Math.min(...CHAMBER_LIST.map((chamber) => chamber.y));
const GRID_MAX_Y = Math.max(...CHAMBER_LIST.map((chamber) => chamber.y));
const GRID_COLUMNS = GRID_MAX_X - GRID_MIN_X + 1;
const GRID_ROWS = GRID_MAX_Y - GRID_MIN_Y + 1;
const NORMAL_AMBIENCE_VOLUME = 0.58;
const DUCKED_AMBIENCE_VOLUME = 0.40;

// Provisional cue boundaries. Replace these after the source recordings are
// reviewed and exact audible start/end points are documented.
const CHAMBER_WHISPER_CUES = {
  crossroads: { start: 0, end: 5 },
  scriptorium: { start: 5.5, end: 11 },
};

export function App() {
  const initialChamber = getChamberFromPath();
  const [activeChamberId, setActiveChamberId] = useState(() => initialChamber.id);
  const [homeHasSubmitted, setHomeHasSubmitted] = useState(() => initialChamber.id !== 'crossroads');
  const [mapHidden, setMapHidden] = useState(true);
  const [mapReady, setMapReady] = useState(() => initialChamber.id !== 'crossroads');
  const [mapHasEntered, setMapHasEntered] = useState(() => initialChamber.id !== 'crossroads');
  const [candleLit, setCandleLit] = useState(() => initialChamber.id !== 'crossroads');
  const [soundMuted, setSoundMuted] = useState(false);
  const [watchfulEyeOpen, setWatchfulEyeOpen] = useState(false);
  const ritualSoundscapeRef = useRef(null);
  const chamberWhispersRef = useRef(null);
  const whisperStopTimerRef = useRef(null);
  const duckRestoreTimerRef = useRef(null);
  const ambienceFadeFrameRef = useRef(null);

  const activeChamber = CHAMBERS[activeChamberId] ?? CHAMBERS.crossroads;

  const setAmbienceVolume = useCallback((volume, fadeMs = 350) => {
    const audio = ritualSoundscapeRef.current;
    if (!audio) return;

    if (ambienceFadeFrameRef.current) {
      window.cancelAnimationFrame(ambienceFadeFrameRef.current);
    }

    const start = audio.volume;
    const started = performance.now();
    const step = (now) => {
      const progress = Math.min(1, (now - started) / fadeMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      audio.volume = start + (volume - start) * eased;
      if (progress < 1) {
        ambienceFadeFrameRef.current = window.requestAnimationFrame(step);
      } else {
        ambienceFadeFrameRef.current = null;
      }
    };
    ambienceFadeFrameRef.current = window.requestAnimationFrame(step);
  }, []);

  const duckAmbience = useCallback((durationMs = 1200) => {
    if (soundMuted) return;
    window.clearTimeout(duckRestoreTimerRef.current);
    setAmbienceVolume(DUCKED_AMBIENCE_VOLUME, 260);
    duckRestoreTimerRef.current = window.setTimeout(() => {
      setAmbienceVolume(NORMAL_AMBIENCE_VOLUME, 1500);
    }, durationMs);
  }, [setAmbienceVolume, soundMuted]);

  const beginRitualSoundscape = useCallback(() => {
    const audio = ritualSoundscapeRef.current;
    if (!audio || soundMuted) return;
    audio.loop = true;
    audio.volume = NORMAL_AMBIENCE_VOLUME;
    audio.play()?.catch(() => {});
  }, [soundMuted]);

  const playChamberWhisper = useCallback((chamberId) => {
    const audio = chamberWhispersRef.current;
    if (!audio || soundMuted) return;
    window.clearTimeout(whisperStopTimerRef.current);
    const segment = CHAMBER_WHISPER_CUES[chamberId] ?? null;
    if (!segment) return;
    duckAmbience((segment.end - segment.start) * 1000);
    audio.pause();
    audio.currentTime = segment.start;
    audio.volume = 1;
    audio.play()?.catch(() => {});
    whisperStopTimerRef.current = window.setTimeout(() => {
      audio.pause();
      audio.currentTime = segment.end;
    }, (segment.end - segment.start) * 1000);
  }, [duckAmbience, soundMuted]);

  const toggleSound = () => {
    setSoundMuted((muted) => {
      const next = !muted;
      [ritualSoundscapeRef.current, chamberWhispersRef.current].forEach((audio) => {
        if (audio) audio.muted = next;
      });
      if (!next && homeHasSubmitted) {
        const ambience = ritualSoundscapeRef.current;
        if (ambience) {
          ambience.muted = false;
          ambience.loop = true;
          ambience.volume = NORMAL_AMBIENCE_VOLUME;
          ambience.play()?.catch(() => {});
        }
      }
      return next;
    });
  };

  useEffect(() => {
    const title = watchfulEyeOpen
      ? 'IT SEES ALL'
      : activeChamberId === 'scriptorium'
        ? 'The Scriptorium — Scenic Loop Insanity III'
        : 'Scenic Loop Insanity III';
    document.title = title;
  }, [activeChamberId, watchfulEyeOpen]);

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
    if (window.location.pathname !== nextChamber.path) window.history.pushState({}, '', nextChamber.path);
    playChamberWhisper(nextChamber.id);
    if (nextChamber.id !== 'crossroads') setHomeHasSubmitted(true);
    setActiveChamberId(nextChamber.id);
  };

  useEffect(() => () => {
    window.clearTimeout(whisperStopTimerRef.current);
    window.clearTimeout(duckRestoreTimerRef.current);
    if (ambienceFadeFrameRef.current) window.cancelAnimationFrame(ambienceFadeFrameRef.current);
  }, []);

  const shellClassName = useMemo(() => [
    'spatial-shell', `view-${activeChamberId}`, candleLit ? 'is-candle-lit' : '',
    homeHasSubmitted ? 'is-spatial-revealed' : '',
  ].filter(Boolean).join(' '), [activeChamberId, candleLit, homeHasSubmitted]);

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
        <div className="spatial-background" aria-hidden="true"><BackgroundLayers includeSigil /></div>
        <section className="spatial-chamber crossroads-chamber" style={{ '--chamber-x': CHAMBERS.crossroads.x - GRID_MIN_X, '--chamber-y': CHAMBERS.crossroads.y - GRID_MIN_Y }} aria-label={CHAMBERS.crossroads.ariaLabel}>
          <Home
            initialSubmitted={homeHasSubmitted}
            isActive={activeChamberId === 'crossroads'}
            soundMuted={soundMuted}
            onEffect={duckAmbience}
            onSubmittedChange={setHomeHasSubmitted}
            onCandleLitChange={setCandleLit}
            onCrossroadsSettled={() => setMapReady(true)}
            onBeginSoundscape={beginRitualSoundscape}
            onSecretOpenChange={setWatchfulEyeOpen}
            onSecretDismiss={() => navigateTo('crossroads')}
          />
        </section>
        <section className="spatial-chamber scriptorium-chamber" style={{ '--chamber-x': CHAMBERS.scriptorium.x - GRID_MIN_X, '--chamber-y': CHAMBERS.scriptorium.y - GRID_MIN_Y }} aria-label={CHAMBERS.scriptorium.ariaLabel}>
          <Scripture soundMuted={soundMuted} onEffect={duckAmbience} />
        </section>
      </div>
      <div className="viewport-vignette" aria-hidden="true" />
      <audio ref={ritualSoundscapeRef} src="/audio/ritual-of-the-damned-atmosphere.mp3" preload="auto" loop hidden />
      <audio ref={chamberWhispersRef} src="/audio/cult-whispers.wav" preload="auto" hidden />
      {homeHasSubmitted && <SoundControl muted={soundMuted} onToggle={toggleSound} />}
      {homeHasSubmitted && mapReady && (
        <RitualMap currentChamberId={activeChamberId} isHidden={mapHidden} animateEntry={!mapHasEntered}
          soundMuted={soundMuted} onEffect={duckAmbience} onMarkEntered={() => setMapHasEntered(true)}
          onToggleHidden={() => setMapHidden((hidden) => !hidden)} onNavigate={navigateTo} />
      )}
    </main>
  );
}
