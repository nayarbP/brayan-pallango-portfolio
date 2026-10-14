'use client';

import { motion } from 'framer-motion';

export function FloatingOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute left-[8%] top-[18%] h-40 w-40 rounded-full bg-[var(--pastel-mint)]/30 blur-2xl"
        animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[10%] top-[35%] h-52 w-52 rounded-full bg-[var(--pastel-lavender)]/25 blur-2xl"
        animate={{ y: [0, 20, 0], x: [0, -12, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[12%] left-[35%] h-48 w-48 rounded-full bg-[var(--pastel-peach)]/30 blur-2xl"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
