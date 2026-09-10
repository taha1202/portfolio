"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  THEME_STORAGE_KEY,
  resolveSystemTheme,
  type Theme,
  type ThemePreference,
} from "@/lib/theme";

type ThemeContextValue = {
  /** What the user chose: an explicit theme, or "system". */
  preference: ThemePreference;
  /** What is actually painted right now. */
  theme: Theme;
  setPreference: (next: ThemePreference) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredPreference(): ThemePreference {
  if (typeof window === "undefined") return "system";
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "light" || stored === "dark" || stored === "system"
    ? stored
    : "system";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // The no-flash script already set data-theme before React mounted.
  // Initialise from the DOM so the first client render agrees with the
  // server-painted markup and we never double-apply.
  const [preference, setPreferenceState] = useState<ThemePreference>("system");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const pref = readStoredPreference();
    setPreferenceState(pref);
    const applied =
      (document.documentElement.getAttribute("data-theme") as Theme | null) ??
      resolveSystemTheme();
    setTheme(applied);
    document.documentElement.setAttribute("data-theme-ready", "");
  }, []);

  // Apply preference -> DOM, and persist.
  useEffect(() => {
    const next = preference === "system" ? resolveSystemTheme() : preference;
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    document.documentElement.style.colorScheme = next;
    window.localStorage.setItem(THEME_STORAGE_KEY, preference);
  }, [preference]);

  // Track OS changes only while following the system.
  useEffect(() => {
    if (preference !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const next: Theme = mq.matches ? "dark" : "light";
      setTheme(next);
      document.documentElement.setAttribute("data-theme", next);
      document.documentElement.style.colorScheme = next;
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [preference]);

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next);
  }, []);

  const toggle = useCallback(() => {
    setPreferenceState(theme === "dark" ? "light" : "dark");
  }, [theme]);

  const value = useMemo(
    () => ({ preference, theme, setPreference, toggle }),
    [preference, theme, setPreference, toggle],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}
