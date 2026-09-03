export const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
  </svg>
);

export const ChevronDownIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 20.5s-7.5-4.6-10-9.3C.4 8 1.8 4.5 5.2 3.7c2-.5 4 .3 5.3 2 .4.5.9 1.2 1.5 2.2.6-1 1.1-1.7 1.5-2.2 1.3-1.7 3.3-2.5 5.3-2 3.4.8 4.8 4.3 3.2 7.5-2.5 4.7-10 9.3-10 9.3Z" />
  </svg>
);
