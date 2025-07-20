'use client';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import React, { useState } from 'react';

import { PricingData } from '@/app/api/pricing/route';

import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from '../ui/tabs';
import PriceDetailCard from './PriceDetailCard';

type PriceCardProps = {
  pricingData: Array<PricingData>;
};

const PriceCard = ({ pricingData }: PriceCardProps) => {
  const [hoveredFeatureImage, setHoveredFeatureImage] = useState<string | null>(
    null,
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.4,
      }}
      className="overflow-hidden shadow-2xl grid lg:grid-cols-2 grid-cols-1 size-full h-[80vh] lg:h-[38rem]"
    >
      <div className="h-[250px] lg:size-full overflow-hidden lg:rounded-l-[26px] rounded-t-2xl relative">
        <AnimatePresence mode="wait">
          {!hoveredFeatureImage ? (
            <motion.div
              key="default"
              className="relative size-full"
              initial={{
                opacity: 0,
                scale: 1.05,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                transition: { duration: 0.2 },
              }}
              transition={{
                duration: 0.3,
                ease: 'easeOut',
              }}
            >
              <Image
                src="/images/pricing/default.svg"
                alt="default"
                fill
                className="object-cover"
                fetchPriority="high"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
              />
            </motion.div>
          ) : (
            <motion.div
              key={hoveredFeatureImage}
              className="relative size-full"
              initial={{
                opacity: 0,
                scale: 0.95,
                x: -20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                scale: 1.05,
                x: 20,
                transition: { duration: 0.15 },
              }}
              transition={{
                duration: 0.25,
                ease: 'easeOut',
              }}
            >
              <Image
                src={hoveredFeatureImage}
                alt="feature preview"
                fill
                className="object-cover relative z-10"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
                fetchPriority="high"
                loading="lazy"
              />

              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{
                  duration: 1,
                  ease: 'easeOut',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: hoveredFeatureImage ? 0.3 : 0,
            background: hoveredFeatureImage
              ? 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), transparent 70%)'
              : 'transparent',
          }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="flex flex-col h-fit lg:size-full lg:py-12 lg:px-8 p-4 lg:gap-10 gap-4">
        <h1 className="text-4xl font-bold">Unlock the future of music.</h1>

        <Tabs className="flex lg:gap-10 gap-4">
          <TabsList>
            {pricingData.map(plan => (
              <TabsTrigger
                badge={plan.popular ? 'Popular' : undefined}
                key={plan.id}
                value={plan.id}
              >
                {plan.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContents>
            {pricingData.map(plan => (
              <TabsContent key={plan.id} value={plan.id}>
                <PriceDetailCard
                  {...plan}
                  setHoveredFeatureImage={setHoveredFeatureImage}
                />
              </TabsContent>
            ))}
          </TabsContents>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default PriceCard;
