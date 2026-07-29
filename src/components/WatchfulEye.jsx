export function WatchfulEye({ isOpen, onDismiss }) {
  if (!isOpen) return null;

  return (
    <section className="watchful-eye" aria-label="A hidden presence has awakened">
      <div className="watchful-eye-smoke" aria-hidden="true">
        <span className="smoke-bank smoke-bank-one" />
        <span className="smoke-bank smoke-bank-two" />
        <span className="smoke-bank smoke-bank-three" />
      </div>

      <div className="watchful-eye-darkness" aria-hidden="true" />

      <div className="watchful-eye-vision">
        <video
          className="watchful-eye-video"
          src="/media/watchful-eye.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-label="A single eye looks around"
        />
        <button
          className="watchful-eye-trigger"
          type="button"
          onClick={onDismiss}
          aria-label="Return to The Crossroads"
        />
      </div>
    </section>
  );
}
