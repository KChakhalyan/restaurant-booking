import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';

const prisma = new PrismaClient();

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                // 🔐 Здесь реальная проверка из базы
                if (credentials?.email === 'admin@example.com' && credentials.password === '123456') {
                    return {
                        id: '1',
                        name: 'Admin',
                        email: 'admin@example.com',
                        role: 'admin', // 👈 обязательно для ролевой системы
                    };
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            session.user.role = token.role;
            return session;
        },
        async jwt({ token, user }) {
            if (user) token.role = user.role;
            return token;
        },
    },
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
