import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import path from 'path';
import * as fs from 'fs';

export async function GET(req: Request) {
  try {
    console.log('Blueeee');
    const id = new URL(req.url).searchParams.get('id');
    const bluebook_image = await db.bluebook_image.findUnique({
      where: {
        bluebook_image_id: Number(id),
      },
    });

    if (!bluebook_image) {
      return NextResponse.json(
        { error: 'Bluebook Image not found' },
        { status: 404 }
      );
    }
    console.log(bluebook_image, 'bluebook_image');
    const BluebookImage = bluebook_image.bluebook_image;
    const filePath = path.resolve('.', BluebookImage);
    const imageBuffer = fs.readFileSync(filePath);

    console.log(imageBuffer, 'imageBuffer');
    console.log(BluebookImage, 'BluebookImage');
    let contentType = 'image/jpeg';
    if (BluebookImage.endsWith('.png')) {
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
