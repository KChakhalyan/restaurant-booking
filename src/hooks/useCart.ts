import { useState } from 'react';

export type CartItem = {
    id: string;
    name: string;
    price: number;
};

export function useCart() {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCart((prev) => [...prev, item]);
    };

    return {
        cart,
        addToCart,
        count: cart.length,
    };
}
