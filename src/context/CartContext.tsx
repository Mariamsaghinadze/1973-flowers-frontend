"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "cartItems";

export type CartItem = {
  productId: string;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getQuantity: (productId: string) => number;
  isInCart: (productId: string) => boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);

      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to read cart from localStorage", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cartItems, isHydrated]);

  const addToCart = (productId: string) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.productId === productId);

      if (existingItem) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { productId, quantity: 1 }];
    });
  };

  const increaseQuantity = (productId: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (productId: string) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear cart from localStorage", error);
    }
  };

  const getQuantity = (productId: string) => {
    return (
      cartItems.find((item) => item.productId === productId)?.quantity ?? 0
    );
  };

  const isInCart = (productId: string) => {
    return cartItems.some((item) => item.productId === productId);
  };

  const value = useMemo(
    () => ({
      cartItems,
      setCartItems,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart,
      getQuantity,
      isInCart,
    }),
    [cartItems, getQuantity, isInCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
