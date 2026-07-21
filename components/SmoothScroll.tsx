"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollState, setLenis } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    console.log(
      "%cFAVAZ MK %c— thanks for peeking under the hood. Source: github.com/favazmk",
      "font-size:20px;font-weight:700;color:#8b5cf6;",
      "font-size:12px;color:#22d3ee;"
    );

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      // Native scrolling only — still track progress for the UI + scene.
      const onScroll = () => {
        const max =
          document.documentElement.scrollHeight - window.innerHeight;
        scrollState.progress = max > 0 ? window.scrollY / max : 0;
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }

    // Smooth wheel scrolling; touch stays native so mobile feels right.
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    setLenis(lenis);

    lenis.on(
      "scroll",
      (e: { scroll: number; limit: number; velocity: number }) => {
        scrollState.progress = e.limit > 0 ? e.scroll / e.limit : 0;
        scrollState.velocity = e.velocity;
        ScrollTrigger.update();
      }
    );

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
