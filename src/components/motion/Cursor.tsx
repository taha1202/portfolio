"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Blend-mode dot cursor with magnetic attraction to [data-magnetic] targets.
 * quickTo gives us an interruptible spring without allocating a tween per
 * pointermove — important on integrated graphics.
 *
 * Disabled entirely on coarse pointers and under reduced-motion.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || prefersReducedMotion()) return;

    document.body.classList.add("has-cursor");
    gsap.set(dot, { width: 9, height: 9, xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(dot, "x", { duration: 0.42, ease: "power3" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.42, ease: "power3" });

    let hovering: HTMLElement | null = null;

    const onMove = (e: PointerEvent) => {
      const target =
        (e.target as HTMLElement | null)?.closest<HTMLElement>(
          "[data-magnetic], a, button",
        ) ?? null;

      if (target !== hovering) {
        hovering = target;
        gsap.to(dot, {
          width: target ? 42 : 9,
          height: target ? 42 : 9,
          duration: 0.4,
          ease: "expo.out",
        });
      }

      if (target) {
        // Pull toward the element's centre, damped by distance.
        const r = target.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        xTo(e.clientX + (cx - e.clientX) * 0.34);
        yTo(e.clientY + (cy - e.clientY) * 0.34);
      } else {
        xTo(e.clientX);
        yTo(e.clientY);
      }
    };

    const onLeave = () => gsap.to(dot, { opacity: 0, duration: 0.25 });
    const onEnter = () => gsap.to(dot, { opacity: 1, duration: 0.25 });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
