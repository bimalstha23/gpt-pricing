import { motion } from 'motion/react';

import { cn } from '@/lib/utils';
const DURATION = 0.25;
const STAGGER = 0.025;

const FlipText = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return (
    <motion.p
      initial="initial"
      whileHover="hovered"
      className={cn(
        'relative block overflow-hidden whitespace-nowrap',
        className,
      )}
    >
      <div>
        {children.split('').map((l: string, i: number) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: '-100%',
              },
            }}
            transition={{
              duration: DURATION,
              ease: 'easeInOut',
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l === ' ' ? '\u00A0' : l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split('').map((l: string, i: number) => (
          <motion.span
            variants={{
              initial: {
                y: '100%',
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: 'easeInOut',
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l === ' ' ? '\u00A0' : l}
          </motion.span>
        ))}
      </div>
    </motion.p>
  );
};

export default FlipText;
