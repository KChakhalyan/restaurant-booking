import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
    id: string;
    name: string;
    price: number;
};

type CartState = {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    count: () => number;
};

export const useCart = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addToCart: (item) =>
                set((state) => ({
                    items: [...state.items, item],
                })),
            removeFromCart: (id) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                })),
            count: () => get().items.length,
        }),
        {
            name: 'cart-storage', // ключ в localStorage
        }
    )
);
