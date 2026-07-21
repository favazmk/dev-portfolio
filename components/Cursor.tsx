"use client";

import { useEffect, useState } from "react";

/**
 * Desktop-only custom cursor: a dot that tracks the pointer and a trailing
 * ring that scales up over interactive elements. Never rendered on touch.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const dot = document.getElementById("cursor-dot")!;
    const ring = document.getElementById("cursor-ring")!;
    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement;
      targetScale = t.closest("a, button, [data-cursor]") ? 2.4 : 1;
    };

    const tick = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      scale += (targetScale - scale) * 0.18;
      dot.style.transform = `translate(${x - 3}px, ${y - 3}px)`;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        id="cursor-dot"
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[95] h-1.5 w-1.5 rounded-full bg-accent2"
      />
      <div
        id="cursor-ring"
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[95] h-9 w-9 rounded-full border border-accent/60 mix-blend-difference"
      />
    </>
  );
}
