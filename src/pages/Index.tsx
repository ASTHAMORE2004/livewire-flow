import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import SearchAndFilter from "../components/SearchAndFilter";
import EventCard from "../components/EventCard";
import { events } from "../data/events";

/**
 * Landing page — shows all events in a filterable grid.
 * The hero section sets the tone, then search + filters
 * let users narrow down what they're looking for.
 */
const Index = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredEvents = useMemo(() => {
    const query = search.toLowerCase();
    return events.filter((event) => {
      const matchesCategory = activeCategory === "All" || event.category === activeCategory;
      const matchesSearch =
        !query ||
        event.title.toLowerCase().includes(query) ||
        event.host.toLowerCase().includes(query) ||
        event.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  // Quick stats for the hero
  const liveCount = events.filter((e) => e.isLive).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container py-6 sm:py-10">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Live Events
            </h1>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="inline-block h-2 w-2 rounded-full bg-live animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">
                {liveCount} streaming now
              </span>
            </div>
          </div>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
            Discover live streams, workshops, and events from creators worldwide. Jump in — the good stuff's happening right now.
          </p>
        </motion.div>

        {/* Search + Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <SearchAndFilter
            search={search}
            onSearchChange={setSearch}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </motion.div>

        {/* Results count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredEvents.length}</span> event{filteredEvents.length !== 1 ? "s" : ""}
          </p>
          {activeCategory !== "All" && (
            <button
              onClick={() => setActiveCategory("All")}
              className="text-xs text-primary hover:underline"
            >
              Clear filter
            </button>
          )}
        </div>

        {/* Event grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredEvents.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="mb-4 rounded-full bg-secondary p-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <p className="font-display text-lg font-semibold text-foreground">
              No events match your search
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your filters or search terms
            </p>
          </motion.div>
        )}
      </main>

      {/* Simple footer */}
      <footer className="mt-12 border-t border-border/50 bg-background py-6">
        <div className="container flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © 2026 VickyBytes. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with React + Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
