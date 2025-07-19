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
const CACHE_EXPIRY = 60 * 60;

export async function GET() {
  try {
    const cachedData = await redis.get(REDIS_KEY);
    if (cachedData) {
      console.log('Serving pricing data from cache');
      return NextResponse.json(JSON.parse(cachedData));
    }

    console.log('Fetching pricing data from database');
    const pricingData = await prisma.plan.findMany({
      include: {
        features: true,
      },
    });

    await redis.setex(REDIS_KEY, CACHE_EXPIRY, JSON.stringify(pricingData));

    return NextResponse.json(pricingData);
  } catch (error) {
    console.error('Error fetching pricing data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pricing data' },
      { status: 500 },
    );
  }
}
