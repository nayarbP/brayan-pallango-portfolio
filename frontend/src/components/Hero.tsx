'use client';

import { TechHoverCard } from '@/components/TechHoverCard';
import { motion } from 'framer-motion';
import type { PortfolioData } from '@/lib/types';
import { HiOutlineMail } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';

export function Hero({ profile }: { profile: PortfolioData['profile'] }) {
  const firstName = profile.name.split(' ')[0];

  return (
    <section
      id="home"
      className="tech-scanline relative flex min-h-[92vh] items-center overflow-hidden pt-28 pb-16"
    >
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-violet-500/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1.2fr_0.8fr] lg:px-6">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-3 inline-flex rounded-full border border-[var(--border-glow)] bg-[var(--surface)]/70 px-4 py-1 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-cyan-bright)]"
          >
            Open to Full Stack roles
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-4xl font-bold leading-tight tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl"
          >
            Hi, I&apos;m{' '}
            <span className="bg-gradient-to-r from-cyan-200 via-sky-100 to-violet-200 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(125,211,252,0.35)]">
              {firstName}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-4 max-w-2xl text-lg text-[var(--text-secondary)] sm:text-xl"
          >
            {profile.title}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-6 flex flex-wrap items-center gap-4 font-mono text-sm text-[var(--text-secondary)]"
          >
            <span className="inline-flex items-center gap-2">
              <FaMapMarkerAlt className="icon-accent" />
              {profile.location}
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              className="rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-3 text-sm font-medium text-slate-950 transition hover:scale-[1.02] hover:brightness-110"
            >
              View projects
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-glow)] bg-[var(--surface)]/80 px-5 py-3 text-sm font-medium text-[var(--text-primary)] transition hover:border-cyan-400/50"
            >
              <FaGithub className="icon-accent" /> GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-glow)] bg-[var(--surface)]/80 px-5 py-3 text-sm font-medium text-[var(--text-primary)] transition hover:border-violet-400/50"
            >
              <FaLinkedin className="text-[#0A66C2]" /> LinkedIn
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative mx-auto w-full max-w-md"
        >
          <TechHoverCard>
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl border border-cyan-400/40 bg-gradient-to-br from-cyan-500/25 to-violet-500/25 font-mono text-3xl font-bold text-[var(--text-primary)]">
              BP
            </div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">
              {profile.name}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)] line-clamp-5">
              {profile.summary}
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-cyan-bright)] hover:underline"
            >
              <HiOutlineMail className="icon-accent text-lg" />
              {profile.email}
            </a>
          </TechHoverCard>
        </motion.div>
      </div>
    </section>
  );
}
