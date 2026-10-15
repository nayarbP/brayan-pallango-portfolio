'use client';

import { SectionHeading } from '@/components/SectionHeading';
import { TechHoverCard } from '@/components/TechHoverCard';
import { FadeIn } from '@/components/motion/FadeIn';
import type { GitHubStats } from '@/lib/types';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch, FaUsers, FaFolderOpen } from 'react-icons/fa';

function StatCard({
  label,
  value,
  icon,
  delay = 0,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.45 }}
    >
      <TechHoverCard className="h-full text-center">
        <div className="mb-3 flex justify-center">{icon}</div>
        <p className="font-mono text-3xl font-bold text-[var(--accent-cyan-bright)]">
          {value.toLocaleString()}
        </p>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">{label}</p>
      </TechHoverCard>
    </motion.div>
  );
}

export function GitHubStatsSection({
  stats,
}: {
  stats: GitHubStats | null;
}) {
  if (!stats) {
    return (
      <section id="github" className="scroll-mt-28 py-16">
        <div className="mx-auto max-w-6xl px-4 text-center text-[var(--text-secondary)] lg:px-6">
          GitHub stats are temporarily unavailable. Restart the API with{' '}
          <code className="text-[var(--accent-cyan-bright)]">npm run dev</code>{' '}
          and ensure <code className="text-[var(--accent-cyan-bright)]">backend/.env</code>{' '}
          contains a valid <code className="text-[var(--accent-cyan-bright)]">GITHUB_TOKEN</code>.
        </div>
      </section>
    );
  }

  return (
    <section id="github" className="scroll-mt-28 py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <SectionHeading
          eyebrow="Open source"
          title="GitHub activity"
          description="Live snapshot of repositories, contributions, and recent activity."
        />

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <a
            href={stats.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-glow)] bg-[var(--surface-elevated)] px-4 py-2 text-sm text-[var(--text-primary)] hover:border-cyan-400/50"
          >
            <FaGithub className="icon-accent" />@{stats.username}
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <StatCard
            label="Public repos"
            value={stats.publicRepos}
            icon={<FaFolderOpen className="icon-accent text-xl" />}
          />
          <StatCard
            label="Contributions (year)"
            value={stats.contributionsThisYear}
            icon={<FaGithub className="icon-accent text-xl" />}
            delay={0.05}
          />
          <StatCard
            label="Stars"
            value={stats.totalStars}
            icon={<FaStar className="icon-accent text-xl" />}
            delay={0.1}
          />
          <StatCard
            label="Forks"
            value={stats.totalForks}
            icon={<FaCodeBranch className="icon-accent text-xl" />}
            delay={0.15}
          />
          <StatCard
            label="Followers"
            value={stats.followers}
            icon={<FaUsers className="icon-accent text-xl" />}
            delay={0.2}
          />
          <StatCard
            label="Following"
            value={stats.following}
            icon={<FaUsers className="icon-accent text-xl" />}
            delay={0.25}
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <FadeIn>
            <TechHoverCard>
              <h3 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">
                Top languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {stats.topLanguages.length ? (
                  stats.topLanguages.map((lang) => (
                    <span
                      key={lang.name}
                      className="rounded-full border border-[var(--border-glow)] bg-[var(--surface-elevated)] px-3 py-1.5 font-mono text-xs text-[var(--text-primary)]"
                    >
                      {lang.name} · {lang.count}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-[var(--text-secondary)]">
                    No language data available yet.
                  </p>
                )}
              </div>
            </TechHoverCard>
          </FadeIn>

          <FadeIn delay={0.08}>
            <TechHoverCard>
              <h3 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">
                Recent activity
              </h3>
              <ul className="space-y-3">
                {stats.recentActivity.length ? (
                  stats.recentActivity.map((item) => (
                    <li
                      key={`${item.type}-${item.repo}-${item.createdAt}`}
                      className="rounded-xl border border-[var(--border-glow)] bg-[var(--surface-elevated)] px-3 py-2 text-sm"
                    >
                      <p className="font-medium text-[var(--text-primary)]">
                        {item.type}
                      </p>
                      <p className="text-[var(--text-secondary)]">{item.repo}</p>
                      <p className="font-mono text-xs text-[var(--text-muted)]">
                        {new Date(item.createdAt).toLocaleString('en-US', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </p>
                    </li>
                  ))
                ) : (
                  <p className="text-sm text-[var(--text-secondary)]">
                    No recent public events to display.
                  </p>
                )}
              </ul>
            </TechHoverCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
