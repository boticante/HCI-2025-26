"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { Event } from "@/types/event";
import { useUser } from "@/context/user-context";
import { createClient } from "@/lib/supabase/client";

export interface CartItem {
  event: Event;
  quantity: number;
  ticketType: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (event: Event, ticketType: string) => void;
  removeFromCart: (eventId: string) => void;
  updateQuantity: (eventId: string, quantity: number) => void;
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
  const { user } = useUser();
  const storageKey = user?.id ? `cart:${user.id}` : "cart:guest";
  const supabaseRef = useRef(createClient());

  const loadCartFromSupabase = async (userId: string) => {
    const { data, error } = await supabaseRef.current
      .from("cart_items")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    if (error) {
      setItems([]);
      return;
    }

    const mappedItems = (data ?? []).map((row) => ({
      event: {
        id: row.event_id,
        title: row.event_title,
        sport: row.event_sport,
        venue: row.event_venue,
        date: row.event_date,
        time: row.event_time ?? undefined,
        price: row.event_price,
        category: row.event_category,
      },
      quantity: row.quantity,
      ticketType: row.ticket_type,
    }));

    setItems(mappedItems);
  };

  const upsertCartItem = async (userId: string, item: CartItem) => {
    await supabaseRef.current.from("cart_items").upsert(
      {
        user_id: userId,
        event_id: item.event.id,
        event_title: item.event.title,
        event_sport: item.event.sport,
        event_venue: item.event.venue,
        event_date: item.event.date,
        event_time: item.event.time ?? null,
        event_price: item.event.price,
        event_category: item.event.category,
        ticket_type: item.ticketType,
        quantity: item.quantity,
      },
      { onConflict: "user_id,event_id" },
    );
  };

  const deleteCartItem = async (userId: string, eventId: string) => {
    await supabaseRef.current
      .from("cart_items")
      .delete()
      .eq("user_id", userId)
      .eq("event_id", eventId);
  };

  const updateCartItemQuantity = async (
    userId: string,
    eventId: string,
    quantity: number,
  ) => {
    await supabaseRef.current
      .from("cart_items")
      .update({ quantity })
      .eq("user_id", userId)
      .eq("event_id", eventId);
  };

  const clearCartItems = async (userId: string) => {
    await supabaseRef.current.from("cart_items").delete().eq("user_id", userId);
  };

  // Load cart from storage when user changes
  useEffect(() => {
    if (user?.id) {
      void loadCartFromSupabase(user.id);
      return;
    }

    const savedCart = localStorage.getItem(storageKey);
    if (savedCart) {
      setItems(JSON.parse(savedCart));
      return;
    }
    setItems([]);
  }, [storageKey, user?.id]);

  // Save cart to localStorage for guests only
  useEffect(() => {
    if (!user?.id) {
      localStorage.setItem(storageKey, JSON.stringify(items));
    }
  }, [items, storageKey, user?.id]);

  const addToCart = (event: Event, ticketType: string) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.event.id === event.id);
      let nextItems: CartItem[];

      if (existingItem) {
        nextItems = prevItems.map((item) =>
          item.event.id === event.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        nextItems = [...prevItems, { event, quantity: 1, ticketType }];
      }

      if (user?.id) {
        const updatedItem = nextItems.find(
          (item) => item.event.id === event.id,
        );
        if (updatedItem) {
          void upsertCartItem(user.id, updatedItem);
        }
      }

      return nextItems;
    });
  };

  const removeFromCart = (eventId: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.event.id !== eventId),
    );

    if (user?.id) {
      void deleteCartItem(user.id, eventId);
    }
  };

  const updateQuantity = (eventId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.event.id === eventId ? { ...item, quantity } : item,
      ),
    );

    if (user?.id) {
      void updateCartItemQuantity(user.id, eventId, quantity);
    }
  };

  const clearCart = () => {
    setItems([]);

    if (user?.id) {
      void clearCartItems(user.id);
    }
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotal = () => {
    return items.reduce(
      (total, item) => total + item.event.price * item.quantity,
      0,
    );
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
