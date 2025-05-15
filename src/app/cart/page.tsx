'use client';

import { useCart } from '@/store/useCart'; // путь подкорректируй под себя

export default function CartPage() {
    const items = useCart((state) => state.items);
    const removeFromCart = useCart((state) => state.removeFromCart); // добавим это в store ниже
    const total = items.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

            {items.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
            ) : (
                <div className="space-y-4">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between bg-white p-4 rounded shadow"
                        >
                            <div>
                                <h2 className="font-semibold">{item.name}</h2>
                                <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700 text-sm"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <div className="flex justify-between font-bold text-lg border-t pt-4">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    <button
                        onClick={() => alert('Checkout coming soon!')}
                        className="w-full bg-primary text-white py-2 rounded hover:opacity-90"
                    >
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
}
