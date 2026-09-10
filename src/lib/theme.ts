export const THEMES = ["light", "dark"] as const;
export type Theme = (typeof THEMES)[number];
export type ThemePreference = Theme | "system";

export const THEME_STORAGE_KEY = "dossier-theme";

export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && (THEMES as readonly string[]).includes(value);
}

export function resolveSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * Runs before first paint to prevent a flash of the wrong theme.
 * Stringified and injected via dangerouslySetInnerHTML in the document head —
 * it must stay dependency-free and synchronous.
 */
export const NO_FLASH_SCRIPT = `
(function () {
  try {
    var key = ${JSON.stringify(THEME_STORAGE_KEY)};
    var stored = localStorage.getItem(key);
    var pref = stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
    var theme = pref === "system"
      ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : pref;
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();
`.trim();
