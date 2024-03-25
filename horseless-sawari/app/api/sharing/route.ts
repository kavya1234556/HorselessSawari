import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    console.log('Hello');
    const share_car_data = await db.booked_car.findMany({
      where: {
        is_shared: true,
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
