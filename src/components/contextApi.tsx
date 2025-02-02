"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// Define the CartItem interface (without stock-related fields)
export interface CartItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

// Define the CartContextType
type CartContextType = {
  cartItems: CartItem[];
  wishlist: CartItem[];
  addToCart: (item: CartItem) => void;
  addToWishlist: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  clearCart: () => void;
  clearWishlist: () => void;
  decreaseQuantity: (id: string) => void;
};

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Define the CartProvider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<CartItem[]>([]);

  // Save to localStorage whenever cartItems or wishlist changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("Saving cartItems and wishlist to localStorage");
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      localStorage.setItem("wishlistItems", JSON.stringify(wishlist));
    }
  }, [cartItems, wishlist]);

  // Load from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cartItems");
      const storedWishlist = localStorage.getItem("wishlistItems");

      console.log("Loading cartItems and wishlist from localStorage");

      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    }
  }, []);

  // Add to Cart
  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  // Add to Wishlist
  const addToWishlist = (item: CartItem) => {
    setWishlist((prevItems) => {
      const existingItem = prevItems.find(
        (wishlistItem) => wishlistItem.id === item.id
      );
      if (existingItem) {
        return prevItems;
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  // Remove from Cart
  const removeFromCart = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.id !== id)
    );
  };

  // Remove from Wishlist
  const removeFromWishlist = (id: string) => {
    setWishlist((prevItems) =>
      prevItems.filter((wishlistItem) => wishlistItem.id !== id)
    );
  };

  // Clear Cart
  const clearCart = () => setCartItems([]);

  // Clear Wishlist
  const clearWishlist = () => setWishlist([]);

  // Decrease Quantity in Cart
  const decreaseQuantity = (id: string) => {
    setCartItems((prevItems) =>
      prevItems
        .map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlist,
        addToCart,
        addToWishlist,
        removeFromCart,
        removeFromWishlist,
        clearCart,
        clearWishlist,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook to use the Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};