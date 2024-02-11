import { db } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log('Heeeelo');

    // Parse the URL and extract id from the search parameters
    const id = new URL(req.url).searchParams.get('id');

    console.log(id);

    if (!id) {
      return NextResponse.json(
        { error: 'Missing or undefined ID parameter' },
        { status: 400 }
      );
    }

    // Use the id parameter as needed
    res.end(`Post: ${id}`);

    return NextResponse.json({ message: `${id}` }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
