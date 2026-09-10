"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Canvas film grain, tiled via CSS. Regenerated at ~8fps rather than 60 —
 * the texture reads as alive but costs almost nothing on integrated graphics.
 * Opacity and blend mode are driven by CSS vars so the grain adapts per theme
 * (multiply on paper, screen on charcoal).
 */
export default function Grain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || prefersReducedMotion()) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const SIZE = 160;
    canvas.width = SIZE;
    canvas.height = SIZE;

    const image = ctx.createImageData(SIZE, SIZE);
    const buf = image.data;

    const draw = () => {
      for (let i = 0; i < buf.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        buf[i] = v;
        buf[i + 1] = v;
        buf[i + 2] = v;
        buf[i + 3] = 255;
      }
      ctx.putImageData(image, 0, 0);
    };

    let raf = 0;
    let last = 0;
    const INTERVAL = 125; // ms

    const loop = (t: number) => {
      if (t - last > INTERVAL) {
        draw();
        last = t;
      }
      raf = requestAnimationFrame(loop);
    };

    draw();
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={ref}
      className="grain h-full w-full"
      aria-hidden="true"
    />
  );
}
