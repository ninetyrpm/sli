import { CHAMBER_LIST } from '../config/chambers.js';

export function RitualMap({ currentChamberId, isHidden, onToggleHidden, onNavigate }) {
  if (isHidden) {
    return (
      <button
        className="ritual-map-tab"
        type="button"
        onClick={onToggleHidden}
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
          <button type="button" onClick={onToggleHidden} aria-label="Fold away the ritual map">
            Fold
          </button>
        </div>

        <div className="ritual-map-drawing" aria-hidden="true">
          <span className="map-line" />
          <span className="map-scratch map-scratch-one">?</span>
          <span className="map-scratch map-scratch-two">×</span>
        </div>

        <nav className="ritual-map-links" aria-label="Known chambers">
          {CHAMBER_LIST.map((chamber) => {
            const isCurrent = chamber.id === currentChamberId;
            return (
              <button
                key={chamber.id}
                type="button"
                className={isCurrent ? 'is-current' : ''}
                onClick={() => onNavigate(chamber.id)}
                aria-current={isCurrent ? 'page' : undefined}
                disabled={isCurrent}
              >
                <span className="map-node" aria-hidden="true" />
                {chamber.mapLabel}
              </button>
            );
          })}
        </nav>

        <p className="ritual-map-note">Other passages remain unmarked.</p>
      </div>
    </aside>
  );
}
