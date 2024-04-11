import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const car_data = await db.car.findMany({
      where: {
        isVerified: false,
      },
    });
    const car_data_final = await Promise.all(
      car_data.map(async (car) => {
        let car_images_final = [];
        let bluebook_images_final = [];
        let insurance_images_final = [];
        const car_id = car.carID;

        const car_images = await db.car_image.findMany({
          where: {
            car_id: car_id,
          },
        });
        const bluebook_images = await db.bluebook_image.findMany({
          where: {
            car_id: car_id,
          },
        });
        const insurance_images = await db.insurance_image.findMany({
          where: {
            car_id: car_id,
          },
        });
        console.log('🚀 ~ car_data.map ~ car_images:', car_images);

        car_images.map((car_image) => {
          const image_endpoint = `${process.env.NEXTAUTH_URL}/api/car_image?id=${car_image.car_image_id}`;
          car_images_final.push(image_endpoint);
        });

        bluebook_images.map((bluebook_image) => {
          const image_endpoint = `${process.env.NEXTAUTH_URL}/api/dashboardM/bluebook_image?id=${bluebook_image.bluebook_image_id}`;
          bluebook_images_final.push(image_endpoint);
        });
        insurance_images.map((insurance_image) => {
          const image_endpoint = `${process.env.NEXTAUTH_URL}/api/dashboardM/insurance_image?id=${insurance_image.insurance_image_id}`;
          insurance_images_final.push(image_endpoint);
        });
        // @ts-ignore
        car.car_images = car_images_final;
        // @ts-ignore
        car.bluebook_images = bluebook_images_final;
        // @ts-ignore
        car.insurance_images = insurance_images_final;

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
