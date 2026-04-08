import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            VickyBytes
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Events
          </Link>
          <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Trending
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            About
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="btn-ghost md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 py-3 md:hidden animate-fade-in-up">
          <Link to="/" className="block py-2 text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Events</Link>
          <a href="#" className="block py-2 text-sm font-medium text-muted-foreground">Trending</a>
          <a href="#" className="block py-2 text-sm font-medium text-muted-foreground">About</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
