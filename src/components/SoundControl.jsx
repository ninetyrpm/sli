export function SoundControl({ muted, onToggle }) {
  return (
    <button
      className={`sound-control ${muted ? 'is-muted' : ''}`}
      type="button"
      onClick={onToggle}
      aria-pressed={muted}
      aria-label={muted ? 'Turn sound on' : 'Mute all sound'}
    >
      <svg className="speaker-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 9v6h4l5 4V5L8 9H4Z" />
        {muted ? (
          <path className="speaker-icon-stroke" d="m17 9 4 4m0-4-4 4" />
        ) : (
          <path className="speaker-icon-stroke" d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" />
        )}
      </svg>
      <span>{muted ? 'MUTED' : 'SOUND ON'}</span>
    </button>
  );
}
