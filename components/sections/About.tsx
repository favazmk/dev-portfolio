"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";
import { site } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

function Stat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = numberRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const counter = { v: 0 };
        gsap.to(counter, {
          v: value,
          duration: 1.6,
          ease: "power2.out",
          snap: { v: 1 },
          onUpdate: () => {
            el.textContent = `${Math.round(counter.v)}${suffix}`;
          },
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        el.textContent = `${value}${suffix}`;
      });
    }, el);

    return () => ctx.revert();
  }, [value, suffix]);

  return (
    <div className="flex flex-col gap-1">
      <span
        ref={numberRef}
        className="font-display text-4xl font-bold text-gradient md:text-5xl"
      >
        {value}
        {suffix}
      </span>
      <span className="text-xs uppercase tracking-[0.2em] text-white/50">
        {label}
      </span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-4xl">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent2">
          01 — About
        </p>
        <div className="flex flex-col gap-6">
          {site.bio.map((line, i) => (
            <Reveal
              key={i}
              as="p"
              stagger={0.012}
              className={
                i === 0
                  ? "font-display text-2xl leading-snug font-medium md:text-4xl"
                  : "max-w-2xl text-base leading-relaxed text-white/75 md:text-lg"
              }
            >
              {line}
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 border-t border-white/10 pt-10">
          {site.stats.map((stat) => (
            <Stat key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
