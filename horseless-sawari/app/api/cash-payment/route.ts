import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const BookingData = await db.booked_car.findMany({
      where: {
        isPaid: false,
      },
      include: {
        user: true,
      },
    });
    return NextResponse.json(
      { message: 'Booked car data fetched', BookingData },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: 'Booked car data unable to fetch', e },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { car_booking_id, total_amount, user_id } = body;
    await db.transaction.create({
      data: {
        total_amount: total_amount,
        status: 'Completed',
        transaction_id: uuidv4(),
        Date: new Date(),
        paymentMethod: 'CASH',
        user: { connect: { id: Number(user_id) } },
        booked_car: { connect: { booked_car_id: Number(car_booking_id) } },
      },
    });
    await db.booked_car.update({
      where: { booked_car_id: Number(car_booking_id) },
      data: { isPaid: true },
    });
    return NextResponse.json(
      { message: 'Car added Successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
}
