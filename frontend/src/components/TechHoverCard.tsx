'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import clsx from 'clsx';

export function TechHoverCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, rgba(34, 211, 238, 0.22), transparent 65%)`;

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      className={clsx(
        'group relative overflow-hidden rounded-2xl border border-[var(--border-glow)] bg-[var(--surface)]/85 p-6 shadow-[0_0_0_1px_rgba(34,211,238,0.05),0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
        />
        <div className="tech-card-grid absolute inset-0 opacity-[0.08] transition-opacity duration-300 group-hover:opacity-20" />
      </div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-px z-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'conic-gradient(from 0deg, transparent, rgba(34,211,238,0.55), rgba(167,139,250,0.55), transparent 75%)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />
      <div className="pointer-events-none absolute inset-[1px] z-[1] rounded-[15px] bg-[var(--surface-solid)]" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-1/4 top-0 z-[1] h-full w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100"
        animate={{ x: ['-30%', '130%'] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
      />
      <div className="relative z-[2] text-[var(--text-primary)]">{children}</div>
    </motion.div>
  );
}

export function TechSkillChip({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(180px circle at ${x}px ${y}px, rgba(167,139,250,0.35), transparent 70%)`;

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      whileHover={{ scale: 1.04, y: -2 }}
      className={clsx(
        'group relative overflow-hidden rounded-xl border border-[var(--border-glow)] bg-[var(--surface-elevated)] px-3 py-3',
        className,
      )}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      <div className="tech-card-grid pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-15" />
      <div className="pointer-events-none absolute inset-0 z-[1] rounded-xl bg-[var(--surface-elevated)]" />
      <div className="relative z-[2] flex items-center gap-3 text-[var(--text-primary)]">
        {children}
      </div>
    </motion.div>
  );
}
