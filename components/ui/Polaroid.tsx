import Image from "next/image";
import Tape from "./Tape";

/**
 * A taped instant-photo frame. Renders a real image when `src` is set,
 * otherwise a labelled placeholder so the layout is final before art lands.
 */
export default function Polaroid({
  src,
  alt,
  caption,
  rotate = -3,
  width = 230,
  className = "",
  tapeRotate = -8,
  priority = false,
}: {
  src?: string;
  alt: string;
  caption?: string;
  rotate?: number;
  width?: number;
  className?: string;
  tapeRotate?: number;
  priority?: boolean;
}) {
  return (
    <figure
      className={`relative bg-white p-2.5 pb-9 shadow-[0_10px_24px_-12px_rgba(0,0,0,0.5)] ${className}`}
      style={{ width, transform: `rotate(${rotate}deg)` }}
    >
      <Tape
        className="-top-3 left-1/2 -translate-x-1/2"
        rotate={tapeRotate}
        width={Math.round(width * 0.42)}
      />
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={`${width}px`}
            className="object-cover"
            priority={priority}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[repeating-linear-gradient(45deg,#e4e1d6_0_8px,#eceadf_8px_16px)]">
            <span className="px-2 text-center font-mono text-[10px] uppercase tracking-wide text-ink-soft">
              {alt}
            </span>
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="absolute inset-x-0 bottom-2 text-center font-hand text-sm text-ink-soft">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
