// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role?: string; // 👈 Добавляем роль
        };
    }

    interface User {
        role?: string; // 👈 Также добавим в User
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: string; // 👈 Добавляем в токен
    }
}
