import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { GameType } from '../../types';
import { useCart } from '../../contexts/CartContext';
import Button from '../ui/Button';

interface GameCardProps {
  game: GameType;
  variant?: 'default' | 'detail';
}

const GameCard = ({ game, variant = 'default' }: GameCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(game);
  };

  if (variant === 'detail') {
    return (
      <div className="bg-[#202020] rounded-lg overflow-hidden">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <img
            src={game.detailImageUrl || game.imageUrl}
            alt={game.title}
            className="h-full w-full object-cover"
          />
          {game.isNew && (
            <span className="absolute left-2 top-2 rounded bg-blue-500/90 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
              New
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-white mb-1">{game.title}</h3>
          <p className="text-sm text-gray-400 mb-3">{game.genre}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-white">₹{game.price}</span>
              {game.originalPrice && game.originalPrice > game.price && (
                <span className="text-sm text-gray-400 line-through">₹{game.originalPrice}</span>
              )}
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link 
      to={`/games/${game.id}`}
      className="block overflow-hidden rounded-lg bg-[#202020] transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <img
          src={game.imageUrl}
          alt={game.title}
          className="h-full w-full object-cover"
        />
        
        {/* Game labels */}
        <div className="absolute left-2 top-2 flex flex-wrap gap-1">
          {game.platform && (
            <span className="rounded bg-black/90 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {game.platform}
            </span>
          )}
          {game.isNew && (
            <span className="rounded bg-blue-500/90 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
              New
            </span>
          )}
          {game.discount > 0 && (
            <span className="rounded bg-green-500/90 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
              -{game.discount}%
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-2">
          <h3 className="text-lg font-medium text-white truncate">{game.title}</h3>
          <p className="text-sm text-gray-400">{game.genre}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-white">₹{game.price}</span>
            {game.originalPrice && game.originalPrice > game.price && (
              <span className="text-sm text-gray-400 line-through">₹{game.originalPrice}</span>
            )} 
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;