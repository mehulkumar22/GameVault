import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import Button from '../ui/Button';

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
  genres: string[];
  platforms: string[];
}

interface FilterState {
  minPrice: number;
  maxPrice: number;
  genres: string[];
  platforms: string[];
  sortBy: string;
}

const defaultFilters: FilterState = {
  minPrice: 0,
  maxPrice: 5000,
  genres: [],
  platforms: [],
  sortBy: 'popular',
};

const FilterPanel = ({ onFilterChange, genres, platforms }: FilterPanelProps) => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleGenreToggle = (genre: string) => {
    const updatedGenres = filters.genres.includes(genre)
      ? filters.genres.filter((g) => g !== genre)
      : [...filters.genres, genre];
    
    handleFilterChange({ genres: updatedGenres });
  };

  const handlePlatformToggle = (platform: string) => {
    const updatedPlatforms = filters.platforms.includes(platform)
      ? filters.platforms.filter((p) => p !== platform)
      : [...filters.platforms, platform];
    
    handleFilterChange({ platforms: updatedPlatforms });
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  const filterContent = (
    <>
      {/* Sort By */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-medium text-white">Sort By</h3>
        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
          className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-purple-500 focus:outline-none"
        >
          <option value="popular">Most Popular</option>
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-medium text-white">Price Range</h3>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-slate-400">₹{filters.minPrice}</span>
          <span className="text-xs text-slate-400">₹{filters.maxPrice}</span>
        </div>
        <input
          type="range"
          min="0"
          max="5000"
          step="50"
          value={filters.maxPrice}
          onChange={(e) => handleFilterChange({ maxPrice: Number(e.target.value) })}
          className="w-full accent-purple-500"
        />
      </div>

      {/* Genres */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-medium text-white">Genres</h3>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreToggle(genre)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                filters.genres.includes(genre)
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Platforms */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-medium text-white">Platforms</h3>
        <div className="space-y-2">
          {platforms.map((platform) => (
            <div key={platform} className="flex items-center">
              <input
                type="checkbox"
                id={`platform-${platform}`}
                checked={filters.platforms.includes(platform)}
                onChange={() => handlePlatformToggle(platform)}
                className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-purple-600 focus:ring-purple-500"
              />
              <label
                htmlFor={`platform-${platform}`}
                className="ml-2 text-sm text-slate-300"
              >
                {platform}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Filters */}
      <Button variant="outline" size="sm" onClick={resetFilters} className="w-full">
        Reset Filters
      </Button>
    </>
  );

  return (
    <>
      {/* Desktop Filter */}
      <div className="hidden md:block sticky top-20 w-64 shrink-0 rounded-lg border border-slate-800 bg-slate-900 p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium text-white">Filters</h2>
          <button
            onClick={resetFilters}
            className="text-xs text-slate-400 hover:text-white"
          >
            Clear All
          </button>
        </div>
        {filterContent}
      </div>

      {/* Mobile Filter Button */}
      <div className="md:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleMobileFilter}
          className="fixed bottom-4 right-4 z-40 rounded-full shadow-lg px-3 py-3"
        >
          <Filter className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Filter Panel */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/60" onClick={toggleMobileFilter} />
          <div className="absolute bottom-0 right-0 left-0 max-h-[90vh] transform overflow-auto rounded-t-xl bg-slate-900 p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium text-white">Filters</h2>
              <button
                onClick={toggleMobileFilter}
                className="rounded-md p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {filterContent}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterPanel;