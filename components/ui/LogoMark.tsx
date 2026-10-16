import Image from "next/image";

/**
 * A client's own mark.
 *
 * Every file under /public/logos is stored as a white silhouette with an alpha
 * channel, whatever colour the brand actually uses. That is what lets a set
 * collected from fifteen different sources read as one designed wall: on a dark
 * surface the file is used as-is, on a light one it is simply inverted to ink.
 *
 * Brands whose mark we don't hold fall back to their name set in the display
 * face, which is a legitimate lockup in this system rather than a hole.
 */
export default function LogoMark({
  src,
  name,
  onDark = false,
  className = "",
}: {
  src: string;
  name: string;
  /** True when the surface behind the mark is ink. */
  onDark?: boolean;
  className?: string;
}) {
  if (!src) {
    return (
      <span
        className={`display text-center text-[clamp(0.95rem,2.2vw,1.35rem)] leading-tight ${className}`}
      >
        {name}
      </span>
    );
  }

  return (
    <span className={`relative block h-full w-full ${className}`}>
      <Image
        src={src}
        alt={name}
        fill
        sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 180px"
        className={`logo-mark ${onDark ? "" : "logo-invert"}`}
      />
    </span>
  );
}
