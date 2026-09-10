"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, useGsapSetup, prefersReducedMotion } from "@/lib/motion";

/**
 * Drives Lenis from the GSAP ticker rather than its own RAF loop, so smooth
 * scrolling and ScrollTrigger share a single frame clock. Without this they
 * drift and scroll-linked animation jitters.
 */
export default function SmoothScroll() {
  useGsapSetup();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
