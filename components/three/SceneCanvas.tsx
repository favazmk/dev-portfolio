"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

/**
 * Mounts the WebGL scene behind the page content. Always renders a gradient
 * backdrop; if WebGL is unavailable the gradient alone is the fallback.
 */
export default function SceneCanvas() {
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      setWebgl(
        !!(canvas.getContext("webgl2") || canvas.getContext("webgl"))
      );
    } catch {
      setWebgl(false);
    }
  }, []);

  return (
    <>
      <div
        aria-hidden
        className="fixed inset-0 -z-20 bg-night"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 80% 10%, rgba(139,92,246,0.16), transparent 60%), radial-gradient(ellipse 50% 45% at 10% 85%, rgba(34,211,238,0.10), transparent 60%)",
        }}
      />
      {webgl && <Scene />}
    </>
  );
}
