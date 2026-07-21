"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";
import { site } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

/** Loose scatter positions (percent) for the desktop cluster. */
const POSITIONS = [
  { x: 50, y: 40 },
  { x: 27, y: 26 },
  { x: 71, y: 24 },
  { x: 15, y: 52 },
  { x: 37, y: 66 },
  { x: 62, y: 60 },
  { x: 84, y: 46 },
  { x: 25, y: 82 },
  { x: 55, y: 87 },
  { x: 78, y: 76 },
  { x: 43, y: 12 },
];

export default function Skills() {
  const clusterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const chips = clusterRef.current?.querySelectorAll(".skill-chip");
          if (!chips) return;

          gsap.from(chips, {
            opacity: 0,
            scale: 0.6,
            duration: 0.9,
            ease: "back.out(1.7)",
            stagger: 0.06,
            scrollTrigger: {
              trigger: clusterRef.current,
              start: "top 75%",
              once: true,
            },
          });

          // Gentle continuous drift, staggered per chip.
          chips.forEach((chip, i) => {
            gsap.to(chip, {
              y: `+=${10 + (i % 4) * 5}`,
              duration: 2.4 + (i % 5) * 0.35,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: i * 0.15,
            });
          });
        }
      );

      mm.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          const items = gridRef.current?.querySelectorAll("li");
          if (!items) return;
          gsap.from(items, {
            opacity: 0,
            y: 26,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 82%",
              once: true,
            },
          });
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent2">
          02 — Skills
        </p>
        <Reveal
          as="h2"
          className="font-display text-4xl font-bold tracking-tight md:text-6xl"
        >
          Tools I build with
        </Reveal>

        {/* Desktop: floating cluster */}
        <div
          ref={clusterRef}
          aria-hidden
          className="relative mt-8 hidden h-[60vh] min-h-[420px] lg:block"
        >
          {site.skills.map((skill, i) => {
            const pos = POSITIONS[i % POSITIONS.length];
            return (
              <span
                key={skill}
                className="skill-chip glass absolute rounded-full px-6 py-3 font-display text-sm font-medium whitespace-nowrap text-white/85 transition-colors hover:border-accent/60 hover:text-white"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                data-cursor
              >
                {skill}
              </span>
            );
          })}
        </div>

        {/* Mobile / tablet: animated grid (also the accessible list) */}
        <ul
          ref={gridRef}
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:sr-only"
        >
          {site.skills.map((skill) => (
            <li
              key={skill}
              className="glass rounded-xl px-4 py-3.5 text-center font-display text-sm font-medium text-white/85"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
