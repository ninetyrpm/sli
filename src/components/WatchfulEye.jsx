import { useState } from 'react';
import { createPortal } from 'react-dom';

export function WatchfulEye({ isOpen, onDismiss }) {
  const [mediaState, setMediaState] = useState('loading');
  if (!isOpen) return null;

  const vision = (
    <section className="watchful-eye" aria-label="A hidden presence has awakened">
      <div className="watchful-eye-smoke" aria-hidden="true">
        <span className="smoke-bank smoke-bank-one" />
        <span className="smoke-bank smoke-bank-two" />
        <span className="smoke-bank smoke-bank-three" />
      </div>

      <div className="watchful-eye-darkness" aria-hidden="true" />

      <div className="watchful-eye-vision">
        <div className="watchful-eye-frame">
          {mediaState === 'loading' && <div className="watchful-eye-loading" aria-hidden="true" />}
          {mediaState === 'error' && <p className="watchful-eye-error">IT HAS TURNED AWAY</p>}
          <video
            className={`watchful-eye-video ${mediaState === 'ready' ? 'is-ready' : ''}`}
            src="/media/watchful-eye.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-label="A single eye looks around"
            onCanPlay={() => setMediaState('ready')}
            onError={() => setMediaState('error')}
          />
          <button
            className="watchful-eye-trigger"
            type="button"
            onClick={onDismiss}
            aria-label="Return to The Crossroads"
          />
        </div>
      </div>
    </section>
  );

  // Render outside the translated spatial grid so fixed positioning is relative
  // to the browser viewport rather than the full multi-chamber canvas.
  return createPortal(vision, document.body);
}
