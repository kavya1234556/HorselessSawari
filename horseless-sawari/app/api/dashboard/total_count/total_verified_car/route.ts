import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const verified_car_count = await db.car.count({
      where: {
        isVerified: true,
      },
    });
    return NextResponse.json(
      { message: ' Total Cars', verified_car_count },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: 'Internal Server error', err },
      { status: 500 }
    );
  }
}
