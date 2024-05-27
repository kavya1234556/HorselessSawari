import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const id = new URL(req.url).searchParams.get('id'); //getting the id through the url
    const car_data = await db.car.findMany({
      where: {
        location_id: Number(id),
        isVerified: true,
        isBooked: false,
      },
    }); //filttering all the car  data with id which are verified and is not booked
    const car_data_final = await Promise.all(
      car_data.map(async (car) => {
        let car_images_final = []; //creating a new array for storing car detail with image
        const car_id = car.carID; //storing the carID in car_id
        const car_images = await db.car_image.findMany({
          where: {
            car_id: car_id,
          },
        }); //filttering all the image from the car image with the car_id
        console.log('🚀 ~ car_data.map ~ car_images:', car_images);

        car_images.map((car_image) => {
          const image_endpoint = `${process.env.NEXTAUTH_URL}/api/car_image?id=${car_image.car_image_id}`;
          car_images_final.push(image_endpoint);
        }); //creating an endpoint for the image with car image id and storing it on the array
        // @ts-ignore
        car.car_images = car_images_final; //adding image endpoint in the car detail
        return car; //using promise all for ensuring all the promise is resolved
      })
    );

    return NextResponse.json(
      { message: 'Car fetched Successfully', car_data_final },
      { status: 200 }
    ); //in success
  } catch (err) {
    return NextResponse.json(
      { message: 'An error occurred', error: err.message },
      { status: 500 }
    ); //in error
  }
}
