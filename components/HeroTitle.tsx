"use client";

import { useEffect, useRef } from "react";

/**
 * The hero statement as kinetic type. Characters rise out of their own
 * baseline on load; afterwards the weight of each letter answers the pointer
 * — Geist is a variable face, so letters near the cursor thin out and recover
 * as it moves on. On scroll the lines drift apart (data-drift, MotionLayer).
 */
export default function HeroTitle({ lines }: { lines: readonly string[] }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const h1 = ref.current;
    if (!h1 || !document.documentElement.classList.contains("motion")) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/SplitText"), document.fonts.ready]).then(
      ([{ gsap }, { SplitText }]) => {
        if (cancelled) return;
        gsap.registerPlugin(SplitText);

        const ctx = gsap.context(() => {
          const split = SplitText.create(h1.querySelectorAll(".hero-line"), {
            type: "chars",
            charsClass: "hero-char",
          });
          h1.setAttribute("data-split-ready", "");

          gsap.from(split.chars, {
            yPercent: 120,
            rotate: 8,
            duration: 1.3,
            ease: "expo.out",
            stagger: 0.035,
            delay: 0.2,
          });

          if (!window.matchMedia("(pointer: fine)").matches) return;

          const chars = split.chars as HTMLElement[];
          const setters = chars.map((c) =>
            gsap.quickTo(c, "fontWeight", { duration: 0.5, ease: "power3.out" })
          );
          const section = h1.closest("section") ?? h1;

          const onMove = (e: PointerEvent) => {
            chars.forEach((c, i) => {
              const r = c.getBoundingClientRect();
              const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
              const pull = Math.max(0, 1 - d / 260);
              setters[i](600 - pull * 420);
            });
          };
          const onLeave = () => setters.forEach((set) => set(600));

          section.addEventListener("pointermove", onMove as EventListener);
          section.addEventListener("pointerleave", onLeave);
          cleanup = () => {
            section.removeEventListener("pointermove", onMove as EventListener);
            section.removeEventListener("pointerleave", onLeave);
          };
        }, h1);

        const prev = cleanup;
        cleanup = () => {
          prev?.();
          ctx.revert();
        };
      }
    );

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <h1 ref={ref} data-hero-title="" className="display text-[clamp(3.3rem,15vw,11rem)]">
      {lines.map((line, i) => (
        <span key={line} data-drift={i % 2 ? 1 : -1} className="hero-line">
          {line}
        </span>
      ))}
    </h1>
  );
}
