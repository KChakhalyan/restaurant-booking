'use client';

import { useRouter } from 'next/navigation';
import { CartItem, useCart } from '@/hooks/useCart';

type Dish = {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
};

export default function MenuGrid({ dishes }: { dishes: Dish[] }) {
    const { addToCart } = useCart();
    const router = useRouter();

    const handleAdd = (dish: Dish) => {
        addToCart({
            id: dish.id,
            name: dish.name,
            price: dish.price,
        });

        router.push('/cart'); // переходит на страницу корзины
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dishes.map((dish) => (
                <div
                    key={dish.id}
                    className="rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition duration-300 group"
                >
                    <div className="h-48 overflow-hidden">
                        <img
                            src={dish.image}
                            alt={dish.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <div className="p-4">
                        <h2 className="text-xl font-semibold text-gray-800 mb-1">{dish.name}</h2>
                        <p className="text-gray-500 text-sm mb-3">{dish.description}</p>
                        <div className="text-primary font-bold text-lg">${dish.price.toFixed(2)}</div>

                        <button
                            onClick={() => handleAdd(dish)}
                            className="mt-4 bg-primary text-black border border-primary cursor-pointer px-4 py-2 rounded hover:opacity-90"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
