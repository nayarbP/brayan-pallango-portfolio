import {
  SiCss,
  SiDart,
  SiDjango,
  SiDocker,
  SiDotnet,
  SiFastapi,
  SiFlutter,
  SiGit,
  SiGithubactions,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiN8N,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiOpencv,
  SiOpenapiinitiative,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSharp,
  SiRender,
  SiScrumalliance,
  SiSpringboot,
  SiSqlite,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
} from 'react-icons/si';
import { FaAws, FaBrain, FaDatabase, FaMicrosoft, FaPaw } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import clsx from 'clsx';

const iconMap: Record<string, IconType> = {
  nestjs: SiNestjs,
  nodedotjs: SiNodedotjs,
  laravel: SiLaravel,
  django: SiDjango,
  fastapi: SiFastapi,
  springboot: SiSpringboot,
  php: SiPhp,
  dotnet: SiDotnet,
  openapiinitiative: SiOpenapiinitiative,
  graphql: SiGraphql,
  awslambda: FaAws,
  react: SiReact,
  nextdotjs: SiNextdotjs,
  html5: SiHtml5,
  css3: SiCss,
  tailwindcss: SiTailwindcss,
  pwa: SiReact,
  flutter: SiFlutter,
  microsoft: FaMicrosoft,
  typescript: SiTypescript,
  javascript: SiJavascript,
  python: SiPython,
  openjdk: SiOpenjdk,
  csharp: SiSharp,
  dart: SiDart,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  microsoftsqlserver: FaDatabase,
  mongodb: SiMongodb,
  sqlite: SiSqlite,
  openai: FaBrain,
  tensorflow: SiTensorflow,
  opencv: SiOpencv,
  n8n: SiN8N,
  docker: SiDocker,
  git: SiGit,
  githubactions: SiGithubactions,
  linux: SiLinux,
  render: SiRender,
  scrumalliance: SiScrumalliance,
};

/** Brand colors tuned for dark UI (WCAG-friendly on icon shell). */
const brandColors: Record<string, string> = {
  nestjs: '#ff4f6d',
  nodedotjs: '#6ee07a',
  laravel: '#ff4a4a',
  django: '#44b78b',
  fastapi: '#009688',
  springboot: '#6db33f',
  php: '#a5b4fc',
  dotnet: '#9b8cff',
  openapiinitiative: '#85ea2d',
  graphql: '#f472b6',
  awslambda: '#ffb84d',
  react: '#61dafb',
  nextdotjs: '#f8fafc',
  html5: '#ff8a65',
  css3: '#7cb7ff',
  tailwindcss: '#38bdf8',
  flutter: '#54c5f8',
  microsoft: '#60a5fa',
  typescript: '#3b82f6',
  javascript: '#facc15',
  python: '#3b82f6',
  openjdk: '#f87171',
  csharp: '#a78bfa',
  dart: '#67e8f9',
  postgresql: '#93c5fd',
  mysql: '#fbbf24',
  microsoftsqlserver: '#7dd3fc',
  mongodb: '#4ade80',
  sqlite: '#94a3b8',
  openai: '#c4b5fd',
  tensorflow: '#fb923c',
  opencv: '#34d399',
  n8n: '#f472b6',
  docker: '#38bdf8',
  git: '#f87171',
  githubactions: '#c084fc',
  linux: '#e2e8f0',
  render: '#ffffff',
  scrumalliance: '#4ade80',
};

export function TechIcon({
  slug,
  className,
  size = 'md',
}: {
  slug: string;
  className?: string;
  size?: 'sm' | 'md';
}) {
  const Icon = iconMap[slug] ?? FaPaw;
  const color = brandColors[slug] ?? '#e8edf7';

  return (
    <span
      className={clsx(
        'tech-icon-shell shrink-0',
        size === 'sm' ? 'tech-icon-shell-sm' : 'tech-icon-shell-md',
        className,
      )}
      style={{ ['--icon-brand' as string]: color }}
    >
      <Icon className="tech-icon-glyph" aria-hidden />
    </span>
  );
}
