import { NextResponse } from 'next/server';
import { setWhitelist } from '@/app/db';

export async function POST(request: Request) {
  try {
    const { email, list } = await request.json();

    if (!email || !Array.isArray(list)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    await setWhitelist(email, list);

    return NextResponse.json({ message: 'Whitelist updated successfully' });
  } catch (error) {
    console.error('Error updating whitelist:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
