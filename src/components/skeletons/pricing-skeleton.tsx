'use client';

import { motion } from 'motion/react';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

export const PriceCardSkeleton = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{
      type: 'spring',
      stiffness: 300,
      damping: 30,
      duration: 0.4,
    }}
    className="overflow-hidden shadow-2xl grid grid-cols-2 h-[38rem]"
  >
    <div className="size-full overflow-hidden rounded-l-[26px] relative">
      <Skeleton className="size-full rounded-l-[26px]" />
    </div>

    <div className="flex flex-col size-full py-12 px-8 gap-10">
      <div>
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-24" />
      </div>

      <div className="flex flex-col gap-10">
        <div className="flex flex-row gap-3">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-16 w-26" />
          ))}
        </div>

        <div className="w-full space-y-8">
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div
                key={i}
                className="flex cursor-pointer flex-row gap-2 items-center"
              >
                <Skeleton className="size-4 rounded-full" />
                <Skeleton className="h-4 w-44" />
                <Skeleton className="size-5 rounded-full" />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div>
              <Skeleton className="h-12 w-32 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-12 w-full rounded-[12px]" />
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

export const PricingDialogSkeleton = () => {
  return (
    <Dialog defaultOpen modal>
      <DialogContent
        showCloseButton={false}
        className="max-w-4xl min-w-[50rem] max-h-fit p-0 border-none"
      >
        <PriceCardSkeleton />
      </DialogContent>
    </Dialog>
  );
};
