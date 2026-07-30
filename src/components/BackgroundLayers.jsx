export function BackgroundLayers({ includeSigil = true, quiet = false }) {
  return (
    <>
      <div className="base-darkness" aria-hidden="true" />
      <div className="intro-glow" aria-hidden="true" />
      {includeSigil && <div className={quiet ? 'sigil-pattern quiet' : 'sigil-pattern'} aria-hidden="true" />}
      {includeSigil && <div className={quiet ? 'sigil-warmth quiet' : 'sigil-warmth'} aria-hidden="true" />}
      {includeSigil && !quiet && <div className="reveal-wave" aria-hidden="true" />}
      {includeSigil && !quiet && (
        <div className="crossroads-shadows" aria-hidden="true">
          <span className="crossroads-shadow crossroads-shadow-one" />
          <span className="crossroads-shadow crossroads-shadow-two" />
        </div>
      )}
      <div className="tape-damage" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="analog-noise" aria-hidden="true" />
    </>
  );
}
