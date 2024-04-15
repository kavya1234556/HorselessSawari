import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import * as fs from 'fs';
import path from 'path';

export async function GET(req: Request, res: NextResponse) {
  console.log('Get Request');
  try {
    const id = new URL(req.url).searchParams.get('id');
    const car_image = await db.car_image.findUnique({
      where: {
        car_image_id: Number(id),
      },
    });

    if (!car_image) {
      return NextResponse.json(
        { error: 'car_image not found' },
        { status: 404 }
      );
    }
    console.log(car_image, 'car image');
    const CarImage = car_image.car_image;
    const filePath = path.resolve('.', CarImage);
    console.log('🚀 ~ GET ~ filePath:', filePath);
    const imageBuffer = fs.readFileSync(filePath);
    console.log(imageBuffer, 'imageBuffer');
    console.log(CarImage, 'CarImage');
    let contentType = 'image/jpeg';
    if (CarImage.endsWith('.png')) {
      contentType = 'image/png';
    } else {
      contentType = 'image/gif';
    }

    const headers = new Headers();
    headers.set('Content-Type', contentType);
    console.log('Hello');
    return new NextResponse(imageBuffer, {
      status: 200,
      statusText: 'OK',
      headers,
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
