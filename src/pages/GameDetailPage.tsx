import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  ArrowLeft, 
  Clock, 
  Cpu, 
  HardDrive, 
  Globe, 
  Award
} from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { games } from '../data/games';
import { GameType } from '../types';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

const GameDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<GameType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  
  useEffect(() => {
    // Find the game by id
    const foundGame = games.find((g) => g.id === id);
    setGame(foundGame || null);
    setIsLoading(false);
  }, [id]);
  
  const handleAddToCart = () => {
    if (game) {
      addToCart(game);
      toast.success(`${game.title} added to cart!`);
    }
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
        </div>
      </Layout>
    );
  }
  
  if (!game) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Game Not Found</h2>
          <p className="text-slate-400 mb-8">The game you're looking for doesn't exist or has been removed.</p>
          <Link to="/games">
            <Button>Browse All Games</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <div 
        className="relative h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url(${game.heroImageUrl || game.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
        <div className="container mx-auto px-4 relative h-full flex flex-col justify-end pb-8">
          <Link to="/games" className="absolute top-4 left-4 bg-slate-800/80 text-white rounded-full p-2 hover:bg-slate-700 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-end">
            <img
              src={game.detailImageUrl}
              alt={game.title}
              className="w-40 h-52 object-cover rounded-md shadow-lg border border-slate-700 relative z-10"
            />
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="rounded-md bg-purple-600/90 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {game.genre}
                </span>
                <span className="rounded-md bg-slate-800/90 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {game.platform}
                </span>
                {game.isNew && (
                  <span className="rounded-md bg-green-600/90 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    New Release
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{game.title}</h1>
              <div className="flex items-center gap-4 text-sm text-slate-300">
                <span className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  {game.releaseYear}
                </span>
                <span className="flex items-center">
                  <Award className="mr-1 h-4 w-4" />
                  {game.publisher}
                </span>
                <span className="flex items-center">
                  <Globe className="mr-1 h-4 w-4" />
                  {game.developer}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-white mb-4">About the Game</h2>
              <p className="text-slate-300 mb-6">
                {game.description || `Experience ${game.title}, a premium ${game.genre} game. 
                This account comes with the full game and all its content, ready to play instantly 
                after purchase. Developed by ${game.developer || 'top industry developers'}, 
                this game offers exceptional gameplay and stunning graphics.`}
              </p>
              
              {/* Game Features */}
              <h3 className="text-lg font-semibold text-white mb-3">Game Features</h3>
              <ul className="list-disc list-inside text-slate-300 mb-6 space-y-2">
                <li>Full game access with all content included</li>
                <li>Premium account with no additional purchases required</li>
                <li>Instant access after payment</li>
                <li>Compatible with {game.platform}</li>
                <li>Released in {game.releaseYear}</li>
              </ul>
              
              {/* System Requirements */}
              <h3 className="text-lg font-semibold text-white mb-3">System Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900 rounded-md p-4">
                  <h4 className="font-medium text-white mb-2 flex items-center">
                    <Cpu className="mr-2 h-4 w-4 text-purple-500" />
                    Minimum Requirements
                  </h4>
                  <ul className="text-sm text-slate-400 space-y-1">
                    <li><span className="text-slate-300">OS:</span> Windows 10 (64-bit)</li>
                    <li><span className="text-slate-300">Processor:</span> Intel Core i5-2500K / AMD FX-6300</li>
                    <li><span className="text-slate-300">Memory:</span> 8 GB RAM</li>
                    <li><span className="text-slate-300">Graphics:</span> NVIDIA GeForce GTX 770 / AMD Radeon R9 280</li>
                    <li><span className="text-slate-300">Storage:</span> 75 GB available space</li>
                  </ul>
                </div>
                <div className="bg-slate-900 rounded-md p-4">
                  <h4 className="font-medium text-white mb-2 flex items-center">
                    <HardDrive className="mr-2 h-4 w-4 text-purple-500" />
                    Recommended Requirements
                  </h4>
                  <ul className="text-sm text-slate-400 space-y-1">
                    <li><span className="text-slate-300">OS:</span> Windows 10 (64-bit)</li>
                    <li><span className="text-slate-300">Processor:</span> Intel Core i7-4770K / AMD Ryzen 5 1500X</li>
                    <li><span className="text-slate-300">Memory:</span> 12 GB RAM</li>
                    <li><span className="text-slate-300">Graphics:</span> NVIDIA GeForce GTX 1060 / AMD Radeon RX 580</li>
                    <li><span className="text-slate-300">Storage:</span> 75 GB available space (SSD recommended)</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Screenshots */}
            <div className="bg-slate-800 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Screenshots</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {game.screenshots && game.screenshots.length > 0 ? (
                  game.screenshots.map((screenshot, i) => (
                    <img
                      key={i}
                      src={screenshot}
                      alt={`${game.title} screenshot ${i + 1}`}
                      className="w-full h-48 object-cover rounded-md hover:opacity-90 transition-opacity cursor-pointer"
                    />
                  ))
                ) : (
                  <p className="text-slate-400">No screenshots available.</p>
                )}

              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            {/* Purchase Box */}
            <div className="bg-slate-800 rounded-lg p-6 mb-6 sticky top-20">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-2xl font-bold text-white">₹{game.price}</span>
                  {game.originalPrice && game.originalPrice > game.price && (
                    <span className="ml-2 text-sm text-slate-400 line-through">₹{game.originalPrice}</span>
                  )}
                </div>
                {game.discount > 0 && (
                  <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {game.discount}% OFF
                  </span>
                )}
              </div>
              
              <div className="space-y-3 mb-6">
                <Button
                  fullWidth
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
              
              <div className="text-sm text-slate-400 space-y-3">
                <div className="flex items-start">
                  <Share2 className="h-4 w-4 mr-3 mt-0.5" />
                  <span>Share this game with friends</span>
                </div>
                <p>All purchases are processed securely through Razorpay.</p>
                <p>Account details will be provided instantly after successful payment.</p>
              </div>
            </div>
            
            {/* More Games */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Similar Games</h3>
              <div className="space-y-4">
                {games
                  .filter(g => g.genre === game.genre && g.id !== game.id)
                  .slice(0, 3)
                  .map(similarGame => (
                    <Link 
                      key={similarGame.id} 
                      to={`/games/${similarGame.id}`}
                      className="flex items-center space-x-3 rounded-md p-2 hover:bg-slate-700 transition-colors"
                    >
                      <img
                        src={similarGame.imageUrl}
                        alt={similarGame.title}
                        className="w-14 h-14 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-white truncate">{similarGame.title}</h4>
                        <p className="text-xs text-slate-400">{similarGame.platform}</p>
                      </div>
                      <div className="text-sm font-semibold text-white">₹{similarGame.price}</div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GameDetailPage;