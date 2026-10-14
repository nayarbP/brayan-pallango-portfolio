export function PortfolioSkeleton() {
  return (
    <div className="min-h-screen animate-pulse px-4 pt-28">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="h-12 w-2/3 rounded-2xl bg-cyan-500/10" />
        <div className="h-6 w-1/2 rounded-xl bg-violet-500/10" />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="h-48 rounded-2xl border border-cyan-500/10 bg-[var(--surface)]/60" />
          <div className="h-48 rounded-2xl border border-cyan-500/10 bg-[var(--surface)]/60" />
        </div>
      </div>
    </div>
  );
}
