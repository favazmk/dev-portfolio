"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import { scrollToId, flags } from "@/lib/scroll";
import { site } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Secondary elements fade in once the preloader clears.
        const items = fadeRef.current
          ? Array.from(fadeRef.current.children)
          : [];
        gsap.set(items, { opacity: 0, y: 24 });
        const play = () =>
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.12,
            delay: 0.5,
          });
        if (flags.ready) play();
        else window.addEventListener("site:ready", play, { once: true });

        // Content drifts up + fades as you scroll past the hero.
        gsap.to(sectionRef.current!.querySelector(".hero-content"), {
          yPercent: -18,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom 35%",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-svh items-center justify-center overflow-hidden"
    >
      <div className="hero-content flex flex-col items-center px-6 text-center">
        <Reveal
          as="p"
          onReady
          delay={0.35}
          className="mb-5 text-xs uppercase tracking-[0.4em] text-accent2 md:text-sm"
        >
          {site.role}
        </Reveal>

        <Reveal
          as="h1"
          mode="chars"
          onReady
          delay={0.45}
          stagger={0.045}
          className="font-display text-[clamp(3.2rem,15vw,11rem)] leading-[0.95] font-bold tracking-tight uppercase"
        >
          {site.name}
        </Reveal>

        <div ref={fadeRef} className="mt-7 flex flex-col items-center">
          <p className="max-w-md text-sm leading-relaxed text-white/80 md:max-w-lg md:text-base">
            {site.tagline}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <button
                onClick={() => scrollToId("#projects")}
                className="rounded-full bg-gradient-to-r from-accent to-accent2 px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03] active:scale-95"
              >
                View my work
              </button>
            </Magnetic>
            <Magnetic>
              <button
                onClick={() => scrollToId("#contact")}
                className="glass rounded-full px-7 py-3.5 text-sm font-semibold text-white/85 transition-colors hover:text-white"
              >
                Get in touch
              </button>
            </Magnetic>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute bottom-20 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-8"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
          Scroll
        </span>
        <div className="h-10 w-px overflow-hidden bg-white/10">
          <div className="scroll-hint-dot h-3 w-px bg-accent2" />
        </div>
      </div>
    </section>
  );
}
