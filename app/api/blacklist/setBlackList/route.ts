import { NextResponse } from 'next/server';
import { setBlacklist } from '@/app/db';

export async function POST(request: Request) {
  try {
    const { email, list } = await request.json();

    if (!email || !Array.isArray(list)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    await setBlacklist(email, list);

    return NextResponse.json({ message: 'Blacklist updated successfully' });
  } catch (error) {
    console.error('Error updating blacklist:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
