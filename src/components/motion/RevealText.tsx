"use client";

import { useEffect, useRef } from "react";
import { gsap, useGsapSetup, prefersReducedMotion } from "@/lib/motion";

type Props = {
  text: string;
  className?: string;
  /** Delay before the reveal starts, in seconds. */
  delay?: number;
  /** Animate on mount instead of waiting for scroll. */
  immediate?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

/**
 * Word-level mask reveal. Splitting on words (not characters) keeps the DOM
 * light and preserves native text wrapping and copy-paste; each word rides up
 * from behind an overflow-hidden line box.
 */
export default function RevealText({
  text,
  className = "",
  delay = 0,
  immediate = false,
  as: Tag = "span",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  useGsapSetup();

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const words = el.querySelectorAll<HTMLElement>("[data-word] > span");
    if (!words.length) return;

    const tween = gsap.fromTo(
      words,
      { yPercent: 118, rotate: 2.5 },
      {
        yPercent: 0,
        rotate: 0,
        duration: 1.15,
        ease: "expo.out",
        stagger: 0.055,
        delay,
        ...(immediate
          ? {}
          : {
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                once: true,
              },
            }),
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [text, delay, immediate]);

  const words = text.split(" ");

  return (
    <Tag ref={ref as never} className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          data-word
          className="inline-block overflow-hidden align-bottom"
        >
          <span className="inline-block will-change-transform">
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
