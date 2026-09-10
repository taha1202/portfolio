"use client";

import { useTheme } from "./ThemeProvider";

/**
 * Two-state switch with a sliding indicator. No icons-in-rounded-squares:
 * the affordance is the travel of the knob and the label beside it.
 */
export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      aria-pressed={isDark}
      data-magnetic
      className="group inline-flex items-center gap-3"
    >
      <span className="meta hidden select-none tabular-nums sm:inline">
        {isDark ? "DARK" : "LIGHT"}
      </span>

      <span
        className="relative inline-flex h-6 w-11 items-center rounded-full border border-rule bg-paper-2 px-[3px] transition-colors"
        aria-hidden="true"
      >
        <span
          className="h-[16px] w-[16px] rounded-full bg-ink transition-transform duration-500"
          style={{
            transform: isDark ? "translateX(19px)" : "translateX(0px)",
            transitionTimingFunction: "cubic-bezier(0.83, 0, 0.17, 1)",
          }}
        />
      </span>
    </button>
  );
}
