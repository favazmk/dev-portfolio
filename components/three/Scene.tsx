"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { scrollState } from "@/lib/scroll";

/** Accent palette the scene drifts through as you scroll (per section). */
const PALETTE = [
  "#8b5cf6", // hero — violet
  "#6366f1", // about — indigo
  "#22d3ee", // skills — cyan
  "#a78bfa", // projects — light violet
  "#06b6d4", // journey — deep cyan
  "#8b5cf6", // contact — back to violet
].map((c) => new THREE.Color(c));

/** Camera path keyframes: [x, y, z] sampled by overall scroll progress. */
const CAM_STOPS: [number, number, number][] = [
  [0, 0, 9], // hero — facing the blob
  [1.6, -0.4, 7.4], // about — drift right, closer
  [-1.7, -0.9, 6.4], // skills — swing left
  [0.2, -0.5, 5.4], // projects — dive through particles
  [1.0, 0.1, 6.6], // journey — ease out
  [0, 0.2, 10.2], // contact — pull all the way back
];

function sampleColor(p: number, out: THREE.Color) {
  const t = THREE.MathUtils.clamp(p, 0, 1) * (PALETTE.length - 1);
  const i = Math.min(Math.floor(t), PALETTE.length - 2);
  out.copy(PALETTE[i]).lerp(PALETTE[i + 1], t - i);
}

function sampleCamera(p: number, out: THREE.Vector3) {
  const t = THREE.MathUtils.clamp(p, 0, 1) * (CAM_STOPS.length - 1);
  const i = Math.min(Math.floor(t), CAM_STOPS.length - 2);
  const f = t - i;
  const a = CAM_STOPS[i];
  const b = CAM_STOPS[i + 1];
  out.set(
    THREE.MathUtils.lerp(a[0], b[0], f),
    THREE.MathUtils.lerp(a[1], b[1], f),
    THREE.MathUtils.lerp(a[2], b[2], f)
  );
}

function CameraRig() {
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const cam = state.camera;
    sampleCamera(scrollState.progress, target);
    const px = scrollState.pointer.x * 0.55;
    const py = scrollState.pointer.y * 0.35;
    cam.position.x = THREE.MathUtils.damp(cam.position.x, target.x + px, 2.2, delta);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, target.y + py, 2.2, delta);
    cam.position.z = THREE.MathUtils.damp(cam.position.z, target.z, 2.2, delta);
    cam.lookAt(0, target.y * 0.5, 0);
  });

  return null;
}

function Blob({ mobile, reduced }: { mobile: boolean; reduced: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const material = useRef<any>(null);
  const color = useMemo(() => new THREE.Color(), []);

  useFrame((_, delta) => {
    const p = scrollState.progress;
    if (mesh.current) {
      mesh.current.rotation.y += delta * (reduced ? 0.03 : 0.15);
      const s = (mobile ? 1.05 : 1.35) * (1 - p * 0.25);
      mesh.current.scale.setScalar(s);
      mesh.current.position.x = Math.sin(p * Math.PI) * (mobile ? 0.4 : 1.2);
    }
    if (material.current) {
      sampleColor(p, color);
      material.current.color.lerp(color, 0.08);
      if (!reduced) {
        const v = Math.min(Math.abs(scrollState.velocity) * 0.004, 0.25);
        material.current.distort = THREE.MathUtils.damp(
          material.current.distort,
          0.38 + v,
          3,
          delta
        );
      }
    }
  });

  return (
    <Float
      speed={reduced ? 0 : 1.4}
      rotationIntensity={reduced ? 0 : 0.5}
      floatIntensity={reduced ? 0 : 0.9}
    >
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.4, mobile ? 24 : 48]} />
        <MeshDistortMaterial
          ref={material}
          color="#8b5cf6"
          roughness={0.18}
          metalness={0.75}
          distort={reduced ? 0.15 : 0.38}
          speed={reduced ? 0 : 2}
        />
      </mesh>
    </Float>
  );
}

function Rings({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!group.current || reduced) return;
    group.current.rotation.z += delta * 0.08;
    group.current.rotation.x += delta * 0.03;
  });

  return (
    <group ref={group} rotation={[1.1, 0.4, 0]}>
      <mesh>
        <torusGeometry args={[2.7, 0.005, 8, 160]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[0.6, 0.2, 0]}>
        <torusGeometry args={[3.3, 0.004, 8, 160]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function Particles({ count, reduced }: { count: number; reduced: boolean }) {
  const points = useRef<THREE.Points>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const material = useRef<any>(null);
  const color = useMemo(() => new THREE.Color(), []);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Scattered shell around the blob with depth for the camera to travel.
      const r = 3.5 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      arr[i * 3 + 2] = r * Math.cos(phi) * 0.8;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    const p = scrollState.progress;
    if (points.current) {
      if (!reduced) {
        points.current.rotation.y +=
          delta * 0.02 + Math.abs(scrollState.velocity) * 0.00002;
      }
      // Field slides toward the camera mid-page → travelling-through feeling.
      points.current.position.z = Math.sin(p * Math.PI) * 3.5;
    }
    if (material.current) {
      sampleColor(p, color);
      material.current.color.lerp(color, 0.08);
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={material}
        color="#8b5cf6"
        size={0.035}
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Scene() {
  const [mobile, setMobile] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setMobile(
      window.matchMedia("(max-width: 768px), (pointer: coarse)").matches
    );
    setReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    // Pointer parallax (desktop only — stays 0 on touch).
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      scrollState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10" aria-hidden>
      <Canvas
        camera={{ fov: 50, position: [0, 0, 9] }}
        dpr={[1, mobile ? 1.5 : 2]}
        gl={{
          alpha: true,
          antialias: !mobile,
          powerPreference: "high-performance",
        }}
      >
        <fog attach="fog" args={["#0a0a0f", 9, 20]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[4, 3, 4]} intensity={18} color="#8b5cf6" />
        <pointLight position={[-4, -2, 3]} intensity={12} color="#22d3ee" />
        <CameraRig />
        <Blob mobile={mobile} reduced={reduced} />
        <Rings reduced={reduced} />
        <Particles count={mobile ? 900 : 2400} reduced={reduced} />
      </Canvas>
    </div>
  );
}
