import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: Request) {
  try {
    const category_data = await db.category.findMany();
    const category_data_final = await Promise.all(
      category_data.map(async (category) => {
        let category_image_final = [];
        const category_id = category.category_id;
        const category_images = await db.category.findMany({
          where: {
            category_id: category_id,
          },
        });
        category_images.map((category_image) => {
          const image_endpoint = `${process.env.NEXTAUTH_URL}/api/manufacture/manufacture_image?id=${category_image.category_id}`;
          category_image_final.push(image_endpoint);
        });
        // @ts-ignore
        category.category_image = category_image_final;
        return category;
      })
    );

    return NextResponse.json(
      { message: 'Categories retrieved successfully', category_data_final },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

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
