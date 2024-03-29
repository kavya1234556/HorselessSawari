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
    const newBooking = await db.booked_car.create({
      data: {
        location_id: location_id,
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

    await db.car.update({
      where: {
        carID: Number(carID),
      },
      data: { isBooked: true },
    });

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

export async function GET(req: Request) {
  try {
    console.log('Hello');
    const carID = new URL(req.url).searchParams.get('car_id');
    const new_car_data = [];
    const car_data_old = await db.booked_car.findUnique({
      where: {
        car_id: Number(carID),
      },
    });
    new_car_data.push(car_data_old);
    const car_data_final = await Promise.all(
      new_car_data.map(async (car) => {
        let car_images_final = [];
        const car_id = car.car_id;
        const car_images = await db.car_image.findMany({
          where: {
            car_id: car_id,
          },
        });
        console.log('🚀 ~ car_data.map ~ car_images:', car_images);

        car_images.map((car_image) => {
          const image_endpoint = `${process.env.NEXTAUTH_URL}/api/car_image?id=${car_image.car_image_id}`;
          car_images_final.push(image_endpoint);
        });
        // @ts-ignore
        car.car_images = car_images_final;
        return car;
      })
    );

    return NextResponse.json(
      { message: 'Car fetched Successfully', car_data_final },
      { status: 200 }
    );
  } catch (e) {}
}
