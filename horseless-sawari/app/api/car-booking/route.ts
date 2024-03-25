import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  console.log('Heelo');
  try {
    const carID = new URL(req.url).searchParams.get('car_id');
    const body = await req.json();
    const {
      location_id,
      pickUpDate,
      pickUpTime,
      dropOffDate,
      dropOffTime,
      totalPrice,
      ServiceCharge,
      serviceWithCharge,
      pickUpLocation,
      dropOffLoction,
      is_shared,
      sharingCharge,
      user_id,
    } = body;
    console.log(location_id, 'location_id');
    console.log(pickUpDate);
    console.log(pickUpTime);
    console.log(dropOffDate);
    console.log(dropOffTime);
    console.log(totalPrice);
    console.log(ServiceCharge);
    console.log(serviceWithCharge);
    console.log(pickUpLocation);
    console.log(dropOffLoction);
    console.log(is_shared);
    console.log(sharingCharge);
    const newBooking = await db.booked_car.create({
      data: {
        location_id: Number(location_id),
        pickUpDate: new Date(pickUpDate),
        pickUpTime,
        dropOffDate: new Date(dropOffDate),
        dropOffTime,
        totalPrice,
        ServiceCharge,
        serviceWithCharge,
        pickUpLocation,
        dropOffLoction,
        is_shared,
        sharingCharge,
        user_id,
        car_id: Number(carID),
      },
    });
    console.log('hello', newBooking);
    return NextResponse.json(
      { message: 'Booking Succesfull', newBooking },
      { status: 201 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: 'something went wrong' },
      { status: 500 }
    );
  }
}
