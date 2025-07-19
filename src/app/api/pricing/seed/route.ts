import { BillingType } from '@prisma/client';
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    await prisma.feature.deleteMany();
    await prisma.plan.deleteMany();

    const plusPlan = await prisma.plan.create({
      data: {
        name: 'Plus',
        price: 9.99,
        currency: 'USD',
        billingType: BillingType.YEARLY,
        popular: false,
        imageUrl: '/images/pricing/default.svg',
      },
    });

    const proPlan = await prisma.plan.create({
      data: {
        name: 'Pro',
        price: 16.99,
        currency: 'USD',
        billingType: BillingType.YEARLY,
        popular: true,
        imageUrl: '/images/pricing/default.svg',
      },
    });

    const ultraPlan = await prisma.plan.create({
      data: {
        name: 'Ultra',
        price: 32.99,
        currency: 'USD',
        billingType: BillingType.YEARLY,
        popular: false,
        imageUrl: '/images/pricing/default.svg',
      },
    });

    await prisma.feature.createMany({
      data: [
        {
          planId: plusPlan.id,
          name: 'Generate 1200 songs /year',
          imageUrl: '/images/pricing/plus-credit.svg',
        },
        {
          planId: plusPlan.id,
          name: 'Unlimited downloads',
          imageUrl: '/images/pricing/download.svg',
        },
        {
          planId: plusPlan.id,
          name: 'Standard tool',
          imageUrl: '/images/pricing/core-feature.svg',
        },
        {
          planId: plusPlan.id,
          name: 'Fast generation',
          imageUrl: '/images/pricing/fastlane-queue.svg',
        },
        {
          planId: plusPlan.id,
          name: 'Commercial use',
          imageUrl: '/images/pricing/commercial-use.svg',
        },
      ],
    });

    await prisma.feature.createMany({
      data: [
        {
          planId: proPlan.id,
          name: 'Generate 6000 songs /year',
          imageUrl: '/images/pricing/pro-credit.svg',
        },
        {
          planId: proPlan.id,
          name: 'Unlimited downloads',
          imageUrl: '/images/pricing/download.svg',
        },
        {
          planId: proPlan.id,
          name: 'Unlock all features',
          imageUrl: '/images/pricing/all-feature.svg',
        },
        {
          planId: proPlan.id,
          name: 'Fast generation',
          imageUrl: '/images/pricing/fast-generation.svg',
        },
        {
          planId: proPlan.id,
          name: 'Commercial use',
          imageUrl: '/images/pricing/commercial-use.svg',
        },
      ],
    });

    await prisma.feature.createMany({
      data: [
        {
          planId: ultraPlan.id,
          name: 'Unlimited generations',
          imageUrl: '/images/pricing/ultra-credit.svg',
        },
        {
          planId: ultraPlan.id,
          name: 'Unlimited downloads',
          imageUrl: '/images/pricing/download.svg',
        },
        {
          planId: ultraPlan.id,
          name: 'Unlock all features',
          imageUrl: '/images/pricing/all-feature.svg',
        },
        {
          planId: ultraPlan.id,
          name: 'Fast generation',
          imageUrl: '/images/pricing/fast-generation.svg',
        },
        {
          planId: ultraPlan.id,
          name: 'Commercial use',
          imageUrl: '/images/pricing/commercial-use.svg',
        },
      ],
    });

    return NextResponse.json({ message: 'Sample data created successfully' });
  } catch (error) {
    console.error('Error creating sample data:', error);
    return NextResponse.json(
      { error: 'Failed to create sample data' },
      { status: 500 },
    );
  }
}
