import { NextResponse } from 'next/server';
import { loadBlacklist } from '@/app/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const blacklist = await loadBlacklist(email);
    return NextResponse.json(blacklist);
  } catch (error) {
    console.error('Error fetching blacklist:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


