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
  car_image: string[];
  bluebook_image: string[];
  insurance_image: string[];
  insurance_valid_date: number;
  pricing_per_hour: number;
  pricing_per_four_hour: number;
  pricing_per_eight_hour: number;
  pricing_per_day: number;
  is_booked: boolean;
  is_verified: boolean;
  user_id: number;
}

export async function GET(req: Request) {
  console.log('Get Request');
  try {
    const user_id = new URL(req.url).searchParams.get('id');
  } catch (err) {
    console.log('error', err);
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
  car_image: yup.array().of(yup.mixed().required()).required(),
  bluebook_image: yup.array().of(yup.mixed().required()).required(),
  insurance_image: yup.array().of(yup.mixed().required()).required(),
  insurance_valid_date: yup.number().required(),
  pricing_per_hour: yup.number().required(),
  pricing_per_four_hour: yup.number().required(),
  pricing_per_eight_hour: yup.number().required(),
  pricing_per_day: yup.number().required(),
  is_booked: yup.bool().required(),
  is_verified: yup.bool().required(),
  fuel_Type: yup.mixed<FuelType>().oneOf(Object.values(FuelType)).required(),
  user_id: yup.number().required(),
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
    console.log(body.get('Total_km'));
    const insurance_valid_date = body.get('insurance_valid_date');
    console.log(body.get('insurance_valid_date'));
    const fuel_Type = body.get('fuel_Type');
    const pricing_per_hour = body.get('pricing_per_hour');
    const pricing_per_four_hour = body.get('pricing_per_four_hour');
    const pricing_per_eight_hour = body.get('pricing_per_eight_hour');
    const pricing_per_day = body.get('pricing_per_day');
    const is_booked = body.get('is_booked');
    const is_verified = body.get('is_verified');
    const user_id = body.get('user_id');

    const car_file = body.get('car_image');
    const ab_car = await car_file.arrayBuffer();
    const bf_car = Buffer.from(ab_car);
    const cwd_car = process.cwd();
    await fs.promises.writeFile(
      path.join(cwd_car, 'app/api/car/images/car_images', car_file.name),
      bf_car,
      {
        encoding: 'binary',
      }
    );
    const car_images = 'app/api/car/images/car_images' + car_file.name;

    const insurance_file = body.get('insurance_image');
    const ab_insurance = await insurance_file.arrayBuffer();
    const bf_insurance = Buffer.from(ab_insurance);
    const cwd_insurance = process.cwd();
    await fs.promises.writeFile(
      path.join(
        cwd_insurance,
        'app/api/car/images/insurance_images',
        insurance_file.name
      ),
      bf_insurance,
      {
        encoding: 'binary',
      }
    );
    const insurance_images =
      'app/api/car/images/insurance_images' + insurance_file.name;

    const bluebook_file = body.get('bluebook_image');
    const ab_bluebook = await bluebook_file.arrayBuffer();
    const bf_bluebook = Buffer.from(ab_bluebook);
    const cwd_bluebook = process.cwd();
    await fs.promises.writeFile(
      path.join(
        cwd_bluebook,
        'app/api/car/images/bluebook_images',
        bluebook_file.name
      ),
      bf_insurance,
      {
        encoding: 'binary',
      }
    );
    const bluebook_images =
      'app/api/car/images/bluebook_images' + bluebook_file.name;

    const body_ = {
      onwerName: String(ownerName),
      manufacture: String(manufacture),
      registration_num: Number(registration_num),
      features: String(features),
      no_of_seats: Number(no_of_seats),
      color: String(color),
      Total_km: Number(Total_km),
      fuel_Type: fuel_Type as FuelType,
      insurance_valid_date: Number(insurance_valid_date), // Parse string to Date
      pricing_per_hour: Number(pricing_per_hour),
      pricing_per_four_hour: Number(pricing_per_four_hour),
      pricing_per_eight_hour: Number(pricing_per_eight_hour),
      pricing_per_day: Number(pricing_per_day),
      is_booked: Boolean(is_booked),
      is_verified: Boolean(is_verified),
      user_id: Number(user_id),
    };

    await carSchema.validate(body_);

    const createdCar: any = await db.car.create({
      data: {
        ...body_,
      },
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
