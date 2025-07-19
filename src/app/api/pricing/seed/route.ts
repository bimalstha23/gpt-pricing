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
        imageUrl: '/images/plus-plan.jpg',
      },
    });

    const proPlan = await prisma.plan.create({
      data: {
        name: 'Pro',
        price: 16.99,
        currency: 'USD',
        billingType: BillingType.YEARLY,
        popular: true,
        imageUrl: '/images/pro-plan.jpg',
      },
    });

    const ultraPlan = await prisma.plan.create({
      data: {
        name: 'Ultra',
        price: 32.99,
        currency: 'USD',
        billingType: BillingType.YEARLY,
        popular: false,
        imageUrl: '/images/ultra-plan.jpg',
      },
    });

    await prisma.feature.createMany({
      data: [
        {
          planId: plusPlan.id,
          name: 'Generate 1200 songs /year',
          imageUrl: '/images/music-note.svg',
        },
        {
          planId: plusPlan.id,
          name: 'Unlimited downloads',
          imageUrl: '/images/download.svg',
        },
        {
          planId: plusPlan.id,
          name: 'Standard tool',
          imageUrl: '/images/tool.svg',
        },
        {
          planId: plusPlan.id,
          name: 'Fast generation',
          imageUrl: '/images/speed.svg',
        },
        {
          planId: plusPlan.id,
          name: 'Commercial use',
          imageUrl: '/images/commercial.svg',
        },
      ],
    });

    await prisma.feature.createMany({
      data: [
        {
          planId: proPlan.id,
          name: 'Generate 2400 songs /year',
          imageUrl: '/images/music-note.svg',
        },
        {
          planId: proPlan.id,
          name: 'Unlimited downloads',
          imageUrl: '/images/download.svg',
        },
        {
          planId: proPlan.id,
          name: 'Pro tool',
          imageUrl: '/images/tool-pro.svg',
        },
        {
          planId: proPlan.id,
          name: 'Fast generation',
          imageUrl: '/images/speed.svg',
        },
        {
          planId: proPlan.id,
          name: 'Commercial use',
          imageUrl: '/images/commercial.svg',
        },
      ],
    });

    await prisma.feature.createMany({
      data: [
        {
          planId: ultraPlan.id,
          name: 'Generate 4800 songs /year',
          imageUrl: '/images/music-note.svg',
        },
        {
          planId: ultraPlan.id,
          name: 'Unlimited downloads',
          imageUrl: '/images/download.svg',
        },
        {
          planId: ultraPlan.id,
          name: 'Ultra tool',
          imageUrl: '/images/tool-ultra.svg',
        },
        {
          planId: ultraPlan.id,
          name: 'Fastest generation',
          imageUrl: '/images/speed-ultra.svg',
        },
        {
          planId: ultraPlan.id,
          name: 'Commercial use',
          imageUrl: '/images/commercial.svg',
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
