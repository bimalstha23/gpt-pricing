'use client';
import { AnimatePresence, motion } from 'motion/react';
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
  //FIXME: Ensure Images are optimized and loaded efficiently
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
      className="overflow-hidden shadow-2xl grid grid-cols-2 h-[38rem]"
    >
      <div className="size-full overflow-hidden rounded-l-[26px] relative">
        <AnimatePresence mode="wait">
          {!hoveredFeatureImage ? (
            <motion.img
              key="default"
              src="/images/pricing/default.svg"
              alt="default"
              loading="lazy"
              fetchPriority="high"
              className="object-cover size-full"
              initial={{
                opacity: 0,
                scale: 1.2,
                rotateY: -30,
                filter: 'blur(8px)',
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateY: 0,
                filter: 'blur(0px)',
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                rotateY: 30,
                filter: 'blur(8px)',
                transition: { duration: 0.3 },
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
                duration: 0.7,
              }}
            />
          ) : (
            <motion.div
              key={hoveredFeatureImage}
              className="relative size-full"
              initial={{
                opacity: 0,
                scale: 0.7,
                x: -100,
                rotateX: -15,
                rotateY: -25,
                filter: 'blur(10px) brightness(0.6)',
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                rotateX: 0,
                rotateY: 0,
                filter: 'blur(0px) brightness(1)',
              }}
              exit={{
                opacity: 0,
                scale: 1.3,
                x: 100,
                rotateX: 15,
                rotateY: 25,
                filter: 'blur(10px) brightness(0.6)',
                transition: { duration: 0.25, ease: 'easeIn' },
              }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
                duration: 0.6,
              }}
            >
              <motion.img
                src={hoveredFeatureImage}
                alt="feature preview"
                loading="lazy"
                className="object-cover size-full relative z-10"
                fetchPriority="high"
                initial={{
                  opacity: 0,
                  scale: 1.1,
                  filter: 'contrast(0.8) saturate(0.8)',
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: 'contrast(1) saturate(1.1)',
                }}
                transition={{
                  delay: 0.1,
                  duration: 0.4,
                  ease: 'easeOut',
                }}
              />

              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{
                  delay: 0.2,
                  duration: 0.8,
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

      <div className="flex flex-col size-full py-12 px-8 gap-10">
        <h1 className="text-4xl font-bold">Unlock the future of music.</h1>

        <Tabs className="flex gap-10">
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
