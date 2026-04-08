import { categories } from "../data/events";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  activeCategory: string;
  onCategoryChange: (value: string) => void;
}

const SearchAndFilter = ({ search, onSearchChange, activeCategory, onCategoryChange }: Props) => {
  return (
    <div className="mb-8 space-y-4">
      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search events, hosts, categories..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`chip ${activeCategory === cat ? "chip-active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchAndFilter;
