"use client";

import { Fragment, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { flags } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: string;
  /** Wrapping element */
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
  className?: string;
  /** "words" (default) or per-character */
  mode?: "words" | "chars";
  stagger?: number;
  /** Delay after trigger, seconds */
  delay?: number;
  /** Wait for the preloader instead of a scroll trigger (hero content) */
  onReady?: boolean;
}

/**
 * Masked text reveal: splits the string into words (or characters), hides
 * them below an overflow mask, and slides them up when scrolled into view.
 * Screen readers get the intact string via aria-label.
 */
export default function Reveal({
  children,
  as = "div",
  className = "",
  mode = "words",
  stagger = 0.05,
  delay = 0,
  onReady = false,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll(".reveal-inner");

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const vars: gsap.TweenVars = {
          yPercent: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger,
          delay,
        };

        if (onReady) {
          gsap.set(targets, { yPercent: 115 });
          const play = () => gsap.to(targets, vars);
          if (flags.ready) {
            play();
          } else {
            window.addEventListener("site:ready", play, { once: true });
            return () => window.removeEventListener("site:ready", play);
          }
        } else {
          gsap.fromTo(
            targets,
            { yPercent: 115 },
            {
              ...vars,
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            }
          );
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(targets, { yPercent: 0 });
      });
    }, el);

    return () => ctx.revert();
  }, [stagger, delay, onReady]);

  const words = children.split(" ");
  // Cast to a single concrete tag so TS doesn't distribute over the union.
  const Tag = as as "div";

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={`reveal ${className}`}
      aria-label={children}
    >
      {words.map((word, wi) => (
        <Fragment key={wi}>
          {mode === "chars" ? (
            <span className="inline-block whitespace-nowrap" aria-hidden>
              {word.split("").map((char, ci) => (
                <span key={ci} className="reveal-mask">
                  <span className="reveal-inner">{char}</span>
                </span>
              ))}
            </span>
          ) : (
            <span className="reveal-mask" aria-hidden>
              <span className="reveal-inner">{word}</span>
            </span>
          )}
          {wi < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </Tag>
  );
}
