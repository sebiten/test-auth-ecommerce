import { Item } from "@/types";
import { create } from "zustand";

interface CartStore {
  cartItems: Item[];
  addToCart: (newItem: Item) => void;
  setCartItems: (newCartItems: Item[]) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],
  addToCart: (newItem: Item) => {
    set((state: CartStore) => ({ cartItems: [...state.cartItems, newItem] }));
  },
  setCartItems: (newCartItems: Item[]) => set({ cartItems: newCartItems }),
}));
