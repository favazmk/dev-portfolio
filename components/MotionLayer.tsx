"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Every scroll-driven and pointer-driven animation on the site, wired from
 * data attributes so the sections can stay server components:
 *
 *   data-split="chars|words"   masked kinetic type, rises in on scroll
 *   data-scrub-words            words light up as the paragraph scrolls past
 *   data-assemble               characters fly in from scatter, scrubbed
 *   data-count                  numeric value counts up on enter
 *   data-clip                   image wipes up from its baseline
 *   data-parallax="12"          child drifts by ±n% across the viewport
 *   data-zoom                   cover image settles from 1.18× as you scroll
 *   data-drift="-1|1"           line slides sideways as the hero leaves
 *   data-magnetic               element leans toward the pointer
 *   data-tilt="7"               panel rotates in 3D toward the pointer
 *   data-scramble               label text decodes itself on hover
 *   data-progress               scaleX bound to page progress
 *   .rule / .rule-signal        hairlines draw from the left
 *
 * Re-runs per route and reverts cleanly through gsap.context. Reduced-motion
 * users never reach any of it: the inline boot script in the layout doesn't
 * add the `motion` class, and this bails before importing GSAP.
 */
export default function MotionLayer() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("motion")) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("gsap/SplitText"),
      import("gsap/ScrambleTextPlugin"),
      document.fonts.ready,
    ]).then(
      ([{ gsap }, { ScrollTrigger }, { SplitText }, { ScrambleTextPlugin }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

        const finePointer = window.matchMedia("(pointer: fine)").matches;
        const listeners: Array<() => void> = [];
        const on = <K extends keyof HTMLElementEventMap>(
          el: HTMLElement,
          type: K,
          fn: (e: HTMLElementEventMap[K]) => void
        ) => {
          el.addEventListener(type, fn);
          listeners.push(() => el.removeEventListener(type, fn));
        };
        const all = <T extends HTMLElement = HTMLElement>(sel: string) =>
          gsap.utils.toArray<T>(sel);

        const ctx = gsap.context(() => {
          /* ── Hairlines draw in ─────────────────────────────── */
          ScrollTrigger.batch(".rule, .rule-signal", {
            start: "top 92%",
            once: true,
            onEnter: (els) =>
              gsap.to(els, {
                "--draw": 1,
                duration: 1.1,
                ease: "expo.out",
                stagger: 0.06,
              }),
          });

          /* ── Kinetic headings ──────────────────────────────── */
          all("[data-split]").forEach((el) => {
            const byWord = el.dataset.split === "words";
            const onLoad = el.hasAttribute("data-split-load");
            SplitText.create(el, {
              type: byWord ? "lines,words" : "lines,words,chars",
              mask: "lines",
              linesClass: "kt-line",
              autoSplit: true,
              onSplit(self) {
                el.setAttribute("data-split-ready", "");
                const targets = byWord ? self.words : self.chars;
                return gsap.from(targets, {
                  yPercent: 115,
                  rotate: byWord ? 0 : 6,
                  duration: byWord ? 0.9 : 1.05,
                  ease: "expo.out",
                  stagger: byWord ? 0.05 : 0.022,
                  delay: onLoad ? Number(el.dataset.splitDelay ?? 0.15) : 0,
                  scrollTrigger: onLoad
                    ? undefined
                    : { trigger: el, start: "top 88%", once: true },
                });
              },
            });
          });

          /* ── Words light up while reading ──────────────────── */
          all("[data-scrub-words]").forEach((el) => {
            SplitText.create(el, {
              type: "words",
              autoSplit: true,
              onSplit(self) {
                return gsap.fromTo(
                  self.words,
                  { opacity: 0.16 },
                  {
                    opacity: 1,
                    ease: "none",
                    stagger: 0.1,
                    scrollTrigger: {
                      trigger: el,
                      start: "top 85%",
                      end: "bottom 45%",
                      scrub: true,
                    },
                  }
                );
              },
            });
          });

          /* ── Characters assemble from scatter ──────────────── */
          all("[data-assemble]").forEach((el) => {
            SplitText.create(el, {
              type: "words,chars",
              autoSplit: true,
              onSplit(self) {
                el.setAttribute("data-split-ready", "");
                return gsap.from(self.chars, {
                  x: () => gsap.utils.random(-160, 160),
                  y: () => gsap.utils.random(-120, 120),
                  rotate: () => gsap.utils.random(-60, 60),
                  opacity: 0,
                  ease: "power3.out",
                  stagger: { each: 0.012, from: "random" },
                  scrollTrigger: {
                    trigger: el,
                    start: "top 95%",
                    end: "top 45%",
                    scrub: 0.8,
                  },
                });
              },
            });
          });

          /* ── Count-up numerals ─────────────────────────────── */
          all("[data-count]").forEach((el) => {
            const match = el.textContent?.match(/^(\D*)(\d+)(.*)$/);
            if (!match) return;
            const [, pre, num, post] = match;
            const state = { v: 0 };
            el.textContent = `${pre}0${post}`;
            gsap.to(state, {
              v: Number(num),
              duration: 1.6,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
              onUpdate: () => {
                el.textContent = `${pre}${Math.round(state.v)}${post}`;
              },
            });
          });

          /* ── Image wipes and parallax ──────────────────────── */
          all("[data-clip]").forEach((el) => {
            gsap.fromTo(
              el,
              { clipPath: "inset(100% 0% 0% 0%)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.25,
                ease: "expo.inOut",
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              }
            );
          });

          all("[data-parallax]").forEach((el) => {
            const amount = Number(el.dataset.parallax || 10);
            const inner = el.firstElementChild as HTMLElement | null;
            if (!inner) return;
            gsap.set(inner, { scale: 1 + amount / 50 });
            gsap.fromTo(
              inner,
              { yPercent: -amount },
              {
                yPercent: amount,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          });

          all("[data-zoom]").forEach((el) => {
            gsap.fromTo(
              el,
              { scale: 1.18 },
              {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: el.parentElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          });

          /* ── Hero lines drift apart on exit ────────────────── */
          all("[data-drift]").forEach((el) => {
            const section = el.closest("section") ?? el;
            gsap.to(el, {
              xPercent: Number(el.dataset.drift) * 18,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
          });

          /* ── Page progress hairline ────────────────────────── */
          all("[data-progress]").forEach((el) => {
            gsap.fromTo(
              el,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: document.body,
                  start: "top top",
                  end: "bottom bottom",
                  scrub: 0.3,
                },
              }
            );
          });

          /* ── Pointer micro-interactions ────────────────────── */
          if (finePointer) {
            all("[data-magnetic]").forEach((el) => {
              const strength = Number(el.dataset.magnetic || 0.35);
              const toX = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.45)" });
              const toY = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.45)" });
              on(el, "pointermove", (e) => {
                const r = el.getBoundingClientRect();
                toX((e.clientX - (r.left + r.width / 2)) * strength);
                toY((e.clientY - (r.top + r.height / 2)) * strength);
              });
              on(el, "pointerleave", () => {
                toX(0);
                toY(0);
              });
            });

            /* ── 3D tilt toward the pointer ──────────────────── */
            all("[data-tilt]").forEach((el) => {
              const max = Number(el.dataset.tilt || 7);
              gsap.set(el, { transformPerspective: 900, transformOrigin: "center" });
              const rx = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3.out" });
              const ry = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3.out" });
              on(el, "pointermove", (e) => {
                const r = el.getBoundingClientRect();
                const px = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
                const py = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
                rx(gsap.utils.clamp(-max, max, -py * max));
                ry(gsap.utils.clamp(-max, max, px * max));
              });
              on(el, "pointerleave", () => {
                rx(0);
                ry(0);
              });
            });

            all("[data-scramble]").forEach((el) => {
              /* Scramble the first text node only, so icons/arrows survive */
              const target =
                el.querySelector<HTMLElement>("[data-scramble-text]") ?? el;
              const text = target.textContent ?? "";
              on(el, "pointerenter", () => {
                gsap.to(target, {
                  duration: 0.55,
                  scrambleText: {
                    text,
                    chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/",
                    speed: 0.6,
                  },
                  overwrite: true,
                });
              });
            });
          }
        });

        root.setAttribute("data-motion-ready", "");
        /* Fonts, images and late layout shift trigger positions */
        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);

        cleanup = () => {
          window.removeEventListener("load", refresh);
          listeners.forEach((off) => off());
          ctx.revert();
        };
      }
    );

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [pathname]);

  return null;
}
