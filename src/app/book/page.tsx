'use client';

import { useState } from 'react';

export default function BookingPage() {
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        const name = formData.get('name')?.toString() || '';
        const email = formData.get('email')?.toString() || '';
        const guests = parseInt(formData.get('guests')?.toString() || '1');
        const date = formData.get('date')?.toString() || '';

        try {
            const res = await fetch('/api/reserve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, guests, date }),
            });

            if (res.ok) {
                form.reset();
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <main className="max-w-xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Book a Table</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" required placeholder="Your Name" className="w-full border p-2 rounded" />
                <input name="email" type="email" required placeholder="Email" className="w-full border p-2 rounded" />
                <input name="guests" type="number" min="1" required placeholder="Guests" className="w-full border p-2 rounded" />
                <input name="date" type="datetime-local" required className="w-full border p-2 rounded" />

                <button type="submit" className="bg-primary text-white py-2 px-4 rounded hover:opacity-90">
                    Reserve
                </button>

                {status === 'success' && <p className="text-green-600">✅ Reservation sent!</p>}
                {status === 'error' && <p className="text-red-600">❌ Something went wrong.</p>}
            </form>
        </main>
    );
}
