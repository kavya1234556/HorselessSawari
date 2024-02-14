import { db } from '@/lib/db';
import * as fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';
import * as yup from 'yup';

enum FuelType {
  DISEL = 'DISEL',
  GAS = 'GAS',
  ELECTRIC = 'ELECTRIC',
}

interface ICarType {
  onwerName: string;
  manufacture: string;
  registration_num: number;
  features: string;
  no_of_seats: number;
  fuel_Type: FuelType;
  color: string;
  Total_km: number;
  car_images: [];
  bluebook_img: [];
  insurance_img: [];
  pricing_per_hour: number;
  pricing_per_four_hour: number;
  pricing_per_eight_hour: number;
  pricing_per_day: number;
  isBooked: boolean;
  isVerified: boolean;
  user_id: number;
  location_id: number;
  user_role: string;
}
export async function GET(req: Request) {
  try {
    const car_data = await db.car.findMany({
      where: {
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
const carSchema = yup.object().shape({
  onwerName: yup.string().required(),
  manufacture: yup.string().required(),
  registration_num: yup.number().required(),
  features: yup.string().required(),
  no_of_seats: yup.number().required(),
  color: yup.string().required(),
  Total_km: yup.number().required(),
  car_images: yup.array().of(yup.mixed().required()).required(),
  bluebook_img: yup.array().of(yup.mixed().required()).required(),
  insurance_img: yup.array().of(yup.mixed().required()).required(),
  pricing_per_hour: yup.number().required(),
  pricing_per_four_hour: yup.number().required(),
  pricing_per_eight_hour: yup.number().required(),
  pricing_per_day: yup.number().required(),
  isBooked: yup.bool().required(),
  isVerified: yup.bool().required(),
  fuel_Type: yup.mixed<FuelType>().oneOf(Object.values(FuelType)).required(),
  user_id: yup.number().required(),
  user_role: yup.string().required(),
  location_id: yup.string().required(),
});

export async function POST(req: Request) {
  try {
    const body = await req.formData();
    const ownerName = body.get('ownerName');
    const manufacture = body.get('manufacture');
    const registration_num = body.get('registration_num');
    const features = body.get('features');
    const no_of_seats = body.get('no_of_seats');
    const color = body.get('color');
    const Total_km = body.get('Total_km');
    const fuel_Type = body.get('fuel_Type');
    const pricing_per_hour = body.get('pricing_per_hour');
    const pricing_per_four_hour = body.get('pricing_per_four_hour');
    const pricing_per_eight_hour = body.get('pricing_per_eight_hour');
    const pricing_per_day = body.get('pricing_per_day');
    const isBooked = body.get('isBooked');
    const isVerified = body.get('isVerified');
    const user_id = body.get('user_id');
    const location_id = body.get('location_id');
    const car_file = body.getAll('car_images');
    let final_car_images = [];
    await Promise.all(
      car_file.map(async (carFile) => {
        // @ts-ignore
        const ab_car = await carFile.arrayBuffer();
        const bf_car = Buffer.from(ab_car);
        const cwd_car = process.cwd();

        await fs.promises.writeFile(
          // @ts-ignore
          path.join(cwd_car, 'app/api/car/images/car_images', carFile.name),
          bf_car,
          { encoding: 'binary' }
        );
        // @ts-ignore
        const car_images = 'app/api/car/images/car_images/' + carFile.name;
        final_car_images.push(car_images);
        return car_images;
      })
    );

    const insurance_file = body.getAll('insurance_img');
    let final_insurance_image = [];
    await Promise.all(
      insurance_file.map(async (insuranceFile) => {
        // @ts-ignore
        const ab_insurance = await insuranceFile.arrayBuffer();
        const bf_insurance = Buffer.from(ab_insurance);
        const cwd_insurance = process.cwd();
        await fs.promises.writeFile(
          path.join(
            cwd_insurance,
            'app/api/car/images/insurance_images',
            // @ts-ignore
            insuranceFile.name
          ),
          bf_insurance,
          {
            encoding: 'binary',
          }
        );
        const insurance_images =
          // @ts-ignore
          'app/api/car/images/insurance_images' + insuranceFile.name;
        final_insurance_image.push(insurance_images);
        return insurance_images;
      })
    );
    const user = await db.user.findUnique({
      where: {
        id: Number(user_id),
      },
    });
    const bluebook_file = body.getAll('bluebook_img');
    let final_Bluebook_image = [];
    await Promise.all(
      bluebook_file.map(async (bluebookFile) => {
        // @ts-ignore
        const ab_bluebook = await bluebookFile.arrayBuffer();
        const bf_bluebook = Buffer.from(ab_bluebook);
        const cwd_bluebook = process.cwd();
        await fs.promises.writeFile(
          path.join(
            cwd_bluebook,
            'app/api/car/images/bluebook_images',
            // @ts-ignore
            bluebookFile.name
          ),
          bf_bluebook,
          {
            encoding: 'binary',
          }
        );
        const bluebook_images =
          // @ts-ignore
          'app/api/car/images/bluebook_images' + bluebookFile.name;
        final_Bluebook_image.push(bluebook_images);
        return bluebook_images;
      })
    );
    const body_ = {
      onwerName: String(ownerName),
      manufacture: String(manufacture),
      registration_num: Number(registration_num),
      features: String(features),
      no_of_seats: Number(no_of_seats),
      color: String(color),
      Total_km: Number(Total_km),
      fuel_Type: fuel_Type as FuelType,
      pricing_per_hour: Number(pricing_per_hour),
      pricing_per_four_hour: Number(pricing_per_four_hour),
      pricing_per_eight_hour: Number(pricing_per_eight_hour),
      pricing_per_day: Number(pricing_per_day),
      isBooked: Boolean(isBooked),
      isVerified: Boolean(isVerified),
      user_id: Number(user_id),
      // Car_Images: [],
      // insurance_img: [],
      // bluebook_img: [],
      location_id: Number(location_id),
      user_role: user.role,
    };
    console.log(body_);
    // await carSchema.validate(body_)

    const createdCar: any = await db.car.create({
      data: body_,
    });
    final_car_images.map(async (image) => {
      const body_car_image = {
        car_image: image,
        car_id: createdCar.carID,
      };
      await db.car_image.create({
        data: body_car_image,
      });
    });

    final_Bluebook_image.map(async (image) => {
      const body_bluebook_image = {
        bluebook_image: image,
        car_id: createdCar.carID,
      };
      await db.bluebook_image.create({
        data: body_bluebook_image,
      });
    });

    final_insurance_image.map(async (image) => {
      const body_insurance_image = {
        insurance_image: image,
        car_id: createdCar.carID,
      };
      await db.insurance_image.create({
        data: body_insurance_image,
      });
    });

    return NextResponse.json(
      { message: 'Car added Successfully', createdCar },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    } else {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
