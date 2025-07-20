'use client';

import { useRouter } from 'next/navigation';

import PriceCard from '@/components/pricing/PriceCard';
import { Dialog, DialogContent } from '@/components/ui/dialog';

import { PricingData } from './api/pricing/route';

interface PricingDialogProps {
  pricingData: Array<PricingData>;
}

const PricingDialog = ({ pricingData }: PricingDialogProps) => {
  const router = useRouter();

  return (
    <Dialog defaultOpen modal onOpenChange={() => router.back()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-4xl min-w-[50rem] max-h-fit p-0 border-none"
      >
        <PriceCard pricingData={pricingData} />
      </DialogContent>
    </Dialog>
  );
};

export default PricingDialog;
