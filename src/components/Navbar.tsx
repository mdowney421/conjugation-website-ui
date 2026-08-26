"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "../context/ThemeContext";
import { LANGUAGES } from "../languages/registry";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const language = pathname.split("/").filter(Boolean)[0];
  const activeLanguage = language && LANGUAGES[language]?.enabled ? language : undefined;

  const links = activeLanguage
    ? [
        { to: `/${activeLanguage}/verbs`, label: "Verbs" },
        { to: `/${activeLanguage}/practice`, label: "Practice" },
        { to: `/${activeLanguage}/about`, label: "About" },
      ]
    : [];

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link
          href="/"
          className="navbar-brand"
          onClick={() => setIsOpen(false)}
        >
          Trekluent
          <span className="brand-dots" aria-hidden="true">
            <span className="brand-dot" />
            <span className="brand-dot" />
            <span className="brand-dot" />
          </span>
        </Link>

        <div className={`navbar-links${isOpen ? " open" : ""}`}>
          {links.map(({ to, label }) => {
            const isActive = pathname === to || pathname.startsWith(`${to}/`);
            return (
              <Link
                key={to}
                href={to}
                className={`navbar-link${isActive ? " active" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="navbar-actions">
          <button
            className="theme-toggle"
            type="button"
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            onClick={toggleTheme}
            suppressHydrationWarning
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {links.length > 0 && (
            <button
              className="navbar-toggle"
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((open) => !open)}
            >
              <span />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
