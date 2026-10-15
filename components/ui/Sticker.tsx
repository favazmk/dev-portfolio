import type { ReactNode } from "react";

const TONES = {
  marker: "bg-marker",
  sky: "bg-sky text-white",
  grass: "bg-grass text-white",
  bubble: "bg-bubble text-white",
  tangerine: "bg-tangerine text-white",
  lilac: "bg-lilac text-white",
  paper: "bg-white",
} as const;

export type Tone = keyof typeof TONES;

/**
 * A die-cut sticker chip — the colored tags in the hero and skills cluster.
 */
export default function Sticker({
  children,
  tone = "marker",
  rotate = 0,
  small = false,
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  rotate?: number;
  small?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`chip ${small ? "chip-sm" : ""} ${TONES[tone]} ${className}`}
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      {children}
    </span>
  );
}
