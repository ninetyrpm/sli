export function BackgroundLayers({ includeSigil = true, quiet = false }) {
  return (
    <>
      <div className="base-darkness" aria-hidden="true" />
      <div className="intro-glow" aria-hidden="true" />
      {includeSigil && <div className={quiet ? 'sigil-pattern quiet' : 'sigil-pattern'} aria-hidden="true" />}
      {includeSigil && <div className={quiet ? 'sigil-warmth quiet' : 'sigil-warmth'} aria-hidden="true" />}
      <div className="tape-damage" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="analog-noise" aria-hidden="true" />
    </>
  );
}
