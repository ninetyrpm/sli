export function SkipButton({ onSkip }) {
  return (
    <button className="skip-button" type="button" aria-label="Skip transmission" onClick={onSkip}>
      →
    </button>
  );
}
