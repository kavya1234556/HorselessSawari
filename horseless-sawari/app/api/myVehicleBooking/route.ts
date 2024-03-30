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
    const BookindDetail = await db.booked_car.findUnique({
      where: {
        car_id: Number(car_data_old.map((item) => item.carID)),
      },
    });
    return NextResponse.json(
      { message: 'Car fetched Successfully', BookindDetail },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
  }
}
