'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'down' | 'left' | 'right';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  once?: boolean;
}

const directionOffset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className,
  once = true,
}: ScrollRevealProps) {
  const offset = directionOffset[direction];

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once, amount: 0.1 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
