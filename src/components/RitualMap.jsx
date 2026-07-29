export function RitualMap({
  currentChamberId,
  isHidden,
  animateEntry,
  onToggleHidden,
  onMarkEntered,
  onNavigate,
}) {
  const navigate = (chamberId) => {
    if (chamberId !== currentChamberId) onNavigate(chamberId);
  };

  if (isHidden) {
    return (
      <button
        className={`ritual-map-tab ${animateEntry ? 'is-entering' : ''}`}
        type="button"
        onClick={() => {
          onMarkEntered?.();
          onToggleHidden();
        }}
        aria-label="Unfold the ritual map"
      >
        Unfold map
      </button>
    );
  }

  return (
    <aside className="ritual-map" aria-label="Ritual map of the known chambers">
      <div className="ritual-map-paper">
        <div className="ritual-map-heading">
          <span>Map of the Known Ways</span>
          <button type="button" onClick={onToggleHidden} aria-label="Fold the ritual map">
            Fold
          </button>
        </div>

        <div className="ritual-map-compass">
          <span className="ritual-path ritual-path-up is-unknown" aria-hidden="true" />
          <span className="ritual-path ritual-path-down is-unknown" aria-hidden="true" />
          <span className="ritual-path ritual-path-left is-unknown" aria-hidden="true" />
          <span className="ritual-path ritual-path-right is-known" aria-hidden="true" />

          <span className="ritual-unknown ritual-unknown-up" aria-hidden="true">?</span>
          <span className="ritual-unknown ritual-unknown-down" aria-hidden="true">?</span>
          <span className="ritual-unknown ritual-unknown-left" aria-hidden="true">?</span>

          <button
            className={`ritual-chamber-label ritual-crossroads-label ${currentChamberId === 'crossroads' ? 'is-current' : ''}`}
            type="button"
            onClick={() => navigate('crossroads')}
            disabled={currentChamberId === 'crossroads'}
            aria-current={currentChamberId === 'crossroads' ? 'page' : undefined}
          >
            The Crossroads
          </button>

          <div className="ritual-stake" aria-hidden="true">
            <span className="stake-post" />
            <span className="stake-sigil stake-sigil-up">⌃</span>
            <span className="stake-sigil stake-sigil-right">◇</span>
            <span className="stake-sigil stake-sigil-down">⌄</span>
            <span className="stake-sigil stake-sigil-left">◈</span>
          </div>

          <button
            className={`ritual-chamber-label ritual-scriptorium-label ${currentChamberId === 'scriptorium' ? 'is-current' : ''}`}
            type="button"
            onClick={() => navigate('scriptorium')}
            disabled={currentChamberId === 'scriptorium'}
            aria-current={currentChamberId === 'scriptorium' ? 'page' : undefined}
          >
            The Scriptorium
          </button>
        </div>

        <p className="ritual-map-note">The other ways have not yet revealed themselves.</p>
      </div>
    </aside>
  );
}
