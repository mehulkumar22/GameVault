import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, Eye, EyeOff } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import { GameType, LoginCode } from '../types';
import { games } from '../data/games';
import toast from 'react-hot-toast';

const AdminPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [gamesList, setGamesList] = useState<GameType[]>(games);
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [isEditingGame, setIsEditingGame] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  
  // Form states
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const handleAddAccount = () => {
    if (!selectedGame) return;
    
    if (!newUsername || !newPassword) {
      toast.error('Please enter both username and password');
      return;
    }
    
    const newLoginCode: LoginCode = {
      id: Math.random().toString(36).substring(7),
      username: newUsername,
      password: newPassword,
      isSold: false,
    };
    
    selectedGame.loginCodes.push(newLoginCode);
    setGamesList([...gamesList]);
    setNewUsername('');
    setNewPassword('');
    setIsAddingAccount(false);
    toast.success('Account added successfully!');
  };
  
  const toggleSoldStatus = (gameId: string, codeId: string) => {
    const game = gamesList.find(g => g.id === gameId);
    if (game) {
      const loginCode = game.loginCodes.find(code => code.id === codeId);
      if (loginCode) {
        loginCode.isSold = !loginCode.isSold;
        setGamesList([...gamesList]);
      }
    }
    toast.success('Account status updated!');
  };
  
  const deleteLoginCode = (gameId: string, codeId: string) => {
    const game = gamesList.find(g => g.id === gameId);
    if (game) {
      game.loginCodes = game.loginCodes.filter(code => code.id !== codeId);
      setGamesList([...gamesList]);
    }
    toast.success('Account deleted successfully!');
  };
  
  const togglePasswordVisibility = (accountId: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [accountId]: !prev[accountId],
    }));
  };

  // Filter games based on search
  const filteredGames = gamesList.filter(
    (game) => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
        </div>
      </Layout>
    );
  }
  
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Games List */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-lg overflow-hidden">
              <div className="p-6 border-b border-slate-700">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Games
                </h2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search games..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-md border border-slate-700 bg-slate-900 pl-10 py-2 text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                </div>
              </div>
              
              <div className="max-h-[600px] overflow-y-auto">
                {filteredGames.length > 0 ? (
                  <div className="divide-y divide-slate-700">
                    {filteredGames.map((game) => (
                      <button
                        key={game.id}
                        onClick={() => setSelectedGame(game)}
                        className={`w-full flex items-center p-4 text-left hover:bg-slate-700 transition-colors ${
                          selectedGame?.id === game.id ? 'bg-slate-700' : ''
                        }`}
                      >
                        <img
                          src={game.imageUrl}
                          alt={game.title}
                          className="w-12 h-12 rounded-md object-cover mr-3"
                        />
                        <div>
                          <h3 className="text-sm font-medium text-white">{game.title}</h3>
                          <p className="text-xs text-slate-400">{game.platform}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-slate-400">No games found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Game Details and Login Codes */}
          <div className="lg:col-span-3">
            {selectedGame ? (
              <div className="bg-slate-800 rounded-lg overflow-hidden">
                <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    {selectedGame.title}
                    <span className="ml-2 text-sm font-normal text-slate-400">
                      (₹{selectedGame.price})
                    </span>
                  </h2>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsEditingGame(true)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Game
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => setIsAddingAccount(true)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Account
                    </Button>
                  </div>
                </div>
                
                {/* Game Login Codes */}
                <div className="p-6">
                  <h3 className="text-lg font-medium text-white mb-4">
                    Accounts ({selectedGame.loginCodes.length})
                  </h3>
                  
                  {selectedGame.loginCodes.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="border-b border-slate-700">
                          <tr>
                            <th className="p-3 text-xs uppercase text-slate-400 font-semibold">
                              Status
                            </th>
                            <th className="p-3 text-xs uppercase text-slate-400 font-semibold">
                              Username
                            </th>
                            <th className="p-3 text-xs uppercase text-slate-400 font-semibold">
                              Password
                            </th>
                            <th className="p-3 text-xs uppercase text-slate-400 font-semibold">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                          {selectedGame.loginCodes.map((loginCode) => (
                            <tr key={loginCode.id}>
                              <td className="p-3">
                                <span 
                                  className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${
                                    loginCode.isSold 
                                      ? 'bg-yellow-900/30 text-yellow-200' 
                                      : 'bg-green-900/30 text-green-200'
                                  }`}
                                >
                                  {loginCode.isSold ? 'Sold' : 'Available'}
                                </span>
                              </td>
                              <td className="p-3 text-white">
                                {loginCode.username}
                              </td>
                              <td className="p-3 text-white">
                                <div className="flex items-center">
                                  <span className="font-mono">
                                    {showPasswords[loginCode.id] ? loginCode.password : '••••••••'}
                                  </span>
                                  <button
                                    onClick={() => togglePasswordVisibility(loginCode.id)}
                                    className="ml-2 text-slate-400 hover:text-white"
                                  >
                                    {showPasswords[loginCode.id] ? (
                                      <EyeOff className="h-4 w-4" />
                                    ) : (
                                      <Eye className="h-4 w-4" />
                                    )}
                                  </button>
                                </div>
                              </td>
                              <td className="p-3">
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => toggleSoldStatus(selectedGame.id, loginCode.id)}
                                    className="text-sm text-purple-400 hover:text-purple-300"
                                  >
                                    Mark as {loginCode.isSold ? 'Available' : 'Sold'}
                                  </button>
                                  <button
                                    onClick={() => deleteLoginCode(selectedGame.id, loginCode.id)}
                                    className="text-sm text-red-400 hover:text-red-300 flex items-center"
                                  >
                                    <Trash2 className="h-3 w-3 mr-1" />
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="bg-slate-900 rounded-md p-8 text-center">
                      <p className="text-slate-400 mb-4">
                        No accounts added for this game yet.
                      </p>
                      <Button 
                        onClick={() => setIsAddingAccount(true)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Account
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-slate-800 rounded-lg p-8 text-center">
                <p className="text-slate-400 mb-4">
                  Select a game from the list to manage its accounts.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Add Account Modal */}
      {isAddingAccount && selectedGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50">
          <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="text-xl font-semibold text-white mb-4">
              Add New Account for {selectedGame.title}
            </h3>
            
            <div className="space-y-4">
              <Input
                label="Username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Enter account username"
                fullWidth
              />
              
              <Input
                label="Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter account password"
                fullWidth
              />
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setIsAddingAccount(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddAccount}>
                Add Account
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Game Modal */}
      {isEditingGame && selectedGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50">
          <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="text-xl font-semibold text-white mb-4">
              Edit Game
            </h3>
            
            <p className="text-slate-400 mb-4">Game editing functionality would go here.</p>
            
            <div className="mt-6 flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setIsEditingGame(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AdminPage;