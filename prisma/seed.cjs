const { PrismaClient } = require('../src/generated/prisma');
const prisma = new PrismaClient();

async function main() {
    await prisma.dish.createMany({
        data: [
            {
                name: 'Grilled Salmon',
                description: 'Fresh Atlantic salmon grilled to perfection.',
                image: '/images/salmon.jpg',
                price: 24.99,
                category: 'Main',
            },
            {
                name: 'Caesar Salad',
                description: 'Crispy romaine, creamy Caesar dressing, croutons.',
                image: '/images/caesar.jpg',
                price: 12.5,
                category: 'Starter',
            },
        ],
    });
}

main()
    .then(() => console.log('✅ Seeded successfully'))
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
