import React, { Suspense } from 'react';

import PriceCard from '@/components/pricing/PriceCard';
import { PriceCardSkeleton } from '@/components/skeletons/pricing-skeleton';
import getPricing from '@/services/pricing';

import { PricingData } from '../api/pricing/route';

const PricingContent = async () => {
  const data: Array<PricingData> = await getPricing();
  return <PriceCard pricingData={data} />;
};

const page = async () => {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="max-w-4xl min-w-[50rem] p-0 border-none">
        <Suspense fallback={<PriceCardSkeleton />}>
          <PricingContent />
        </Suspense>
      </div>
    </main>
  );
};

export default page;
