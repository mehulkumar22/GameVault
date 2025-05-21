import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { GameType } from '../types';

interface CartItem extends GameType {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (game: GameType) => void;
  removeFromCart: (gameId: string) => void;
  clearCart: () => void;
  incrementQuantity: (gameId: string) => void;
  decrementQuantity: (gameId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial load
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const addToCart = (game: GameType) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === game.id);
      
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === game.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevItems, { ...game, quantity: 1 }];
    });
  };

  const removeFromCart = (gameId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== gameId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const incrementQuantity = (gameId: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === gameId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementQuantity = (gameId: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === gameId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        clearCart,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};