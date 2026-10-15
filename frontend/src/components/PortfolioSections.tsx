'use client';

import { SectionHeading } from '@/components/SectionHeading';
import { TechHoverCard, TechSkillChip } from '@/components/TechHoverCard';
import { FadeIn } from '@/components/motion/FadeIn';
import {
  StaggerChildren,
  StaggerItem,
} from '@/components/motion/StaggerChildren';
import { TechIcon } from '@/lib/tech-icons';
import type { PortfolioData } from '@/lib/types';
import {
  FaAward,
  FaBriefcase,
  FaCode,
  FaFolderOpen,
  FaGraduationCap,
  FaLanguage,
} from 'react-icons/fa';

export function PortfolioSections({ data }: { data: PortfolioData }) {
  return (
    <>
      <section id="about" className="scroll-mt-28 py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="Profile"
            title="About me"
            description="Business-driven software engineering with a focus on quality, deployment, and production operations."
          />
          <FadeIn>
            <TechHoverCard>
              <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
                {data.profile.summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {data.profile.languages.map((lang) => (
                  <span
                    key={lang.name}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border-glow)] bg-cyan-500/15 px-4 py-2 text-sm text-[var(--text-primary)]"
                  >
                    <FaLanguage className="icon-accent" />
                    {lang.name} — {lang.level}
                  </span>
                ))}
              </div>
            </TechHoverCard>
          </FadeIn>
        </div>
      </section>

      <section id="experience" className="scroll-mt-28 py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <SectionHeading eyebrow="Career" title="Professional experience" />
          <StaggerChildren className="space-y-6">
            {data.experience.map((exp) => (
              <StaggerItem key={exp.company}>
                <TechHoverCard>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="mb-2 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--accent-cyan-bright)]">
                        <FaBriefcase className="icon-accent" />
                        <span>{exp.period}</span>
                      </div>
                      <h3 className="text-2xl font-semibold text-[var(--text-primary)]">
                        {exp.role}
                      </h3>
                      <p className="mt-1 font-medium text-[var(--text-secondary)]">
                        {exp.company} · {exp.location}
                      </p>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-3 text-[var(--text-secondary)]">
                    {exp.highlights.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--accent-cyan)] shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </TechHoverCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section id="projects" className="scroll-mt-28 py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="Work"
            title="Featured projects"
            description="Production-grade solutions for financial, institutional, and operational environments."
          />
          <StaggerChildren className="grid gap-6 md:grid-cols-2">
            {data.projects.map((project) => (
              <StaggerItem key={project.title}>
                <TechHoverCard className="h-full">
                  <div className="mb-4 inline-flex rounded-xl border border-violet-400/40 bg-violet-500/15 p-3">
                    <FaFolderOpen className="icon-accent text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                    {project.title}
                  </h3>
                  <p className="text-sm font-medium text-[var(--accent-cyan-bright)]">
                    {project.subtitle}
                  </p>
                  <p className="mt-3 text-[var(--text-secondary)]">
                    {project.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-[var(--border-glow)] bg-[var(--surface-elevated)] px-3 py-1 font-mono text-xs text-[var(--text-primary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </TechHoverCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section id="skills" className="scroll-mt-28 py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="Stack"
            title="Skills & technologies"
            description="Tools I use across frontend, backend, data, AI, and DevOps."
          />
          <div className="space-y-8">
            {data.skills.map((category, idx) => (
              <FadeIn key={category.id} delay={idx * 0.05}>
                <TechHoverCard>
                  <div className="mb-5 flex items-center gap-2">
                    <FaCode className="icon-accent" />
                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                      {category.title}
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {category.skills.map((skill) => (
                      <TechSkillChip key={skill.name}>
                        <TechIcon slug={skill.icon} />
                        <span className="text-sm font-medium text-[var(--text-primary)]">
                          {skill.name}
                        </span>
                      </TechSkillChip>
                    ))}
                  </div>
                </TechHoverCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="certifications" className="scroll-mt-28 py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="Continuous learning"
            title="Certifications & training"
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <FadeIn>
              <TechHoverCard className="h-full">
                <div className="mb-4 flex items-center gap-2">
                  <FaAward className="icon-accent" />
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                    Certifications
                  </h3>
                </div>
                <ul className="space-y-4">
                  {data.certifications.map((cert) => (
                    <li
                      key={cert.title}
                      className="rounded-xl border border-[var(--border-glow)] bg-[var(--surface-elevated)] p-4"
                    >
                      <p className="font-medium text-[var(--text-primary)]">
                        {cert.title}
                      </p>
                      <p className="text-sm text-[var(--text-muted)]">
                        {cert.issuer}
                      </p>
                    </li>
                  ))}
                </ul>
              </TechHoverCard>
            </FadeIn>
            <FadeIn delay={0.1}>
              <TechHoverCard className="h-full">
                <h3 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">
                  Training areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.trainingAreas.map((area) => (
                    <span
                      key={area}
                      className="rounded-full border border-violet-400/35 bg-violet-500/15 px-3 py-1.5 text-sm text-[var(--text-primary)]"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </TechHoverCard>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="education" className="scroll-mt-28 py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <SectionHeading eyebrow="Academic" title="Education" />
          <FadeIn>
            <TechHoverCard className="max-w-3xl">
              <div className="flex items-start gap-4">
                <div className="rounded-xl border border-[var(--border-glow)] bg-cyan-500/15 p-4">
                  <FaGraduationCap className="icon-accent text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-[var(--text-primary)]">
                    {data.education.degree}
                  </h3>
                  <p className="mt-1 text-[var(--text-secondary)]">
                    {data.education.institution}
                  </p>
                </div>
              </div>
            </TechHoverCard>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
