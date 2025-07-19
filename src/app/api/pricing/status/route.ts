import { NextResponse } from 'next/server';

import { redis } from '@/lib/redis';

const REDIS_KEY = 'pricing:plans';

export async function GET() {
  try {
    const ttl = await redis.ttl(REDIS_KEY);
    const exists = await redis.exists(REDIS_KEY);

    return NextResponse.json({
      exists: !!exists,
      ttl: ttl,
      message:
        ttl > 0
          ? `Cache expires in ${ttl} seconds`
          : 'Cache has expired or does not exist',
    });
  } catch (error) {
    console.error('Error checking cache status:', error);
    return NextResponse.json(
      { error: 'Failed to check cache status' },
      { status: 500 },
    );
  }
}
