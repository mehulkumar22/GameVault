import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingCart, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Search, 
  Package, 
  Home, 
  Settings,
  Gamepad2,
  ChevronLeft
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import Button from '../ui/Button';
import { games } from '../../data/games';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenus();
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = games.filter(game =>
        game.title.toLowerCase().includes(query.toLowerCase()) ||
        game.genre.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const navItems = [
    { label: 'Store', path: '/', icon: <Home size={16} /> },
    { label: 'Library', path: '/games', icon: <Gamepad2 size={16} /> },
  ];

  if (user?.role === 'admin') {
    navItems.push({ label: 'Admin', path: '/admin', icon: <Settings size={16} /> });
  }

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-[#121212]/90 backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Back Button (Mobile) */}
          <button className="md:hidden text-gray-400 hover:text-white">
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl font-bold text-white"
            onClick={closeMenus}
          >
            <Gamepad2 className="h-7 w-7 text-white" />
            <span className="hidden md:inline">GameVault</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="hidden md:block flex-1 max-w-xl mx-8 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search store"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full h-10 rounded-full bg-[#202020] px-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white/20"
              />
              <Search className="absolute right-4 top-3 h-4 w-4 text-gray-400" />
            </div>

            {/* Search Results Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#202020] rounded-lg shadow-xl overflow-hidden z-40">
                {searchResults.map((game) => (
                  <Link
                    key={game.id}
                    to={`/games/${game.id}`}
                    className="flex items-center p-3 hover:bg-[#2a2a2a] transition-colors"
                  >
                    <img
                      src={game.imageUrl}
                      alt={game.title}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div className="ml-3">
                      <p className="text-sm text-white">{game.title}</p>
                      <p className="text-xs text-gray-400">{game.genre}</p>
                    </div>
                    <span className="ml-auto text-sm text-white">₹{game.price}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-gray-400 hover:text-white"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-xs font-medium text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Profile */}
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white"
                >
                  <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                    <span className="text-sm font-medium">{user.name[0]}</span>
                  </div>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded bg-[#202020] py-1 shadow-xl">
                    <div className="border-b border-gray-700 px-4 py-2">
                      <p className="text-sm font-medium text-white">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white"
                      onClick={closeMenus}
                    >
                      <Package className="mr-2 h-4 w-4" />
                      My Library
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-400 hover:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#202020] border-t border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium ${
                    location.pathname === item.path
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
                  onClick={closeMenus}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
