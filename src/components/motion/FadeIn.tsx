"use client";

import { useEffect, useRef } from "react";
import { gsap, useGsapSetup, prefersReducedMotion } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Distance travelled on entry, in px. */
  y?: number;
  delay?: number;
  /** Stagger direct children instead of animating the wrapper as one unit. */
  stagger?: boolean;
};

export default function FadeIn({
  children,
  className = "",
  y = 26,
  delay = 0,
  stagger = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useGsapSetup();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(stagger ? el.children : el, { opacity: 1, y: 0 });
      return;
    }

    const targets = stagger ? Array.from(el.children) : el;

    const tween = gsap.fromTo(
      targets,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "expo.out",
        delay,
        stagger: stagger ? 0.09 : 0,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [y, delay, stagger]);

  return (
    <div ref={ref} data-fade className={className}>
      {children}
    </div>
  );
}
