"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "../context/ThemeContext";
import { LANGUAGES } from "../languages/registry";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const language = pathname.split("/").filter(Boolean)[0];
  const activeLanguage = language && LANGUAGES[language]?.enabled ? language : undefined;

  const links = activeLanguage
    ? [
        { to: `/${activeLanguage}/verbs`, label: "Verbs" },
        { to: `/${activeLanguage}/conjugate`, label: "Conjugate" },
        { to: `/${activeLanguage}/grammar`, label: "Grammar" },
        { to: `/${activeLanguage}/flashcards`, label: "Flashcards" },
        { to: `/${activeLanguage}/about`, label: "About" },
      ]
    : [];

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar-inner">
        <Link
          href="/"
          className="navbar-brand"
          onClick={() => setIsOpen(false)}
        >
          DialecTrek
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
          >
            <svg
              className="theme-toggle-icon theme-toggle-icon-sun"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 3v2M12 19v2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M3 12h2M19 12h2M5.6 18.4l1.4-1.4M17 7l1.4-1.4" />
            </svg>
            <svg
              className="theme-toggle-icon theme-toggle-icon-moon"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.4 14.7A8.5 8.5 0 1 1 9.3 3.6a7 7 0 0 0 11.1 11.1Z" />
            </svg>
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
