import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, TrendingUp, Award, Zap, ChevronLeft } from 'lucide-react';
import Layout from '../components/layout/Layout';
import HeroSlider from '../components/games/HeroSlider';
import GameCard from '../components/games/GameCard';
import { GameType } from '../types';
import { featuredGames, games } from '../data/games';

const HomePage = () => {
  const [categoryGames, setCategoryGames] = useState<Record<string, GameType[]>>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const gamesContainerRef = useRef<HTMLDivElement>(null);

  const trendingGames = games.filter(game => game.isTrending);
  const specialOfferGames = games.filter(game => game.isSpecial);

  useEffect(() => {
    const groupedGames = games.reduce((acc, game) => {
      if (!acc[game.genre]) acc[game.genre] = [];
      acc[game.genre].push(game);
      return acc;
    }, {} as Record<string, GameType[]>);

    setCategoryGames(groupedGames);
    setSelectedCategory(null);
  }, []);

  const scrollGames = (direction: 'left' | 'right') => {
    if (gamesContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      gamesContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <Layout>
      <HeroSlider slides={featuredGames} />

      <div className="container mx-auto px-4 py-12">
        {/* Categories */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-white">Game Categories</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {Object.keys(categoryGames).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                className={`group flex flex-col items-center justify-center rounded-lg p-6 transition-transform hover:scale-105 ${
                  selectedCategory === category ? 'bg-purple-600' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`mb-3 rounded-full p-3 ${
                    selectedCategory === category
                      ? 'bg-purple-700 text-white'
                      : 'bg-slate-700 text-purple-500 group-hover:bg-purple-600 group-hover:text-white'
                  }`}
                >
                  <Award className="h-6 w-6" />
                </div>
                <span className="text-center text-sm font-medium text-white">{category}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Selected Category Games */}
        {selectedCategory && (
          <section className="mb-12">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-purple-500" />
                <h2 className="text-2xl font-bold text-white">{selectedCategory} Games</h2>
              </div>
              <Link
                to={`/games?category=${selectedCategory}`}
                className="flex items-center text-sm font-medium text-purple-500 hover:text-purple-400"
              >
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative">
              <button
                onClick={() => scrollGames('left')}
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 md:hidden"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <div
                ref={gamesContainerRef}
                className="flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-x-visible"
              >
                {categoryGames[selectedCategory]?.map((game) => (
                  <div key={game.id} className="w-[280px] flex-none md:w-auto">
                    <GameCard game={game} />
                  </div>
                ))}
              </div>
              <button
                onClick={() => scrollGames('right')}
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 md:hidden"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </section>
        )}

        {/* Trending Games */}
        {!selectedCategory && (
          <>
            <section className="mb-12">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-purple-500" />
                  <h2 className="text-2xl font-bold text-white">Trending Games</h2>
                </div>
                <Link
                  to="/games"
                  className="flex items-center text-sm font-medium text-purple-500 hover:text-purple-400"
                >
                  View All <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="relative">
                <button
                  onClick={() => scrollGames('left')}
                  className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 md:hidden"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <div
                  ref={gamesContainerRef}
                  className="flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-x-visible"
                >
                  {trendingGames.slice(0, 4).map((game) => (
                    <div key={game.id} className="w-[280px] flex-none md:w-auto">
                      <GameCard game={game} />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => scrollGames('right')}
                  className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 md:hidden"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </section>

            {/* Special Offers */}
            <section className="mb-12">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-green-500" />
                  <h2 className="text-2xl font-bold text-white">Special Offers</h2>
                </div>
                <Link
                  to="/games?filter=offers"
                  className="flex items-center text-sm font-medium text-purple-500 hover:text-purple-400"
                >
                  View All <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="relative">
                <button
                  onClick={() => scrollGames('left')}
                  className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 md:hidden"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <div
                  ref={gamesContainerRef}
                  className="flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-x-visible"
                >
                  {specialOfferGames.slice(0, 4).map((game) => (
                    <div key={game.id} className="w-[280px] flex-none md:w-auto">
                      <GameCard game={game} />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => scrollGames('right')}
                  className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 md:hidden"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </section>

            {/* Why Choose Us */}
            <section className="rounded-xl border border-slate-800 bg-slate-800/50 p-8">
              <h2 className="mb-8 text-center text-2xl font-bold text-white">Why Choose GameVault?</h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {[
                  {
                    icon: <Zap className="h-6 w-6 text-purple-500" />,
                    title: 'Instant Delivery',
                    text: 'Get your game account details instantly after payment. No waiting, start playing immediately.',
                  },
                  {
                    icon: <Award className="h-6 w-6 text-purple-500" />,
                    title: 'Premium Accounts',
                    text: 'All accounts come with premium games already installed. Just log in and play without extra purchases.',
                  },
                  {
                    icon: <TrendingUp className="h-6 w-6 text-purple-500" />,
                    title: 'Affordable Prices',
                    text: 'Get premium games at a fraction of their original cost. We offer the best prices in the market.',
                  },
                ].map((feature, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center">
                    <div className="mb-4 rounded-full bg-purple-600/20 p-4">{feature.icon}</div>
                    <h3 className="mb-2 text-lg font-semibold text-white">{feature.title}</h3>
                    <p className="text-slate-400">{feature.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;
