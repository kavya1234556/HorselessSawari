import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    console.log('Hello');
    const share_car_data = await db.booked_car.findMany({
      where: {
        is_shared: true,
        is_shared_accepted: false,
      },
    });
    const share_data = await Promise.all(
      share_car_data.map(async (sharingDetail) => {
        let car_image = [];
        const car_id = sharingDetail.car_id;
        const car_images = await db.car_image.findMany({
          where: {
            car_id: car_id,
          },
        });

        car_images.map((image) => {
          const image_endpoint = `${process.env.NEXTAUTH_URL}/api/car_image?id=${image.car_image_id}`;
          car_image.push(image_endpoint);
        });
        // @ts-ignore
        sharingDetail.car_images = car_image;
      })
    );

    return NextResponse.json(
      { share_car_data, message: 'Car fetched Successfully' },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
  }
}

export async function POST(req: Request) {
  try {
    const userID = new URL(req.url).searchParams.get('id');
    const body = await req.json();
    const { booked_car_id, share_price } = body;

    const shareDetail = await db.car_shared.create({
      data: {
        sharind_price: share_price,
        user: {
          connect: { id: Number(userID) },
        },
        booked_car: {
          connect: { booked_car_id: Number(booked_car_id) },
        },
      },
    });
    await db.booked_car.update({
      where: {
        booked_car_id: Number(booked_car_id),
      },
      data: {
        is_shared: false,
        is_shared_accepted: true,
      },
    });
    return NextResponse.json(
      { message: 'car_shared created successfully', shareDetail },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: 'Internal Server Error', e },
      { status: 500 }
    );
  }
}
