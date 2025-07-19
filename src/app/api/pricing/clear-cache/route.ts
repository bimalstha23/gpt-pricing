import { NextResponse } from 'next/server';

import { redis } from '@/lib/redis';

const REDIS_KEY = 'pricing:plans';

export async function POST() {
  try {
    await redis.del(REDIS_KEY);
    console.log('Cache cleared successfully');
    return NextResponse.json({ message: 'Cache cleared successfully' });
  } catch (error) {
    console.error('Error clearing cache:', error);
    return NextResponse.json(
      { error: 'Failed to clear cache' },
      { status: 500 },
    );
  }
}
