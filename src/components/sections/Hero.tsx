"use client";

import { useRef } from "react";
import RevealText from "@/components/motion/RevealText";
import { gsap, useGsapContext } from "@/lib/motion";
import { site } from "@/lib/site";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGsapContext(root, () => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    tl.fromTo(
      "[data-hero-rule]",
      { scaleX: 0 },
      { scaleX: 1, duration: 1.5, stagger: 0.09 },
      0.15,
    )
      .fromTo(
        "[data-hero-meta]",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 1.0, stagger: 0.07 },
        0.35,
      )
      .fromTo(
        "[data-hero-lede]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 1.1 },
        0.95,
      );

    // Headline drifts up slightly slower than the page — parallax without
    // pinning, which keeps scroll cheap on integrated graphics.
    gsap.to("[data-hero-inner]", {
      yPercent: -11,
      ease: "none",
      scrollTrigger: {
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
      },
    });
  }, []);

  return (
    <div
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end px-[var(--edge)] pb-14 pt-32"
    >
      <div data-hero-inner className="mx-auto w-full max-w-[1440px]">
        <div
          data-hero-rule
          className="hairline mb-8 w-full origin-left"
          aria-hidden="true"
        />

        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3">
          <span data-hero-meta className="meta">
            {site.location}
          </span>
          <span data-hero-meta className="meta">
            {site.focus}
          </span>
          <span data-hero-meta className="meta flex items-center gap-2 text-ember">
            <span className="inline-block h-[6px] w-[6px] rounded-full bg-ember" />
            {site.available}
          </span>
        </div>

        <h1 className="display text-[clamp(3rem,12.5vw,11.5rem)]">
          <RevealText text="Muhammad" immediate delay={0.1} as="span" />
          <RevealText
            text="Taha"
            immediate
            delay={0.22}
            as="span"
            className="block italic text-ember"
          />
        </h1>

        <div
          data-hero-rule
          className="hairline my-10 w-full origin-left"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <p data-hero-lede className="prose-lede">
            I build systems where the interesting part is what happens after
            something fails — agent runtimes that resume mid-flight, extraction
            pipelines that run unattended, models that fuse signals no single
            classifier catches alone.
          </p>

          <a
            href="#work"
            data-hero-lede
            data-magnetic
            className="meta group inline-flex items-center gap-3 text-ink"
          >
            Selected work
            <span className="inline-block transition-transform duration-500 group-hover:translate-y-1">
              ↓
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
