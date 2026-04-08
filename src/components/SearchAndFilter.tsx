import { categories } from "../data/events";
import { motion } from "framer-motion";

interface SearchAndFilterProps {
  search: string;
  onSearchChange: (val: string) => void;
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

/**
 * Search bar + horizontal scrolling category filters.
 * The active chip gets a little animated pill behind it
 * so switching categories feels satisfying.
 */
const SearchAndFilter = ({
  search,
  onSearchChange,
  activeCategory,
  onCategoryChange,
}: SearchAndFilterProps) => {
  return (
    <div className="mb-8 space-y-5">
      {/* Search input with icon */}
      <div className="relative max-w-2xl">
        <svg
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search by event name, host, or category..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="input-field py-3 pl-11 pr-4"
        />
        {/* clear button when there's text */}
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Clear search"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Category chips — scrollable on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin -mx-1 px-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`chip relative ${activeCategory === cat ? "chip-active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchAndFilter;
