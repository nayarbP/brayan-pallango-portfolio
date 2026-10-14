import { portfolioFallback } from './portfolio.fallback';
import type { GitHubStats, PortfolioData } from './types';

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

export async function fetchPortfolio(): Promise<PortfolioData> {
  try {
    const res = await fetch(`${API_BASE}/portfolio`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error(`API ${res.status}`);
    }
    return (await res.json()) as PortfolioData;
  } catch {
    return portfolioFallback;
  }
}

export async function fetchGitHubStats(): Promise<GitHubStats | null> {
  try {
    const res = await fetch(`${API_BASE}/github/stats`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return (await res.json()) as GitHubStats;
  } catch {
    return null;
  }
}
