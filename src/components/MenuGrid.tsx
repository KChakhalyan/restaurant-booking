'use client';

import { useState } from 'react';
import { useCart } from '@/store/useCart';

type Dish = {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
};

export default function MenuGrid({ dishes }: { dishes: Dish[] }) {
    const [filter, setFilter] = useState<'All' | 'Starter' | 'Main' | 'Dessert'>('All');
    const { addToCart } = useCart();

    const filteredDishes = filter === 'All'
        ? dishes
        : dishes.filter((dish) => dish.category === filter);

    return (
        <>
            <div className="mb-6 flex gap-4">
                {['All', 'Starter', 'Main', 'Dessert'].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat as any)}
                        className={`px-4 py-2 rounded-full border cursor-pointer ${filter === cat
                            ? 'bg-primary text-black'
                            : 'bg-white text-gray-700 border-gray-300'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDishes.map((dish) => (
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
                                onClick={() =>
                                    addToCart({ id: dish.id, name: dish.name, price: dish.price })
                                }
                                className="cursor-pointer mt-4 bg-primary border border-primary text-black px-4 py-2 rounded hover:opacity-90"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
