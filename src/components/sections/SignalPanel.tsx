"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGsapContext } from "@/lib/motion";

/**
 * A live local clock plus a scanning index readout. Occupies the hero's
 * right column with something real and time-varying rather than invented
 * metrics — the honesty matters, and the movement anchors the composition.
 */

const ROWS = [
  { k: "focus", v: "distributed systems" },
  { k: "current", v: "agent runtimes" },
  { k: "reading", v: "fault-tolerant design" },
  { k: "shipping", v: "cascade v0.1" },
];

function useKarachiTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Karachi",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export default function SignalPanel() {
  const root = useRef<HTMLDivElement>(null);
  const time = useKarachiTime();

  useGsapContext(root, () => {
    gsap.fromTo(
      "[data-signal-row]",
      { opacity: 0, x: 14 },
      { opacity: 1, x: 0, duration: 0.9, ease: "expo.out", stagger: 0.08, delay: 1.1 },
    );
    // Slow sweep across the rule, like an index being scanned.
    gsap.fromTo(
      "[data-signal-sweep]",
      { scaleX: 0, transformOrigin: "left center" },
      {
        scaleX: 1,
        duration: 2.4,
        ease: "power2.inOut",
        repeat: -1,
        repeatDelay: 1.8,
        transformOrigin: "left center",
        onRepeat: () => {
          gsap.set("[data-signal-sweep]", { transformOrigin: "left center" });
        },
      },
    );
  }, []);

  return (
    <div ref={root} className="w-full max-w-[22rem]">
      <div className="mb-3 flex items-baseline justify-between">
        <span className="meta">Local</span>
        <span
          className="font-mono text-sm tabular-nums text-ink"
          suppressHydrationWarning
        >
          {time ?? "--:--:--"}
        </span>
      </div>

      <div className="relative mb-5 h-px w-full bg-rule">
        <span
          data-signal-sweep
          className="absolute inset-0 block bg-ember"
          aria-hidden="true"
        />
      </div>

      <dl className="space-y-2.5">
        {ROWS.map((r) => (
          <div
            key={r.k}
            data-signal-row
            className="flex items-baseline justify-between gap-6"
          >
            <dt className="meta">{r.k}</dt>
            <dd className="font-mono text-[0.8125rem] text-ink-soft">{r.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
