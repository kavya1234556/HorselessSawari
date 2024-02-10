import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import * as fs from 'fs';
import path from 'path';

export async function GET(req: Request, res: NextResponse) {
  console.log('Get Request');
  try {
    const user_id = new URL(req.url).searchParams.get('id');
    const accountDetails = await db.account.findUnique({
      where: {
        user_id: Number(user_id),
      },
    });

    if (!accountDetails) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }
    console.log(accountDetails.profile_image);
    const profile_image = accountDetails.profile_image;
    const filePath = path.resolve('.', profile_image);
    const imageBuffer = fs.readFileSync(filePath);

    let contentType = 'image/jpeg';
    if (profile_image.endsWith('.png')) {
      contentType = 'image/png';
    } else if (profile_image.endsWith('.gif')) {
      contentType = 'image/gif';
    }

    const headers = new Headers();
    headers.set('Content-Type', contentType);

    return new NextResponse(imageBuffer, {
      status: 200,
      statusText: 'OK',
      headers,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
