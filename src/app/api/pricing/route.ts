import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';

export interface PricingData {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingType: string;
  popular: boolean;
  imageUrl?: string;
  features: {
    id: string;
    name: string;
    imageUrl?: string;
  }[];
}

const REDIS_KEY = 'pricing:plans';
const CACHE_EXPIRY = 2 * 60;

export async function GET() {
  try {
    const cachedData = await redis.get(REDIS_KEY);
    if (cachedData) {
      console.log(
        'Serving pricing data from cache at:',
        new Date().toISOString(),
      );
      return NextResponse.json(JSON.parse(cachedData));
    }

    console.log(
      'Cache miss - Fetching pricing data from database at:',
      new Date().toISOString(),
    );
    const pricingData = await prisma.plan.findMany({
      include: {
        features: true,
      },
    });

    console.log('Setting cache with expiry:', CACHE_EXPIRY, 'seconds');
    await redis.set(REDIS_KEY, JSON.stringify(pricingData), 'EX', CACHE_EXPIRY);

    return NextResponse.json(pricingData);
  } catch (error) {
    console.error('Error fetching pricing data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pricing data' },
      { status: 500 },
    );
  }
}
