import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Key, Clipboard, ExternalLink } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface PurchasedGame {
  id: string;
  title: string;
  imageUrl: string;
  platform: string;
  purchaseDate: string;
  price: number;
  username: string;
  password: string;
  isRevealed: boolean;
}

const DashboardPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [purchasedGames, setPurchasedGames] = useState<PurchasedGame[]>([]);
  
  useEffect(() => {
    if (isAuthenticated) {
      // Mock fetching purchased games
      const mockPurchasedGames: PurchasedGame[] = [
        {
          id: '1',
          title: 'Grand Theft Auto V',
          imageUrl: 'https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          platform: 'Steam',
          purchaseDate: '2023-05-15',
          price: 499,
          username: 'gta5_user_123',
          password: 'securepass123',
          isRevealed: false,
        },
        {
          id: '2',
          title: 'Cyberpunk 2077',
          imageUrl: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          platform: 'Steam',
          purchaseDate: '2023-06-22',
          price: 899,
          username: 'cyber_player_77',
          password: 'nightcity2077',
          isRevealed: false,
        },
      ];
      
      setPurchasedGames(mockPurchasedGames);
    }
  }, [isAuthenticated]);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
        </div>
      </Layout>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login?redirect=dashboard" />;
  }
  
  const toggleCredentials = (gameId: string) => {
    setPurchasedGames((prev) =>
      prev.map((game) =>
        game.id === gameId ? { ...game, isRevealed: !game.isRevealed } : game
      )
    );
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">My Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* User Profile */}
          <div className="md:col-span-1">
            <div className="bg-slate-800 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Profile</h2>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {user?.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">{user?.name}</h3>
                  <p className="text-sm text-slate-400">{user?.email}</p>
                </div>
              </div>
              <Button variant="outline" fullWidth>
                Edit Profile
              </Button>
            </div>
            
            {/* Quick Stats */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Account Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-700 rounded-md p-4">
                  <h3 className="text-sm font-medium text-slate-400">Purchased</h3>
                  <p className="text-2xl font-bold text-white">{purchasedGames.length}</p>
                </div>
                <div className="bg-slate-700 rounded-md p-4">
                  <h3 className="text-sm font-medium text-slate-400">Spent</h3>
                  <p className="text-2xl font-bold text-white">
                    ₹{purchasedGames.reduce((total, game) => total + game.price, 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Purchased Games */}
          <div className="md:col-span-2">
            <div className="bg-slate-800 rounded-lg overflow-hidden">
              <div className="p-6 border-b border-slate-700">
                <h2 className="text-xl font-semibold text-white">
                  Purchased Accounts
                </h2>
              </div>
              
              {purchasedGames.length > 0 ? (
                <div className="divide-y divide-slate-700">
                  {purchasedGames.map((game) => (
                    <div key={game.id} className="p-6">
                      <div className="flex flex-col sm:flex-row">
                        <img
                          src={game.imageUrl}
                          alt={game.title}
                          className="w-20 h-20 object-cover rounded-md mr-4 mb-4 sm:mb-0"
                        />
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-medium text-white">{game.title}</h3>
                              <p className="text-sm text-slate-400">
                                Purchased on {new Date(game.purchaseDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="mt-2 sm:mt-0">
                              <span className="inline-block bg-slate-700 rounded-md px-2 py-1 text-xs font-medium text-white">
                                {game.platform}
                              </span>
                            </div>
                          </div>
                          
                          <div className="bg-slate-900 rounded-md p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-white flex items-center">
                                <Key className="mr-2 h-4 w-4 text-purple-500" />
                                Account Credentials
                              </h4>
                              <button
                                onClick={() => toggleCredentials(game.id)}
                                className="text-xs text-purple-400 hover:text-purple-300"
                              >
                                {game.isRevealed ? 'Hide' : 'Show'} Credentials
                              </button>
                            </div>
                            
                            {game.isRevealed ? (
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <div className="flex-1">
                                    <span className="text-xs text-slate-400 block">Username</span>
                                    <span className="text-sm text-white font-mono">{game.username}</span>
                                  </div>
                                  <button
                                    onClick={() => copyToClipboard(game.username)}
                                    className="text-slate-400 hover:text-white p-1"
                                  >
                                    <Clipboard className="h-4 w-4" />
                                  </button>
                                </div>
                                <div className="flex justify-between items-center">
                                  <div className="flex-1">
                                    <span className="text-xs text-slate-400 block">Password</span>
                                    <span className="text-sm text-white font-mono">{game.password}</span>
                                  </div>
                                  <button
                                    onClick={() => copyToClipboard(game.password)}
                                    className="text-slate-400 hover:text-white p-1"
                                  >
                                    <Clipboard className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="text-center py-2">
                                <p className="text-sm text-slate-400">
                                  Credentials are hidden for security. Click "Show Credentials" to view.
                                </p>
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-4 flex justify-end">
                            <a
                              href="https://store.steampowered.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-sm text-purple-400 hover:text-purple-300"
                            >
                              Login to {game.platform}
                              <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-slate-400 mb-4">
                    You haven't purchased any game accounts yet.
                  </p>
                  <Button>Browse Games</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;