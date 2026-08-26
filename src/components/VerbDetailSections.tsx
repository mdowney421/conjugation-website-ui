"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// A Past -> Present -> Future line pinned to the viewport (not the page),
// so it's always visible while the tables it runs alongside scroll past.
// The dot marks how far through that past-to-future span the reader
// currently is, tracking the vertical center of the viewport against the
// bounds of the tense list.
const TenseSpine = ({ progress }: { progress: number }) => (
  <div className="tense-spine" aria-hidden="true">
    <div className="tense-spine-line" />
    <div
      className="tense-spine-indicator"
      style={{ top: `${progress * 100}%` }}
    />
    <span className="tense-spine-label tense-spine-label-past">Past</span>
    <span className="tense-spine-label tense-spine-label-present">Present</span>
    <span className="tense-spine-label tense-spine-label-future">Future</span>
  </div>
);

const VerbDetailSections = ({ children }: { children: ReactNode }) => {
  const [spineProgress, setSpineProgress] = useState(0);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const measure = () => {
      ticking = false;
      const el = sectionsRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const raw = (viewportCenter - rect.top) / rect.height;
      setSpineProgress(Math.min(1, Math.max(0, raw)));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div className="verb-detail-layout">
      <TenseSpine progress={spineProgress} />
      <div className="verb-detail-sections" ref={sectionsRef}>
        {children}
      </div>
    </div>
  );
};

export default VerbDetailSections;
