"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/**
 * Registers GSAP plugins exactly once per client session.
 * Calling gsap.registerPlugin repeatedly is safe but wasteful, and doing it
 * at module scope breaks SSR — so it is centralised here.
 */
export function useGsapSetup() {
  if (typeof window !== "undefined" && !registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Scoped GSAP context bound to a ref. Every animation created inside `setup`
 * is reverted on unmount — this is what prevents ScrollTrigger leaks across
 * client-side navigations.
 */
export function useGsapContext(
  scope: React.RefObject<HTMLElement | null>,
  setup: (ctx: gsap.Context) => void,
  deps: React.DependencyList = [],
) {
  useGsapSetup();

  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context((self) => setup(self), el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export { gsap, ScrollTrigger };
