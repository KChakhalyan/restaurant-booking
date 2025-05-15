import { create } from 'zustand';


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

export const useCart = create<CartState>((set, get) => ({
    items: [],
    addToCart: (item) =>
        set((state) => ({
            items: [...state.items, item],
        })),
    removeFromCart: (id: string) =>
        set((state) => ({
            items: state.items.filter((item) => item.id !== id),
        })),
    count: () => get().items.length,
}));
