'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/store/useCart';


const navItems = [
    { label: 'Menu', href: '/' },
    { label: 'Book a Table', href: '/book' },
];

export default function Navbar() {
    const pathname = usePathname();
    const { count } = useCart();

    return (
        <nav className="w-full px-6 py-4 bg-white shadow flex justify-between items-center">
            <div className="text-xl font-bold text-primary">Restaurant</div>
            <ul className="flex space-x-6">
                {navItems.map((item) => (
                    <li key={item.href}>
                        <Link
                            href={item.href}
                            className={`text-lg font-medium hover:text-primary transition ${pathname === item.href ? 'text-primary underline underline-offset-4' : 'text-gray-700'
                                }`}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
                <li className="relative">
                    <span className="text-sm bg-primary text-black rounded-full px-2 py-1">
                        🛒 {count()}
                    </span>
                </li>
            </ul>
        </nav>
    );
}
