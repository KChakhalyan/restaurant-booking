import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { name, email, guests, date } = await req.json();

    try {
        await prisma.reservation.create({
            data: {
                name,
                email,
                guests: Number(guests),
                date: new Date(date),
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Reservation error:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
