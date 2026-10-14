export function Footer({ name }: { name: string }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--border-glow)] bg-[var(--surface)]/70 py-8 text-center font-mono text-xs text-[var(--text-muted)]">
      <p>
        © {year} {name}
      </p>
    </footer>
  );
}
