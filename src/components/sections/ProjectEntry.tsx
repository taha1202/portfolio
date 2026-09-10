"use client";

import { useRef, useState } from "react";
import { gsap, useGsapContext } from "@/lib/motion";
import type { Project } from "@/lib/site";

const STATUS_LABEL: Record<Project["status"], string> = {
  shipped: "Shipped",
  active: "In development",
  research: "Research",
};

/**
 * Expanding dossier entry. Collapsed it shows index / title / summary;
 * expanded it reveals the engineering detail and measured outcomes.
 * Height is animated to an explicit measured value, then released to `auto`
 * so reflow at other breakpoints stays correct.
 */
export default function ProjectEntry({ project }: { project: Project }) {
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useGsapContext(root, () => {
    gsap.fromTo(
      root.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.05,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 88%", once: true },
      },
    );
  }, []);

  const toggle = () => {
    const el = panel.current;
    setOpen((v) => !v);
    if (!el) return;

    if (!open) {
      gsap.set(el, { height: "auto", opacity: 1 });
      const full = el.offsetHeight;
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        {
          height: full,
          opacity: 1,
          duration: 0.72,
          ease: "expo.out",
          onComplete: () => gsap.set(el, { height: "auto" }),
        },
      );
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.5, ease: "expo.inOut" });
    }
  };

  return (
    <div ref={root} data-fade className="border-b border-rule">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="group grid w-full grid-cols-1 gap-4 py-8 text-left md:grid-cols-[3.5rem_1fr_auto] md:items-baseline md:gap-8"
      >
        <span className="meta text-ember tabular-nums">{project.index}</span>

        <span className="min-w-0">
          <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="display text-[clamp(1.75rem,4.2vw,3.25rem)] transition-colors duration-500 group-hover:text-ember">
              {project.title}
            </span>
            <span className="meta">{project.kind}</span>
          </span>
          <span className="prose-lede mt-3 block text-[0.9375rem] md:text-base">
            {project.summary}
          </span>
        </span>

        <span className="meta flex items-center gap-4 whitespace-nowrap">
          <span className="tabular-nums">{project.year}</span>
          <span
            className="inline-block transition-transform duration-500"
            style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
            aria-hidden="true"
          >
            +
          </span>
        </span>
      </button>

      <div ref={panel} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <div className="grid grid-cols-1 gap-8 pb-10 md:grid-cols-[3.5rem_1fr] md:gap-8">
          <div aria-hidden="true" className="hidden md:block" />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
            <p className="prose-lede text-[0.9375rem] md:text-base">
              {project.detail}
            </p>

            <div className="space-y-6">
              <dl className="space-y-3">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="flex items-baseline justify-between gap-6 border-b border-rule pb-2"
                  >
                    <dt className="meta">{m.label}</dt>
                    <dd className="font-mono text-sm tabular-nums text-ink">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-wrap gap-x-3 gap-y-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="border border-rule px-2.5 py-1 font-mono text-[0.6875rem] text-ink-soft"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="meta flex items-center gap-2">
                <span
                  className={`inline-block h-[6px] w-[6px] rounded-full ${
                    project.status === "shipped" ? "bg-ember" : "bg-faint"
                  }`}
                />
                {STATUS_LABEL[project.status]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
