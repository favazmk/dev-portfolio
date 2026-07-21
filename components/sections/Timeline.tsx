"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";
import { site } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The rail draws itself as the section scrolls through the viewport.
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 75%",
              end: "bottom 45%",
              scrub: true,
            },
          }
        );

        listRef.current?.querySelectorAll("li").forEach((item) => {
          gsap.from(item, {
            opacity: 0,
            x: 32,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 85%", once: true },
          });
        });
      });
    }, listRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-4xl">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent2">
          04 — Journey
        </p>
        <Reveal
          as="h2"
          className="font-display mb-14 text-4xl font-bold tracking-tight md:text-6xl"
        >
          The road so far
        </Reveal>

        <div className="relative">
          <div
            aria-hidden
            className="absolute top-1 bottom-1 left-[5px] w-px bg-white/10"
          />
          <div
            ref={lineRef}
            aria-hidden
            className="absolute top-1 bottom-1 left-[5px] w-px origin-top scale-y-0 bg-gradient-to-b from-accent to-accent2"
          />

          <ol ref={listRef} className="flex flex-col gap-12">
            {site.timeline.map((item) => (
              <li key={item.title} className="relative pl-10">
                <span
                  aria-hidden
                  className="absolute top-1.5 left-0 h-[11px] w-[11px] rounded-full border-2 border-accent bg-night"
                />
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent2">
                  {item.period}
                </p>
                <h3 className="font-display mt-2 text-xl font-bold md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
                  {item.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
