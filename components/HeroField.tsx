"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's WebGL layer: a field of points laid out like a sheet of graph
 * paper seen at an angle, rippling slowly. Points near the pointer rise and
 * pick up the signal red — the only colour the system allows — so the surface
 * answers the cursor without ever competing with the type over it.
 *
 * Three.js is imported on mount, rendering stops while the canvas is off
 * screen or the tab is hidden, and reduced-motion users get one still frame.
 */

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uScroll;
  uniform float uPixelRatio;
  varying float vHeat;
  varying float vDepth;

  void main() {
    vec3 p = position;

    float wave =
      sin(p.x * 0.55 + uTime * 0.6) * 0.28 +
      sin(p.z * 0.8 - uTime * 0.45) * 0.22 +
      sin((p.x + p.z) * 0.35 + uTime * 0.3) * 0.35;

    float d = distance(p.xz, uPointer);
    float heat = smoothstep(2.6, 0.0, d);
    p.y += wave + heat * 1.1 - uScroll * 1.6;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (2.6 + heat * 3.4) * uPixelRatio * (9.0 / -mv.z);

    vHeat = heat;
    vDepth = smoothstep(26.0, 4.0, -mv.z);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uSignal;
  uniform float uOpacity;
  varying float vHeat;
  varying float vDepth;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    if (dot(c, c) > 0.25) discard;
    vec3 col = mix(uBase, uSignal, vHeat);
    gl_FragColor = vec4(col, (0.38 + vHeat * 0.62) * vDepth * uOpacity);
  }
`;

export default function HeroField({ className = "" }: { className?: string }) {
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
        renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
      } catch {
        return; // No WebGL: the hero reads fine without it.
      }

      const pixelRatio = Math.min(window.devicePixelRatio, 1.75);
      renderer.setPixelRatio(pixelRatio);
      renderer.setClearColor(0x000000, 0);
      el.appendChild(renderer.domElement);
      renderer.domElement.setAttribute("aria-hidden", "true");

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 60);
      camera.position.set(0, 3.4, 9);
      camera.lookAt(0, 0, -2);

      /* The sheet: a grid of points, denser on wider screens */
      const cols = window.innerWidth < 640 ? 70 : 120;
      const rows = window.innerWidth < 640 ? 46 : 64;
      const positions = new Float32Array(cols * rows * 3);
      for (let i = 0, k = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++, k += 3) {
          positions[k] = (i / (cols - 1) - 0.5) * 30;
          positions[k + 1] = 0;
          positions[k + 2] = (j / (rows - 1)) * -22 + 6;
        }
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const uniforms = {
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2(99, 99) },
        uScroll: { value: 0 },
        uPixelRatio: { value: pixelRatio },
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
      scene.add(new THREE.Points(geometry, material));

      /* Pointer → a point on the sheet's plane */
      const ray = new THREE.Raycaster();
      const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
      const ndc = new THREE.Vector2();
      const hit = new THREE.Vector3();
      const target = new THREE.Vector2(99, 99);
      const onPointer = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
        ray.setFromCamera(ndc, camera);
        if (ray.ray.intersectPlane(plane, hit)) target.set(hit.x, hit.z);
      };
      const onLeave = () => target.set(99, 99);

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = el;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      const render = () => renderer.render(scene, camera);

      if (reduced) {
        uniforms.uOpacity.value = 1;
        uniforms.uTime.value = 4;
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

      const section = el.closest("section") ?? el;
      section.addEventListener("pointermove", onPointer as EventListener);
      section.addEventListener("pointerleave", onLeave);

      let visible = true;
      let raf = 0;
      const start = performance.now();
      let last = start;
      const loop = () => {
        raf = requestAnimationFrame(loop);
        if (!visible || document.hidden) return;
        const now = performance.now();
        const t = (now - start) / 1000;
        /* Frame-rate independent easing toward the pointer */
        const ease = 1 - Math.exp(-((now - last) / 1000) * 6);
        last = now;
        uniforms.uTime.value = t;
        uniforms.uOpacity.value = Math.min(1, t / 1.6);
        uniforms.uPointer.value.lerp(target, ease);
        const rect = el.getBoundingClientRect();
        uniforms.uScroll.value = Math.max(0, Math.min(1, -rect.top / rect.height));
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
        section.removeEventListener("pointermove", onPointer as EventListener);
        section.removeEventListener("pointerleave", onLeave);
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

  return <div ref={host} aria-hidden="true" className={`hero-field ${className}`} />;
}
