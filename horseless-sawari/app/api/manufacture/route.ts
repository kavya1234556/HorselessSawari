import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  console.log('try');
  try {
    const body = await req.formData();
    const category_name = body.get('category_name');
    console.log(body.get('category_name'));
    const file = body.get('category_image');
    //@ts-ignore
    const ab = await file.arrayBuffer();
    const bf = Buffer.from(ab);
    const cwd = process.cwd();
    await fs.promises.writeFile(
      //@ts-ignore
      path.join(cwd, 'app/api/manufacture/manufacture_images/', file.name),
      bf,
      {
        encoding: 'binary',
      }
    );
    const category_image =
      //@ts-ignore
      'app/api/manufacture/manufacture_images/' + file.name;
    const body_ = {
      category_name: String(category_name),
      category_image,
    };
    console.log(body_);
    const createdManufature: any = await db.category.create({
      data: body_,
    });
    console.log('Post Request');
    return NextResponse.json(
      { message: 'Manufacture added Successfully', createdManufature },
      { status: 200 }
    );
  } catch (error) {
    if (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }
}
