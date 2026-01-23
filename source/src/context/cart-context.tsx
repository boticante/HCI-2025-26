'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Event } from '@/types/event';

export interface CartItem {
  event: Event;
  quantity: number;
  ticketType: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (event: Event, ticketType: string) => void;
  removeFromCart: (eventId: number) => void;
  updateQuantity: (eventId: number, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotal: () => number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getItemCount: () => 0,
  getTotal: () => 0,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (event: Event, ticketType: string) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.event.id === event.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.event.id === event.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { event, quantity: 1, ticketType }];
    });
  };

  const removeFromCart = (eventId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.event.id !== eventId));
  };

  const updateQuantity = (eventId: number, quantity: number) => {
    if (quantity < 1) return;
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.event.id === eventId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + item.event.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemCount,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
