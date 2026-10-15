"use client";

import { useEffect } from "react";

/**
 * Lenis smooth scrolling, loaded only for pointer users who have not asked for
 * reduced motion. Imported dynamically so it never blocks first paint.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let destroy: (() => void) | undefined;
    let raf = 0;

    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      destroy = () => {
        cancelAnimationFrame(raf);
        lenis.destroy();
      };
    });

    return () => destroy?.();
  }, []);

  return null;
}
