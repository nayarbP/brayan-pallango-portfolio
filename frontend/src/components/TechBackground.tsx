'use client';

import Particles, { ParticlesProvider } from '@tsparticles/react';
import type { Engine, ISourceOptions } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { useMemo } from 'react';

async function initParticles(engine: Engine) {
  await loadSlim(engine);
}

function ParticleField() {
  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 60,
      detectRetina: true,
      background: { color: { value: 'transparent' } },
      particles: {
        number: {
          value: 55,
          density: { enable: true, width: 1200, height: 800 },
        },
        color: { value: ['#22d3ee', '#a78bfa', '#67e8f9'] },
        links: {
          enable: true,
          color: '#22d3ee',
          opacity: 0.14,
          distance: 140,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.65,
          direction: 'none',
          random: true,
          outModes: { default: 'out' },
        },
        opacity: { value: { min: 0.15, max: 0.45 } },
        size: { value: { min: 1, max: 2.5 } },
      },
      interactivity: {
        detectsOn: 'window',
        events: {
          onHover: { enable: true, mode: 'grab' },
          resize: { enable: true },
        },
        modes: {
          grab: { distance: 150, links: { opacity: 0.35 } },
        },
      },
    }),
    [],
  );

  return (
    <Particles
      id="portfolio-particles"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      options={options}
    />
  );
}

export function TechBackground() {
  return (
    <>
      <div className="tech-page-grid pointer-events-none fixed inset-0 -z-20" />
      <div className="pointer-events-none fixed inset-0 -z-[15] bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.08),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(167,139,250,0.1),transparent_50%)]" />
      <ParticlesProvider init={initParticles}>
        <ParticleField />
      </ParticlesProvider>
    </>
  );
}
