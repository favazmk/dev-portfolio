/**
 * Tiny shared mutable store — written by the scroll/pointer listeners,
 * read every frame by the 3D scene and progress UI. Deliberately not React
 * state: these values change every frame and must not trigger re-renders.
 */
export const scrollState = {
  /** 0..1 across the whole page */
  progress: 0,
  /** px/frame, signed */
  velocity: 0,
  /** normalized -1..1 pointer position (0,0 on touch devices) */
  pointer: { x: 0, y: 0 },
};

export const flags = {
  /** true once the preloader has finished */
  ready: false,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let lenis: any = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setLenis(instance: any) {
  lenis = instance;
}

export function scrollToId(id: string) {
  const el = document.querySelector(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
