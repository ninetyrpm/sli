export function SoundControl({ muted, onToggle }) {
  return (
    <button
      className={`sound-control ${muted ? 'is-muted' : ''}`}
      type="button"
      onClick={onToggle}
      aria-pressed={muted}
      aria-label={muted ? 'Turn sound on' : 'Mute all sound'}
    >
      <span className="speaker-sigil" aria-hidden="true">
        <span className="speaker-sigil-core" />
        <span className="speaker-sigil-wave speaker-sigil-wave-one" />
        <span className="speaker-sigil-wave speaker-sigil-wave-two" />
      </span>
      <span>{muted ? 'MUTED' : 'SOUND ON'}</span>
    </button>
  );
}
