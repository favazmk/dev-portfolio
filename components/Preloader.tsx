"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { flags } from "@/lib/scroll";
import { site } from "@/config/site";

export default function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    html.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const finish = () => {
      flags.ready = true;
      window.dispatchEvent(new Event("site:ready"));
      html.style.overflow = "";
      setDone(true);
    };

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      finish();
      return () => {
        html.style.overflow = "";
      };
    }

    const counter = { value: 0 };
    const tl = gsap.timeline();
    tl.to(counter, {
      value: 100,
      duration: 1.4,
      ease: "power2.inOut",
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.textContent = String(Math.round(counter.value));
        }
      },
    })
      .to(numberRef.current, {
        yPercent: -110,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
      })
      .to(overlayRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: "power4.inOut",
        onComplete: finish,
      });

    return () => {
      tl.kill();
      html.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden
      className="fixed inset-0 z-[100] flex items-end justify-between bg-night p-6 md:p-12"
    >
      <p className="font-display text-xs uppercase tracking-[0.35em] text-white/50">
        {site.name} — Portfolio
      </p>
      <div className="overflow-hidden">
        <span
          ref={numberRef}
          className="font-display block text-7xl font-bold text-white md:text-9xl"
        >
          0
        </span>
      </div>
    </div>
  );
}
