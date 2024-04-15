import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import path from 'path';
import * as fs from 'fs';

export async function GET(req: Request) {
  try {
    const id = new URL(req.url).searchParams.get('id');
    const insurance_image = await db.insurance_image.findUnique({
      where: {
        insurance_image_id: Number(id),
      },
    });

    if (!insurance_image) {
      return NextResponse.json(
        { error: 'Insurance Image not found' },
        { status: 404 }
      );
    }
    console.log(insurance_image, 'insurance_image');
    const InsuranceImage = insurance_image.insurance_image;
    const filePath = path.resolve('.', InsuranceImage);
    const imageBuffer = fs.readFileSync(filePath);

    console.log(imageBuffer, 'imageBuffer');
    console.log(InsuranceImage, 'InsuranceImage');
    let contentType = 'image/jpeg';
    if (InsuranceImage.endsWith('.png')) {
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
