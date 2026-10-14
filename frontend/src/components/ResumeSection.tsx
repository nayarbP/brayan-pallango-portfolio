import { SectionHeading } from '@/components/SectionHeading';
import { TechHoverCard } from '@/components/TechHoverCard';
import { FadeIn } from '@/components/motion/FadeIn';
import type { PortfolioData } from '@/lib/types';
import { FaDownload, FaFilePdf } from 'react-icons/fa';

export function ResumeSection({
  resume,
  name,
}: {
  resume: PortfolioData['resume'];
  name: string;
}) {
  return (
    <section id="resume" className="scroll-mt-28 py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <SectionHeading
          eyebrow="Documents"
          title="Download my CV"
          description="Get the latest version of my resume in PDF format."
        />
        <FadeIn>
          <TechHoverCard className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-4 inline-flex rounded-xl border border-[var(--border-glow)] bg-cyan-500/15 p-4">
              <FaFilePdf className="icon-accent text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--text-primary)]">
              {name}
            </h3>
            <p className="mt-2 text-[var(--text-secondary)]">{resume.fileName}</p>
            <a
              href={resume.downloadPath}
              download={resume.fileName}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-3 text-sm font-medium text-slate-950 transition hover:brightness-110"
            >
              <FaDownload />
              {resume.label}
            </a>
          </TechHoverCard>
        </FadeIn>
      </div>
    </section>
  );
}
