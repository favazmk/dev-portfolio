"use client";

import { useEffect, useRef, useState } from "react";
import { scrollState, scrollToId } from "@/lib/scroll";
import { site } from "@/config/site";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Journey" },
  { id: "contact", label: "Contact" },
];

const ICONS: Record<string, React.ReactNode> = {
  hero: (
    <path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" />
  ),
  about: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
    </>
  ),
  skills: (
    <path d="M12 2l2.4 7.2H22l-6 4.6 2.3 7.2-6.3-4.4-6.3 4.4L8 13.8 2 9.2h7.6z" />
  ),
  projects: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M9 20V9" />
    </>
  ),
  experience: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  contact: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
};

export default function Nav() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    let raf = 0;
    const tick = () => {
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${scrollState.progress})`;
      }
      setScrolled(scrollState.progress > 0.01);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const go = (id: string) => scrollToId(`#${id}`);

  return (
    <>
      {/* Scroll progress hairline */}
      <div
        ref={barRef}
        aria-hidden
        className="fixed top-0 left-0 z-50 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-accent to-accent2"
      />

      {/* Desktop top bar */}
      <header
        className={`fixed top-0 left-0 z-40 hidden w-full items-center justify-between px-8 py-5 transition-colors duration-500 md:flex ${
          scrolled ? "bg-night/60 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <button
          onClick={() => go("hero")}
          className="font-display text-lg font-bold tracking-widest text-white"
          aria-label="Back to top"
        >
          {site.initials}
          <span className="text-accent">.</span>
        </button>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-7">
            {SECTIONS.slice(1).map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => go(id)}
                  className={`text-xs uppercase tracking-[0.2em] transition-colors ${
                    active === id
                      ? "text-accent2"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Mobile bottom pill */}
      <nav
        aria-label="Primary"
        className="glass fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-0.5 rounded-full px-2 py-1.5 md:hidden"
      >
        {SECTIONS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => go(id)}
            aria-label={label}
            aria-current={active === id ? "true" : undefined}
            className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
              active === id
                ? "bg-accent/25 text-accent2"
                : "text-white/55"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {ICONS[id]}
            </svg>
          </button>
        ))}
      </nav>
    </>
  );
}
