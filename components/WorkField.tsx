"use client";

import { useEffect, useRef } from "react";

/**
 * The case-study cover's WebGL layer: a wireframe lattice — the system's
 * hairlines pulled into three dimensions — that is driven by scroll rather
 * than time. As the cover leaves the viewport the lattice tilts away and a
 * ridge of the signal red travels across it, so the header reads as a surface
 * being folded shut behind the title.
 *
 * Kindred to the hero field (same grey, same single red, same lifecycle) but
 * deliberately its own motif: lines not points, scroll not pointer. Three.js
 * is imported on mount, rendering pauses off screen or on a hidden tab, and
 * reduced-motion visitors get one still frame.
 */

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  varying float vHeat;
  varying float vDepth;

  void main() {
    vec3 p = position;

    /* A travelling ridge whose crest is pushed across the sheet by scroll */
    float crest = uScroll * 2.0 - 1.0;
    float ridge = smoothstep(0.55, 0.0, abs((p.x * 0.09) - crest));

    float wave =
      sin(p.x * 0.5 + uTime * 0.4) * 0.3 +
      sin(p.z * 0.7 - uTime * 0.3) * 0.24;
    p.y += wave + ridge * 1.4;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    vHeat = ridge;
    vDepth = smoothstep(30.0, 4.0, -mv.z);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uSignal;
  uniform float uOpacity;
  varying float vHeat;
  varying float vDepth;

  void main() {
    vec3 col = mix(uBase, uSignal, vHeat);
    gl_FragColor = vec4(col, (0.34 + vHeat * 0.55) * vDepth * uOpacity);
  }
`;

export default function WorkField({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dispose: (() => void) | undefined;
    let cancelled = false;

    import("three").then((THREE) => {
      if (cancelled) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
      } catch {
        return; // No WebGL: the cover reads fine without it.
      }

      const pixelRatio = Math.min(window.devicePixelRatio, 1.75);
      renderer.setPixelRatio(pixelRatio);
      renderer.setClearColor(0x000000, 0);
      el.appendChild(renderer.domElement);
      renderer.domElement.setAttribute("aria-hidden", "true");

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 60);
      camera.position.set(0, 3.2, 10);
      camera.lookAt(0, -0.4, -2);

      /* Build a grid of points, then wire each to its right/forward neighbour
         so the surface is drawn purely as hairlines. */
      const cols = window.innerWidth < 640 ? 44 : 72;
      const rows = window.innerWidth < 640 ? 30 : 44;
      const positions = new Float32Array(cols * rows * 3);
      const idx = (i: number, j: number) => i * rows + j;
      for (let i = 0, k = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++, k += 3) {
          positions[k] = (i / (cols - 1) - 0.5) * 34;
          positions[k + 1] = 0;
          positions[k + 2] = (j / (rows - 1)) * -24 + 7;
        }
      }
      const indices: number[] = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (i < cols - 1) indices.push(idx(i, j), idx(i + 1, j));
          if (j < rows - 1) indices.push(idx(i, j), idx(i, j + 1));
        }
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setIndex(indices);

      const uniforms = {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uOpacity: { value: 0 },
        uBase: { value: new THREE.Color("#8e8d87") },
        uSignal: { value: new THREE.Color("#e8352b") },
      };
      const material = new THREE.ShaderMaterial({
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        uniforms,
        transparent: true,
        depthWrite: false,
      });
      const lattice = new THREE.LineSegments(geometry, material);
      scene.add(lattice);

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = el;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      /* Scroll progress across the cover: 0 while it fills the top of the
         viewport, 1 once it has scrolled a viewport-height out of the way. */
      const progress = () => {
        const rect = el.getBoundingClientRect();
        return Math.max(0, Math.min(1, -rect.top / (rect.height || 1)));
      };

      const render = () => renderer.render(scene, camera);

      if (reduced) {
        uniforms.uOpacity.value = 1;
        uniforms.uTime.value = 4;
        uniforms.uScroll.value = 0.1;
        lattice.rotation.x = -0.05;
        render();
        dispose = () => {
          ro.disconnect();
          geometry.dispose();
          material.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
        return;
      }

      let visible = true;
      let raf = 0;
      const start = performance.now();
      let last = start;
      let scroll = 0;
      const loop = () => {
        raf = requestAnimationFrame(loop);
        if (!visible || document.hidden) return;
        const now = performance.now();
        const t = (now - start) / 1000;
        const ease = 1 - Math.exp(-((now - last) / 1000) * 5);
        last = now;
        uniforms.uTime.value = t;
        uniforms.uOpacity.value = Math.min(1, t / 1.4);
        /* Scroll is eased so Lenis' momentum reads as a smooth fold */
        scroll += (progress() - scroll) * ease;
        uniforms.uScroll.value = scroll;
        lattice.rotation.x = -scroll * 0.5;
        lattice.rotation.z = scroll * 0.12;
        render();
      };
      loop();

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      io.observe(el);

      dispose = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return <div ref={host} aria-hidden="true" className={`work-field ${className}`} />;
}
