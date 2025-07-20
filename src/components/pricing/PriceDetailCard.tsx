import { ArrowRight, Check, Info } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { PricingData } from '@/app/api/pricing/route';
import { Button } from '@/components/ui/button';

import FlipText from '../ui/flip-text';

const PriceDetailCard = ({
  billingType,
  currency,
  features,
  name,
  price,
  setHoveredFeatureImage,
}: Omit<PricingData, 'popular'> & {
  setHoveredFeatureImage: (imageUrl: string | null) => void;
}) => {
  return (
    <div className="text-white w-full lg:space-y-8 space-y-4">
      <div className="space-y-2">
        {features.map(feature => (
          <div
            key={feature.id}
            onMouseEnter={() =>
              setHoveredFeatureImage(feature.imageUrl || null)
            }
            onMouseLeave={() => setHoveredFeatureImage(null)}
            className="flex cursor-pointer flex-row gap-2 items-center text-sm text-[#777A80] hover:text-white"
          >
            <Check className="size-4" />
            <FlipText>{feature.name}</FlipText>
            <Info className="size-5" />
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div>
          <h1 className="text-white text-4xl font-bold mb-2">${price}</h1>
          <p className="text-[#BFC2C8] text-sm">
            {currency} per month, billed {billingType.toLowerCase()}
          </p>
        </div>
        <Link href="https://musicgpt.com/" className="w-full" target="_blank">
          <Button
            className="rounded-[12px] w-full  slide-anime group"
            size="lg"
          >
            Unlock {name} features
            <div className="group-hover:translate-x-2 transition-all">
              <ArrowRight className="size-4" />
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PriceDetailCard;
