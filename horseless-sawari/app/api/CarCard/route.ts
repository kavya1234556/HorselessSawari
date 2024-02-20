import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  console.log('Get Request');
  try {
    const CarDetail = await db.car.findMany({
      where: {
        isVerified: false,
      },
    });

    if (!CarDetail) {
      return NextResponse.json({ error: 'Car not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Cars retrieved successfully', CarDetail },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
