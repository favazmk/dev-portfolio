"use client";

import { useEffect, useRef } from "react";

/**
 * A band of oversized type that runs continuously and answers the scroll: it
 * speeds up with scroll velocity, flips direction when you scroll back up,
 * and leans into the motion. Static (and still fully readable) for
 * reduced-motion users.
 */
export default function KineticMarquee({
  items,
  reverse = false,
  onDark = false,
}: {
  items: readonly string[];
  reverse?: boolean;
  onDark?: boolean;
}) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || !document.documentElement.classList.contains("motion")) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
          const base = reverse ? -1 : 1;
          let direction = base;
          /* Two identical halves: wrapping at -50% is seamless */
          const loop = gsap.to(el, {
            xPercent: -50,
            duration: 38,
            ease: "none",
            repeat: -1,
          });
          /* Start deep into the repeats so it can also run backwards */
          loop.totalTime(loop.duration() * 200);
          loop.timeScale(base);

          const skew = gsap.quickTo(el, "skewX", { duration: 0.5, ease: "power3.out" });

          ScrollTrigger.create({
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            onUpdate(self) {
              const v = self.getVelocity();
              if (self.direction !== 0) direction = base * self.direction;
              const boost = 1 + Math.min(Math.abs(v) / 280, 6);
              gsap.to(loop, { timeScale: direction * boost, duration: 0.2, overwrite: true });
              gsap.to(loop, { timeScale: direction, duration: 1.2, delay: 0.2, ease: "power2.out" });
              skew(gsap.utils.clamp(-10, 10, v / -220));
            },
            onToggle(self) {
              if (self.isActive) loop.play();
              else loop.pause();
            },
          });
        }, el);

        cleanup = () => ctx.revert();
      }
    );

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [reverse]);

  const run = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center">
          <span className={`marquee-word ${i % 2 ? "marquee-outline" : ""}`}>{item}</span>
          <span className="marquee-star" aria-hidden="true">
            ✶
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`marquee overflow-hidden py-8 sm:py-12 ${onDark ? "on-dark" : ""}`}
      role="marquee"
      aria-label={items.join(", ")}
    >
      <div ref={track} className="flex w-max will-change-transform">
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}
