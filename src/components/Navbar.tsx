import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Top navigation bar — sticks to the top, blurs the background
 * content behind it for that premium frosted-glass look.
 */
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Events" },
    { href: "#", label: "Trending" },
    { href: "#", label: "About" },
  ];

  const isActive = (to?: string) => to === location.pathname;

  return (
    <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-2xl">
      <div className="container flex h-14 items-center justify-between sm:h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary transition-transform duration-300 group-hover:scale-110">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-primary-foreground ml-0.5">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            Vicky<span className="text-primary">Bytes</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = isActive(link.to);
            const Component = link.to ? Link : "a";
            return (
              <Component
                key={link.label}
                {...(link.to ? { to: link.to } : { href: link.href })}
                className={`relative px-3.5 py-1.5 text-sm font-medium rounded-md transition-colors duration-200
                  ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {link.label}
                {active && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-md bg-secondary -z-10"
                    transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
                  />
                )}
              </Component>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className="btn-ghost md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border/40 md:hidden"
          >
            <div className="container space-y-1 py-3">
              {navLinks.map((link) => {
                const Component = link.to ? Link : "a";
                return (
                  <Component
                    key={link.label}
                    {...(link.to ? { to: link.to } : { href: link.href })}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {link.label}
                  </Component>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
