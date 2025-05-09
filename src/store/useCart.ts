import { create } from 'zustand';

export type CartItem = {
    id: string;
    name: string;
    price: number;
};

type CartState = {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    count: () => number;
};

export const useCart = create<CartState>((set, get) => ({
    items: [],
    addToCart: (item) =>
        set((state) => ({
            items: [...state.items, item],
        })),
    count: () => get().items.length,
}));
