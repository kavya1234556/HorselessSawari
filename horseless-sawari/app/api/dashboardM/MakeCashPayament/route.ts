import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const share_car_data = await db.booked_car.findMany();
    await Promise.all(
      share_car_data.map(async (sharingDetail) => {
        let car_image = [];
        const car_id = sharingDetail.car_id;
        const car_detail = await db.car.findUnique({
          where: {
            carID: car_id,
          },
        });
        const car_images = await db.car_image.findMany({
          where: {
            car_id: car_id,
          },
        });
        // @ts-ignore
        sharingDetail.registration_num = car_detail.registration_num;

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
    return NextResponse.json(
      { message: 'Enternal Server error', err },
      { status: 200 }
    );
  }
}
