import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  CreditCard,
  AlertCircle
} from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { getRandomLoginCode, markLoginCodeAsSold } from '../data/games';
import toast from 'react-hot-toast';

const CartPage = () => {
  const { items, totalPrice, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Please login to continue checkout');
      navigate('/login?redirect=checkout');
      return;
    }
    
    // Check if login codes are available for all items
    const unavailableGames = items.filter(item => {
      const loginCode = getRandomLoginCode(item.id);
      return !loginCode;
    });

    if (unavailableGames.length > 0) {
      toast.error(`Some games are out of stock: ${unavailableGames.map(g => g.title).join(', ')}`);
      return;
    }
    
    // Simulate payment processing
    setIsProcessing(true);
    setTimeout(() => {
      // For each item, get a random login code and mark it as sold
      items.forEach(item => {
        const loginCode = getRandomLoginCode(item.id);
        if (loginCode) {
          markLoginCodeAsSold(item.id, loginCode.id);
        }
      });
      
      toast.success('Payment successful! Check your dashboard for account details.');
      clearCart();
      navigate('/dashboard');
      setIsProcessing(false);
    }, 2000);
  };
  
  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto bg-slate-800 rounded-lg p-8 text-center">
            <ShoppingBag className="mx-auto h-12 w-12 text-slate-500 mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4">Your Cart is Empty</h1>
            <p className="text-slate-400 mb-8">
              Looks like you haven't added any games to your cart yet.
            </p>
            <Link to="/games">
              <Button>
                Browse Games
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/games" className="inline-flex items-center text-sm text-slate-400 hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-8">Your Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-lg overflow-hidden">
              <div className="p-6 border-b border-slate-700">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-white">
                    Cart Items ({items.length})
                  </h2>
                  <button
                    onClick={() => clearCart()}
                    className="text-sm text-slate-400 hover:text-white flex items-center"
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    Clear Cart
                  </button>
                </div>
              </div>
              
              <div className="divide-y divide-slate-700">
                {items.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-md mr-4 mb-4 sm:mb-0"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-white">{item.title}</h3>
                      <p className="text-sm text-slate-400 mb-2">{item.platform}</p>
                      <div className="flex items-center">
                        <button
                          onClick={() => decrementQuantity(item.id)}
                          className="text-slate-400 hover:text-white p-1"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="mx-2 w-8 text-center text-white">{item.quantity}</span>
                        <button
                          onClick={() => incrementQuantity(item.id)}
                          className="text-slate-400 hover:text-white p-1"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end mt-4 sm:mt-0">
                      <span className="text-lg font-semibold text-white mb-2">
                        ₹{item.price * item.quantity}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-400 flex items-center text-sm"
                      >
                        <Trash2 className="mr-1 h-4 w-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-slate-800 rounded-lg p-6 sticky top-20">
              <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="text-white">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tax</span>
                  <span className="text-white">₹0</span>
                </div>
                <div className="border-t border-slate-700 pt-4 flex justify-between">
                  <span className="font-medium text-white">Total</span>
                  <span className="font-bold text-xl text-white">₹{totalPrice}</span>
                </div>
              </div>
              
              <Button
                fullWidth
                onClick={handleCheckout}
                isLoading={isProcessing}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Proceed to Checkout
              </Button>
              
              <div className="mt-6 text-xs text-slate-400">
                <div className="flex items-start mb-2">
                  <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-slate-500" />
                  <p>
                    Account details will be provided instantly after successful payment.
                    You can view your purchased accounts in your dashboard.
                  </p>
                </div>
                <p className="mt-2">
                  By proceeding with the purchase, you agree to our Terms of Service
                  and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;