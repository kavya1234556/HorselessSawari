export const dynamic = 'force-dynamic';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const user_id = new URL(req.url).searchParams.get('id');
    const car_data_old = await db.car.findMany({
      where: {
        user_id: Number(user_id),
        isVerified: true,
      },
    });

    // Fetch booking details for each car
    const car_data_final = await Promise.all(
      car_data_old.map(async (car) => {
        const bookingDetail = await db.booked_car.findUnique({
          where: {
            car_id: car.carID,
          },
        });
        return bookingDetail;
      })
    );

    return NextResponse.json(
      { message: 'Car fetched Successfully', car_data_final },
      { status: 200 }
    );
  } catch (e) {
    console.error('Error:', e);
  }
}
