import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const fuel = new URL(req.url).searchParams.get('value');
    console.log('🚀 ~ GET ~ fuel:', fuel);
    const getCarByFuel = await db.car.findMany({
      where: {
        ///@ts-ignore
        fuel_Type: fuel,
      },
    });
    console.log(getCarByFuel);
    if (!getCarByFuel) {
      return NextResponse.json({ error: 'Car not available' }, { status: 404 });
    }
    return NextResponse.json(
      { message: 'Cars retrieved successfully', getCarByFuel },
      { status: 200 }
    );
  } catch (err) {
    console.log('error', err);
  }
}
