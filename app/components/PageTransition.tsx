'use client';

import { motion } from 'motion/react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function PageTransition({ children, className }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={className}>
      {children}
    </motion.div>
  );
}
