import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

import fs from 'fs';
import path from 'path';
export async function POST(req: Request) {
  try {
    const body = await req.formData();
    const location_name = body.get('location_name');
    const file = body.get('location_image');
    const ab = await file.arrayBuffer();
    const bf = Buffer.from(ab);
    const cwd = process.cwd();
    await fs.promises.writeFile(
      path.join(cwd, 'app/api/dashboard/location/location_images', file.name),
      bf,
      {
        encoding: 'binary',
      }
    );
    const location_image =
      'app/api/dashboard/location/location_images' + file.name;
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
