'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

export function Navbar({ links }: { links: { id: string; label: string }[] }) {
  const [active, setActive] = useState(links[0]?.id ?? 'home');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: [0.1, 0.4, 0.7] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [links]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={clsx(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'py-2' : 'py-4',
      )}
    >
      <nav
        className={clsx(
          'mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border px-4 py-2 backdrop-blur-md sm:px-6',
          scrolled
            ? 'border-[var(--border-glow)] bg-[var(--surface)]/90 shadow-[0_8px_40px_rgba(0,0,0,0.45)]'
            : 'border-transparent bg-[var(--surface)]/50',
        )}
      >
        <a
          href="#home"
          className="font-mono font-semibold tracking-tight text-[var(--text-primary)]"
        >
          BP<span className="text-[var(--accent-cyan-bright)]">_</span>dev
        </a>
        <ul className="hidden flex-wrap items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={clsx(
                  'rounded-full px-3 py-1.5 text-sm transition-colors',
                  active === link.id
                    ? 'bg-cyan-500/20 text-[var(--text-primary)] ring-1 ring-cyan-400/45'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-full border border-[var(--border-glow)] px-3 py-2 text-sm md:hidden"
            aria-expanded={open}
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
          <a
            href="#contact"
            className="hidden rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-4 py-2 text-sm font-medium text-slate-950 sm:inline-flex"
          >
            Contact
          </a>
        </div>
      </nav>
      {open ? (
        <ul className="mx-auto mt-2 flex max-w-6xl flex-wrap gap-2 px-4 md:hidden">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className="block rounded-full border border-[var(--border-glow)] bg-[var(--surface)]/90 px-3 py-2 text-sm text-[var(--text-primary)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </motion.header>
  );
}
