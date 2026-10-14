import { FadeIn } from '@/components/motion/FadeIn';

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <FadeIn className="mx-auto mb-10 max-w-3xl text-center">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent-cyan-bright)]">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-[var(--text-secondary)]">{description}</p>
      ) : null}
    </FadeIn>
  );
}
