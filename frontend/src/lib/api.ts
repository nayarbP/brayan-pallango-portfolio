import { getApiBase } from './api-base';
import { portfolioFallback } from './portfolio.fallback';
import type { GitHubStats, PortfolioData } from './types';

export async function fetchPortfolio(): Promise<PortfolioData> {
  try {
    const res = await fetch(`${getApiBase()}/portfolio`, {
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
    const res = await fetch(`${getApiBase()}/github/stats`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return (await res.json()) as GitHubStats;
  } catch {
    return null;
  }
}
