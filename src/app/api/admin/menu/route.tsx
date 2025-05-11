import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    const dishes = await prisma.dish.findMany();
    return NextResponse.json(dishes);
}

export async function POST(req: NextRequest) {
    const data = await req.json();
    const dish = await prisma.dish.create({ data });
    return NextResponse.json(dish);
}

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    await prisma.dish.delete({ where: { id } });
    return NextResponse.json({ success: true });
}
