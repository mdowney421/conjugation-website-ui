"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Button from "../../components/Button";

const STORAGE_KEY = "dialectrek-watch-intro-seen";

// One-time onboarding modal for the Watch tab -- shown the first time a
// browser hits this page, never again after that (tracked in localStorage,
// same pattern as the session id in session.ts).
const WatchIntroModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem(STORAGE_KEY)) {
      setIsOpen(true);
    }
  }, []);

  const dismiss = () => {
    window.localStorage.setItem(STORAGE_KEY, "1");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  // Portalled to the body rather than rendered inline -- the page-load
  // animation on .page leaves it with a (no-op) transform, which makes it a
  // containing block for position: fixed descendants and would pin this
  // overlay to the page's scrolled height instead of the viewport.
  return createPortal(
    <div className="watch-intro-overlay" onClick={dismiss}>
      <div
        className="watch-intro-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="watch-intro-heading"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="watch-intro-close"
          aria-label="Close"
          onClick={dismiss}
        >
          &times;
        </button>
        <h3 id="watch-intro-heading">We Need Your Help!</h3>
        <p>
          This section is new so the difficuly rankings may be innaccurate.
          Here's what you can do:
        </p>
        <p>1. Watch lots of videos</p>
        <p>2. Rank their difficulty under the video</p>
        <p>
          That's it! Every ranking makes it more accurate for you and everyone
          else.
        </p>
        <Button onClick={dismiss}>Got it</Button>
      </div>
    </div>,
    document.body,
  );
};

export default WatchIntroModal;
