/**
 * Hand-drawn marginalia: arrows, circles, underlines. All decorative.
 */

export function ArrowCurve({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 60"
      fill="none"
      className={className}
    >
      <path
        d="M4 10c26 34 72 44 110 26"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M100 28l14 8-7 13"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Underline({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 14"
      fill="none"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M3 9c38-6 84-8 140-4 20 1 38 3 55 6"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CircleScribble({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 110"
      fill="none"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M112 6C58 4 10 24 7 54c-3 31 48 51 106 50 54-1 100-22 100-50S166 8 112 6z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Star({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>
      <path
        fill="currentColor"
        d="M12 1.6l2.1 6.9 7.2.1-5.8 4.3 2.2 6.9-5.7-4.4-5.7 4.4 2.2-6.9L2.7 8.6l7.2-.1z"
      />
    </svg>
  );
}

export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 20"
      fill="none"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M2 12c18-14 36 14 54 0s36 14 54 0 36 14 54 0 36 14 54 0 36 14 54 0"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
