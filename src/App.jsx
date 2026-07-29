import { useEffect, useMemo, useState } from 'react';
import { Home } from './pages/Home.jsx';
import { Scripture } from './pages/Scripture.jsx';
import { BackgroundLayers } from './components/BackgroundLayers.jsx';

function getViewFromPath() {
  return window.location.pathname.replace(/\/$/, '') === '/scripture' ? 'scripture' : 'home';
}

export function App() {
  const [view, setView] = useState(() => getViewFromPath());
  const [homeHasSubmitted, setHomeHasSubmitted] = useState(() => getViewFromPath() === 'scripture');

  useEffect(() => {
    const handlePopState = () => {
      const nextView = getViewFromPath();
      setView(nextView);

      if (nextView === 'scripture') {
        setHomeHasSubmitted(true);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (nextView) => {
    const nextPath = nextView === 'scripture' ? '/scripture' : '/';
    const currentPath = window.location.pathname || '/';

    if (currentPath !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }

    if (nextView === 'scripture') {
      setHomeHasSubmitted(true);
    }

    setView(nextView);
  };

  const shellClassName = useMemo(
    () => [
      'spatial-shell',
      view === 'scripture' ? 'view-scripture' : 'view-home',
      homeHasSubmitted ? 'is-spatial-revealed' : '',
    ]
      .filter(Boolean)
      .join(' '),
    [view, homeHasSubmitted],
  );

  return (
    <main className={shellClassName} aria-label="Scenic Loop Insanity">
      <div className="spatial-grid">
        <div className="spatial-background" aria-hidden="true">
          <BackgroundLayers includeSigil />
        </div>

        <section className="spatial-chamber home-chamber" aria-label="Transmission chamber">
          <Home
            initialSubmitted={homeHasSubmitted}
            onSubmittedChange={setHomeHasSubmitted}
            onReadScripture={() => navigateTo('scripture')}
          />
        </section>

        <section className="spatial-chamber scripture-chamber" aria-label="Scripture chamber">
          <Scripture onReturnHome={() => navigateTo('home')} />
        </section>
      </div>
    </main>
  );
}
