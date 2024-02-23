import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import * as fs from 'fs';
import path from 'path';

export async function GET(req: Request) {
  console.log('Get Request');
  try {
    const id = new URL(req.url).searchParams.get('id');
    const category_image = await db.category.findUnique({
      where: {
        category_id: Number(id),
      },
    });

    if (!category_image) {
      return NextResponse.json(
        { error: 'car_image not found' },
        { status: 404 }
      );
    }
    console.log(category_image, 'category_image');
    const categoryImage = category_image.category_image;
    const filePath = path.resolve('.', categoryImage);
    const imageBuffer = fs.readFileSync(filePath);

    console.log(imageBuffer, 'imageBuffer');
    console.log(categoryImage, 'categoryImage');
    let contentType = 'image/jpeg';
    if (categoryImage.endsWith('.png')) {
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
