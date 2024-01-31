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
  profile_image: yup.string(),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  phone_number: yup.string().required(),
  user_id: yup.number().required(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await accountSchema.validate(body);
    const {
      first_name,
      last_name,
      phone_number,
      user_id,
      profile_image,
    }: Account = body;
    const createdAccount: any = await db.account.create({
      data: {
        profile_image,
        first_name,
        last_name,
        phone_number,
        user_id,
      },
    });

    console.log('Post Request');
    return NextResponse.json(
      { message: 'Account added Successfully', createdAccount },
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

export async function PATCH(req: Request) {
  console.log('Put Request');

  try {
    const body = await req.json();
    await accountSchema.validate(body);
    const {
      profile_image,
      first_name,
      last_name,
      phone_number,
      user_id,
    }: Account = body;

    const id = new URL(req.url).searchParams.get('id');

    const updatedAccount: any = await db.account.update({
      where: {
        acc_id: Number(id),
      },
      data: {
        profile_image,
        first_name,
        last_name,
        phone_number,
        user_id,
      },
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
