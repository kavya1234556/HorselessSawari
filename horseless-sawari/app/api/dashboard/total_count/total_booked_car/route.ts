import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const total_booked_car = await db.booked_car.count();
    return NextResponse.json(
      { message: 'Total Booked Car', total_booked_car },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: 'Internal Server error', err },
      { status: 500 }
    );
  }
}
