"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const STORAGE_KEY = "theme";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// An inline script in the root layout (see app/layout.tsx) resolves
// data-theme on <html> -- from localStorage, falling back to the OS
// preference -- before the browser paints, so there's no flash of the
// wrong theme on a hard load. It runs before React hydrates, so `theme`
// below has to start as "light" (matching the server's default) rather
// than reading this same resolution logic during render: doing that would
// make the hydration render itself diverge from the server-rendered
// markup (e.g. the theme-toggle button's aria-label) and trip React's
// hydration mismatch warning. Instead, the effect below picks up the
// value the script already applied to <html> once mounted.
const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  // useLayoutEffect (not useEffect) so this resolves before paint -- both
  // on first mount and after React Strict Mode's dev-only remount, which
  // otherwise resets <html> to only the attributes React itself rendered.
  useLayoutEffect(() => {
    const resolved =
      (document.documentElement.getAttribute("data-theme") as Theme | null) ??
      getInitialTheme();
    document.documentElement.setAttribute("data-theme", resolved);
    setTheme(resolved);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () =>
        setTheme((current) => {
          const next = current === "light" ? "dark" : "light";
          document.documentElement.setAttribute("data-theme", next);
          localStorage.setItem(STORAGE_KEY, next);
          return next;
        }),
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
