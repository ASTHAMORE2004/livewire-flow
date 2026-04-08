import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import SearchAndFilter from "../components/SearchAndFilter";
import EventCard from "../components/EventCard";
import { events } from "../data/events";

const Index = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchesCategory = activeCategory === "All" || e.category === activeCategory;
      const matchesSearch =
        !search ||
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.host.toLowerCase().includes(search.toLowerCase()) ||
        e.category.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        {/* Hero */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Live Events<span className="text-primary">.</span>
          </h1>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground sm:text-base">
            Discover and join live streams, workshops, and events from creators around the world.
          </p>
        </div>

        <SearchAndFilter
          search={search}
          onSearchChange={setSearch}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-4 text-muted-foreground">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <p className="font-display text-lg font-semibold text-foreground">No events found</p>
            <p className="mt-1 text-sm text-muted-foreground">Try a different search or category</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-6">
        <div className="container text-center text-xs text-muted-foreground">
          © 2026 VickyBytes. Built with ❤️ for the Frontend Assignment.
        </div>
      </footer>
    </div>
  );
};

export default Index;
