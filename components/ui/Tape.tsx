/**
 * A strip of washi tape. Purely decorative — always aria-hidden.
 * `at` positions it relative to the nearest positioned ancestor.
 */
export default function Tape({
  className = "",
  rotate = -6,
  width = 92,
  height = 26,
  tint,
}: {
  className?: string;
  rotate?: number;
  width?: number;
  height?: number;
  /** Optional color wash over the kraft default */
  tint?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`tape ${className}`}
      style={{
        width,
        height,
        transform: `rotate(${rotate}deg)`,
        ...(tint ? { backgroundImage: "none", background: tint } : null),
      }}
    />
  );
}
