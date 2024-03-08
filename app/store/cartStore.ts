import { Item } from "@/types";
import { create } from "zustand";

interface CartStore {
  cartItems: Item[];
  setCartItems: (newCartItems: Item[]) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],
  addToCart: (newItem: any) => {
    set((state: any) => ({ cartItems: [...state.cartItems, newItem] }));
  },
  setCartItems: (newCartItems: Item[]) => set({ cartItems: newCartItems }),
}));
