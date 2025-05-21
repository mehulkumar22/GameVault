import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Layout from '../components/layout/Layout';
import GameCard from '../components/games/GameCard';
import FilterPanel from '../components/games/FilterPanel';
import { GameType } from '../types';
import { games } from '../data/games';

const GamesPage = () => {
  const [filteredGames, setFilteredGames] = useState<GameType[]>(games);
  const [searchQuery, setSearchQuery] = useState('');
  
  const genres = Array.from(new Set(games.map((game) => game.genre)));
  const platforms = Array.from(new Set(games.map((game) => game.platform)));
  
  const applyFilters = ({ 
    minPrice, 
    maxPrice, 
    genres: selectedGenres, 
    platforms: selectedPlatforms, 
    sortBy 
  }: {
    minPrice: number;
    maxPrice: number;
    genres: string[];
    platforms: string[];
    sortBy: string;
  }) => {
    let filtered = [...games].filter((game) => {
      const priceMatch = game.price >= minPrice && game.price <= maxPrice;
      const genreMatch = selectedGenres.length === 0 || selectedGenres.includes(game.genre);
      const platformMatch = selectedPlatforms.length === 0 || selectedPlatforms.includes(game.platform);
      return priceMatch && genreMatch && platformMatch;
    });
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (game) => 
          game.title.toLowerCase().includes(query) || 
          game.genre.toLowerCase().includes(query)
      );
    }
    
    // Apply sort
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => (b.releaseYear || 0) - (a.releaseYear || 0));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
      default:
        // Assuming we have a popularity metric, otherwise keep default order
        filtered.sort(() => Math.random() - 0.5);
        break;
    }
    
    setFilteredGames(filtered);
  };
  
  // Apply search independently
  useEffect(() => {
    applyFilters({
      minPrice: 0,
      maxPrice: 5000,
      genres: [],
      platforms: [],
      sortBy: 'popular'
    });
  }, [searchQuery]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-white">Browse Games</h1>
        
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Filter Panel */}
          <FilterPanel 
            onFilterChange={applyFilters}
            genres={genres}
            platforms={platforms}
          />
          
          {/* Games Grid */}
          <div className="flex-1">
            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-800/50 py-16 px-4 text-center">
                <p className="mb-4 text-xl font-medium text-white">No games found</p>
                <p className="text-slate-400">
                  Try adjusting your filters or search query.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GamesPage;