import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

import fs from 'fs';
import path from 'path';

export async function GET(req: Request) {
  try {
    const location_data = await db.location.findMany();
    const location_data_final = await Promise.all(
      location_data.map(async (location) => {
        let location_image_final = [];
        const location_id = location.location_id;
        const location_images = await db.location.findMany({
          where: {
            location_id: location_id,
          },
        });
        location_images.map((location_image) => {
          const image_endpoint = `${process.env.NEXTAUTH_URL}/api/dashboard/location/location_image?id=${location_image.location_id}`;
          location_image_final.push(image_endpoint);
        });
        // @ts-ignore
        location.location_image = location_image_final;
        return location;
      })
    );

    return NextResponse.json(
      { message: 'location retrieved successfully', location_data_final },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.formData();
    const location_name = body.get('location_name');
    const file = body.get('location_image');
    //@ts-ignore
    const ab = await file.arrayBuffer();
    const bf = Buffer.from(ab);
    const cwd = process.cwd();
    await fs.promises.writeFile(
      //@ts-ignore
      path.join('app/api/dashboard/location/location_images/', file.name),
      bf,
      {
        encoding: 'binary',
      }
    );
    const location_image =
      //@ts-ignore
      'app/api/dashboard/location/location_images/' + file.name;
    const body_ = {
      location_name: String(location_name),

      location_image,
    };
    console.log(body_);
    const createdLocation: any = await db.location.create({
      data: body_,
    });
    console.log('Post Request');
    return NextResponse.json(
      { message: 'Location added Successfully', createdLocation },
      { status: 200 }
    );
  } catch (error) {
    if (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }
}
