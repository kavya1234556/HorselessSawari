import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const id = new URL(req.url).searchParams.get('id');
    const car_data = await db.car.findMany({
      where: {
        carID: Number(id),
        isVerified: true,
      },
    });
    const car_data_final = await Promise.all(
      car_data.map(async (car) => {
        let car_images_final = [];
        const car_id = car.carID;
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
  } catch (err) {
    return NextResponse.json(
      { message: 'An error occurred', error: err.message },
      { status: 500 }
    );
  }
}
