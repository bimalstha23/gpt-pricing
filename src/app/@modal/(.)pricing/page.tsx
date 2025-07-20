import React, { Suspense } from 'react';

import { type PricingData } from '@/app/api/pricing/route';
import PricingDialog from '@/app/PricingDialog';
import { PricingDialogSkeleton } from '@/components/skeletons/pricing-skeleton';
import getPricing from '@/services/pricing';

const PricingContent = async () => {
  const data: Array<PricingData> = await getPricing();
  return <PricingDialog pricingData={data} />;
};

const PricingModalPage = () => {
  return (
    <Suspense fallback={<PricingDialogSkeleton />}>
      <PricingContent />
    </Suspense>
  );
};

export default PricingModalPage;
