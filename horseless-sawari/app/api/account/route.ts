// @ts-nocheck
/**
 * @swagger
 * /api/account:
 *   post:
 *     description: gets values and files from the user and stores the images in the images folder and image path with other details in the account table
 *     responses:
 *       200:
 *         description: using this in user-dasborad in my profile page
 */
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
// schema for defining what the value should like
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
    const body = await req.formData(); //getting the data from the form
    const first_name = body.get('first_name');
    const last_name = body.get('last_name');
    const phone_number = body.get('phone_number');
    const user_id = body.get('user_id');

    const file = body.get('profile_image');
    const ab = await file.arrayBuffer(); //proccesing the image into image buffer
    const bf = Buffer.from(ab);
    const cwd = process.cwd();
    await fs.promises.writeFile(
      path.join(cwd, 'app/api/account/images', file.name),
      bf,
      {
        encoding: 'binary',
      }
    ); //storing the image in the file system
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
    }); //creating a new account for the user
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
// @ts-nocheck
/**
 * @swagger
 * /api/account:
 *   get:
 *     description: gets account values from the account table using user_id
 *     responses:
 *       200:
 *         description: using this in user-dasborad in my profile page
 */
export async function GET(req: Request) {
  console.log('Get Request');
  try {
    const id = new URL(req.url).searchParams.get('id'); //extracting id
    // console.log(id);
    if (!id) {
      return NextResponse.json(
        { error: 'Missing or undefined ID parameter' },
        { status: 400 }
      );
    } //checking if id is passed

    const accountDetails = await db.account.findUnique({
      where: {
        acc_id: Number(id),
      },
    }); //finding the account details using the id

    if (!accountDetails) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Account retrieved successfully', accountDetails },
      { status: 200 }
    ); //in case of success
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } //in case of error
}

// @ts-nocheck
/**
 * @swagger
 * /api/account:
 *   put:
 *     description: edits the existing account values from the account table using the user_id
 *     responses:
 *       200:
 *         description: using this in user-dasborad in my profile page
 */

export async function PUT(req: Request) {
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
    ); //storing the updated image in the above path
    const profile_image = 'app/api/account/images/' + file.name;

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
    }); //updating the data using the user_id

    return NextResponse.json(
      { message: 'Account updated successfully', updatedAccount },
      { status: 200 }
    ); //in success
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    } else {
      // Other errors
      return NextResponse.json({ error: error.message }, { status: 500 });
    } //
  }
}
