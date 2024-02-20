import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import * as fs from 'fs';
import path from 'path';

export async function GET(req: Request) {
  console.log('Get Request');
  try {
    const id = new URL(req.url).searchParams.get('id');
    const location_image = await db.location.findUnique({
      where: {
        location_id: Number(id),
      },
    });

    if (!location_image) {
      return NextResponse.json(
        { error: 'car_image not found' },
        { status: 404 }
      );
    }
    console.log(location_image, 'location_image');
    const LocationImage = location_image.location_image;
    const filePath = path.resolve('.', LocationImage);
    const imageBuffer = fs.readFileSync(filePath);

    console.log(imageBuffer, 'imageBuffer');
    console.log(LocationImage, 'LocationImage');
    let contentType = 'image/jpeg';
    if (LocationImage.endsWith('.png')) {
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
