"use client";

import { useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import { site } from "@/config/site";

export default function Contact() {
  const clicks = useRef(0);
  const [egg, setEgg] = useState(false);

  const socials = [
    { label: "GitHub", href: site.socials.github },
    { label: "LinkedIn", href: site.socials.linkedin },
    { label: "X", href: site.socials.x },
  ].filter((s) => s.href);

  const onCopyrightClick = () => {
    clicks.current += 1;
    if (clicks.current >= 5) {
      clicks.current = 0;
      setEgg(true);
      window.setTimeout(() => setEgg(false), 4200);
    }
  };

  return (
    <section
      id="contact"
      className="relative flex min-h-svh flex-col justify-between px-6 pt-28 md:pt-40"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent2">
          05 — Contact
        </p>
        <Reveal
          as="h2"
          className="font-display text-5xl leading-[1.02] font-bold tracking-tight md:text-8xl"
        >
          Let&apos;s build
        </Reveal>
        <Reveal
          as="h2"
          delay={0.15}
          className="font-display text-gradient text-5xl leading-[1.02] font-bold tracking-tight md:text-8xl"
        >
          something great.
        </Reveal>

        <p className="mt-8 max-w-md text-sm leading-relaxed text-white/80 md:text-base">
          Have a project in mind, a role to fill, or just want to talk shop?
          My inbox is open.
        </p>

        <div className="mt-10">
          <Magnetic strength={0.25}>
            <a
              href={`mailto:${site.email}`}
              className="glass inline-flex items-center gap-3 rounded-full border-accent/40 px-8 py-4 font-display text-sm font-semibold text-white transition-colors hover:border-accent2/60 md:text-base"
            >
              <span
                aria-hidden
                className="h-2 w-2 animate-pulse rounded-full bg-accent2"
              />
              {site.email}
            </a>
          </Magnetic>
        </div>

        <ul className="mt-10 flex items-center gap-7">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-xs uppercase tracking-[0.25em] text-white/50 transition-colors hover:text-accent2"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <footer className="mx-auto mt-20 flex w-full max-w-5xl items-center justify-between border-t border-white/10 py-6 pb-24 text-[11px] text-white/40 md:pb-6">
        <p>
          <button
            onClick={onCopyrightClick}
            aria-label="Copyright"
            className="cursor-default select-none"
          >
            ©
          </button>{" "}
          {new Date().getFullYear()} {site.name}
        </p>
        <p className="hidden sm:block">Next.js · Three.js · GSAP</p>
      </footer>

      <div
        role="status"
        className={`glass fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full px-5 py-3 text-xs text-white/85 transition-all duration-500 md:bottom-8 ${
          egg
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        🛰️ You found the easter egg — let&apos;s build something weird together.
      </div>
    </section>
  );
}
