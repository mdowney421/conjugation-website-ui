import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/verbs", label: "Verbs" },
  { to: "/practice", label: "Practice" },
  { to: "/about", label: "About" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink
          to="/"
          end
          className="navbar-brand"
          onClick={() => setIsOpen(false)}
        >
          🐊 The ConjuGator
        </NavLink>

        <button
          className="navbar-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span />
        </button>

        <div className={`navbar-links${isOpen ? " open" : ""}`}>
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `navbar-link${isActive ? " active" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
