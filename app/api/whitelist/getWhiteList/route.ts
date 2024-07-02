import { NextResponse } from 'next/server';
import { loadWhitelist } from '@/app/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const whitelist = await loadWhitelist(email);
    return NextResponse.json(whitelist);
  } catch (error) {
    console.error('Error fetching whitelist:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
