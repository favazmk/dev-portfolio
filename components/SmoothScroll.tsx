"use client";

import { useEffect } from "react";

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger and the
 * scroll position never disagree by a frame. Loaded dynamically so it never
 * blocks first paint, and skipped entirely for reduced-motion users.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let destroy: (() => void) | undefined;
    let cancelled = false;

    Promise.all([
      import("lenis"),
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        /* Anchor links glide too; Lenis honours each section's scroll-mt */
        anchors: true,
      });

      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      destroy = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      destroy?.();
    };
  }, []);

  return null;
}
