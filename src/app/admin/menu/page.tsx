'use client';

import { useEffect, useState } from 'react';
import { Dish } from '@prisma/client';

export default function AdminMenuPage() {
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [form, setForm] = useState({
        name: '',
        description: '',
        image: '',
        price: '',
        category: '',
    });

    useEffect(() => {
        fetch('/api/admin/menu')
            .then((res) => res.json())
            .then((data) => setDishes(data));
    }, []);

    const handleCreate = async () => {
        const res = await fetch('/api/admin/menu', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...form, price: parseFloat(form.price) }),
        });

        const newDish = await res.json();
        setDishes((prev) => [...prev, newDish]);
        setForm({ name: '', description: '', image: '', price: '', category: '' });
    };

    const handleDelete = async (id: string) => {
        await fetch(`/api/admin/menu?id=${id}`, { method: 'DELETE' });
        setDishes((prev) => prev.filter((d) => d.id !== id));
    };

    return (
        <main className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Admin Menu</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {Object.entries(form).map(([key, value]) => (
                    <input
                        key={key}
                        name={key}
                        value={value}
                        placeholder={key}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="border p-2 rounded"
                    />
                ))}
                <button
                    onClick={handleCreate}
                    className="cursor-pointer border border-primary bg-blue-300 text-black px-4 py-2 rounded hover:opacity-90 col-span-full"
                >
                    Add Dish
                </button>
            </div>

            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Category</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {dishes.map((dish) => (
                        <tr key={dish.id} className="border-t">
                            <td className="p-2">{dish.name}</td>
                            <td className="p-2">${dish.price.toFixed(2)}</td>
                            <td className="p-2">{dish.category}</td>
                            <td className="p-2 text-center">
                                <button
                                    onClick={() => handleDelete(dish.id)}
                                    className="cursor-pointer text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}
