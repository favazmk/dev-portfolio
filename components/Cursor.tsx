"use client";

import { useEffect, useRef } from "react";

/** Disc size per state, as a fraction of the full label disc */
const SCALE: Record<string, number> = { label: 1, link: 0.42, idle: 0.16 };

/**
 * A red registration mark that trails the pointer. It swells over anything
 * clickable and, over elements carrying data-cursor, opens into a disc that
 * names the action ("View", "Mail"). The native cursor stays — this only
 * annotates it. Fine pointers only; never rendered for reduced motion.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = dot.current;
    const text = label.current;
    if (!el || !text) return;
    if (
      !document.documentElement.classList.contains("motion") ||
      !window.matchMedia("(pointer: fine)").matches
    )
      return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    import("gsap").then(({ gsap }) => {
      if (cancelled) return;
      el.style.display = "flex";
      gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0 });

      const x = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
      const y = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
      let state = "";

      const setState = (next: string, word = "") => {
        if (next === state) return;
        state = next;
        text.textContent = word;
        gsap.to(el, {
          scale: SCALE[next] ?? 0,
          duration: 0.45,
          ease: "expo.out",
        });
        el.classList.toggle("is-label", next === "label");
      };

      const read = (t: Element | null) => {
        const labelled = t?.closest<HTMLElement>("[data-cursor]");
        if (labelled) setState("label", labelled.dataset.cursor);
        else if (t?.closest("a, button, [role=button]")) setState("link");
        else setState("idle");
      };
      let px = -1;
      let py = -1;
      const onMove = (e: PointerEvent) => {
        px = e.clientX;
        py = e.clientY;
        x(px);
        y(py);
        read(e.target as Element | null);
      };
      /* Content moves under a still pointer while scrolling */
      const onScroll = () => {
        if (px >= 0 && state !== "hidden") read(document.elementFromPoint(px, py));
      };
      const onLeave = () => setState("hidden");
      const onDown = () => gsap.to(el, { scale: "-=0.08", duration: 0.15, yoyo: true, repeat: 1 });

      window.addEventListener("pointermove", onMove);
      document.addEventListener("pointerleave", onLeave);
      window.addEventListener("pointerdown", onDown);
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanup = () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerleave", onLeave);
        window.removeEventListener("pointerdown", onDown);
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div ref={dot} className="cursor" aria-hidden="true">
      <span ref={label} className="label" />
    </div>
  );
}
