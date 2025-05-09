import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getDishes() {
    return await prisma.dish.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
}
