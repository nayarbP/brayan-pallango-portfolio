import { SectionHeading } from '@/components/SectionHeading';
import { TechHoverCard } from '@/components/TechHoverCard';
import { FadeIn } from '@/components/motion/FadeIn';
import type { PortfolioData } from '@/lib/types';

export function ContactSection({
  profile,
}: {
  profile: PortfolioData['profile'];
}) {
  return (
    <section id="contact" className="scroll-mt-28 py-16 pb-24">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <SectionHeading
          eyebrow="Let's connect"
          title="Contact"
          description="Have a project or Full Stack opening? Reach out."
        />
        <FadeIn>
          <TechHoverCard className="mx-auto max-w-3xl text-center">
            <p className="text-[var(--text-secondary)]">{profile.location}</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-4 inline-block text-2xl font-semibold text-[var(--accent-cyan-bright)] hover:underline"
            >
              {profile.email}
            </a>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#0A66C2] px-5 py-2.5 text-sm font-medium text-white"
              >
                LinkedIn
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-2.5 text-sm font-medium text-slate-950"
              >
                GitHub
              </a>
            </div>
          </TechHoverCard>
        </FadeIn>
      </div>
    </section>
  );
}
