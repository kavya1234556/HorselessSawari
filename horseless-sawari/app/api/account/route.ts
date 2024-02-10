import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import * as yup from 'yup';

interface Account {
  profile_image: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  user_id: number;
}

const accountSchema = yup.object().shape({
  profile_image: yup.mixed(),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  phone_number: yup.string().required(),
  user_id: yup.number().required(),
});

import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    // console.log(req);
    const body = await req.formData();
    const first_name = body.get('first_name');
    const last_name = body.get('last_name');
    const phone_number = body.get('phone_number');
    const user_id = body.get('user_id');

    const file = body.get('profile_image');
    const ab = await file.arrayBuffer();
    const bf = Buffer.from(ab);
    const cwd = process.cwd();
    await fs.promises.writeFile(
      path.join(cwd, 'app/api/account/images', file.name),
      bf,
      {
        encoding: 'binary',
      }
    );
    const profile_image = 'app/api/account/images/' + file.name;
    const body_ = {
      first_name: String(first_name),
      last_name: String(last_name),
      phone_number: String(phone_number),
      profile_image,
      user_id: Number(user_id),
    };
    console.log(body_);
    await accountSchema.validate(body_);
    const createdAccount: any = await db.account.create({
      data: body_,
    });
    console.log('Post Request');
    return NextResponse.json(
      { message: 'Account added Successfully', createdAccount },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    } else {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }
}

export async function GET(req: Request) {
  console.log('Get Request');
  try {
    const id = new URL(req.url).searchParams.get('id');

    console.log(id);

    if (!id) {
      return NextResponse.json(
        { error: 'Missing or undefined ID parameter' },
        { status: 400 }
      );
    }

    // Use the id parameter as needed
    const accountDetails = await db.account.findUnique({
      where: {
        acc_id: Number(id), // Adjust the field based on your database schema
      },
    });

    if (!accountDetails) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Account retrieved successfully', accountDetails },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  console.log('Put Request');

  try {
    const body = await req.formData();
    const first_name = body.get('first_name');
    const last_name = body.get('last_name');
    const phone_number = body.get('phone_number');
    const user_id = body.get('user_id');
    const file = body.get('profile_image');
    const ab = await file.arrayBuffer();
    const bf = Buffer.from(ab);
    const cwd = process.cwd();
    await fs.promises.writeFile(
      path.join(cwd, 'app/api/account/images', file.name),
      bf,
      {
        encoding: 'binary',
      }
    );
    const profile_image = 'app/api/account/images/' + file.name;

    const id = new URL(req.url).searchParams.get('id');
    const body_ = {
      first_name: String(first_name),
      last_name: String(last_name),
      phone_number: String(phone_number),
      profile_image,
      user_id: Number(user_id),
    };
    await accountSchema.validate(body_);
    const updatedAccount: any = await db.account.update({
      where: {
        user_id: Number(user_id),
      },
      data: body_,
    });

    return NextResponse.json(
      { message: 'Account updated successfully', updatedAccount },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      // Validation error
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    } else {
      // Other errors
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
