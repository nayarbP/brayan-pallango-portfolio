import { Injectable, Logger } from '@nestjs/common';
import { config as loadEnv } from 'dotenv';
import { resolve } from 'node:path';

export type GitHubActivityItem = {
  type: string;
  repo: string;
  createdAt: string;
};

export type GitHubStats = {
  username: string;
  profileUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalForks: number;
  contributionsThisYear: number;
  recentActivity: GitHubActivityItem[];
  topLanguages: { name: string; count: number }[];
};

type RepoNode = {
  stargazers_count?: number;
  forks_count?: number;
  language?: string | null;
};

loadEnv({ path: resolve(process.cwd(), '.env') });

@Injectable()
export class GitHubService {
  private readonly logger = new Logger(GitHubService.name);

  private get username(): string {
    return process.env.GITHUB_USERNAME?.trim() || 'nayarbP';
  }

  private get token(): string | undefined {
    return process.env.GITHUB_TOKEN?.trim() || undefined;
  }

  async getStats(): Promise<GitHubStats> {
    const [profile, repos, events, contributions] = await Promise.all([
      this.fetchUserProfile(),
      this.fetchAllRepos(),
      this.fetchRecentEvents(),
      this.fetchContributionsThisYear(),
    ]);

    const languageMap = new Map<string, number>();
    for (const repo of repos) {
      const lang = repo.language;
      if (!lang) continue;
      languageMap.set(lang, (languageMap.get(lang) ?? 0) + 1);
    }

    const topLanguages = [...languageMap.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    return {
      username: this.username,
      profileUrl: `https://github.com/${this.username}`,
      publicRepos: profile.public_repos,
      followers: profile.followers,
      following: profile.following,
      totalStars: repos.reduce(
        (sum, repo) => sum + (repo.stargazers_count ?? 0),
        0,
      ),
      totalForks: repos.reduce(
        (sum, repo) => sum + (repo.forks_count ?? 0),
        0,
      ),
      contributionsThisYear: contributions,
      recentActivity: events,
      topLanguages,
    };
  }

  private async fetchUserProfile(): Promise<{
    public_repos: number;
    followers: number;
    following: number;
  }> {
    const urls = [
      `https://api.github.com/users/${this.username}`,
      'https://api.github.com/user',
    ];

    for (const url of urls) {
      try {
        const res = await fetch(url, { headers: this.headers() });
        if (!res.ok) {
          this.logger.warn(`Profile fetch failed (${url}): HTTP ${res.status}`);
          continue;
        }
        const data = (await res.json()) as {
          public_repos?: number;
          followers?: number;
          following?: number;
          login?: string;
        };
        if (url.endsWith('/user') && data.login && data.login !== this.username) {
          continue;
        }
        return {
          public_repos: data.public_repos ?? 0,
          followers: data.followers ?? 0,
          following: data.following ?? 0,
        };
      } catch (error) {
        this.logger.warn(`Profile fetch error (${url}): ${String(error)}`);
      }
    }

    return { public_repos: 0, followers: 0, following: 0 };
  }

  private async fetchAllRepos(): Promise<RepoNode[]> {
    const repos: RepoNode[] = [];
    let page = 1;

    while (page <= 5) {
      try {
        const res = await fetch(
          `https://api.github.com/users/${this.username}/repos?per_page=100&page=${page}&sort=updated`,
          { headers: this.headers() },
        );
        if (!res.ok) {
          this.logger.warn(`Repos fetch failed: HTTP ${res.status}`);
          break;
        }
        const batch = (await res.json()) as RepoNode[];
        if (!batch.length) break;
        repos.push(...batch);
        if (batch.length < 100) break;
        page += 1;
      } catch (error) {
        this.logger.warn(`Repos fetch error: ${String(error)}`);
        break;
      }
    }

    return repos;
  }

  private async fetchContributionsThisYear(): Promise<number> {
    try {
      const res = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${this.username}`,
      );
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = (await res.json()) as {
        total?: number;
        contributions?: { date: string; count: number }[];
      };

      if (typeof data.total === 'number') {
        return data.total;
      }

      const year = new Date().getFullYear();
      return (data.contributions ?? [])
        .filter((item) => item.date.startsWith(String(year)))
        .reduce((sum, item) => sum + item.count, 0);
    } catch (error) {
      this.logger.warn(`Contributions fetch failed: ${String(error)}`);
      return this.fetchContributionsGraphQl();
    }
  }

  private async fetchContributionsGraphQl(): Promise<number> {
    if (!this.token) return 0;

    const query = `
      query ($login: String!) {
        user(login: $login) {
          contributionsCollection {
            contributionCalendar { totalContributions }
          }
        }
      }
    `;

    try {
      const res = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          ...this.headers(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables: { login: this.username } }),
      });
      const payload = (await res.json()) as {
        errors?: unknown[];
        data?: {
          user?: {
            contributionsCollection?: {
              contributionCalendar?: { totalContributions?: number };
            };
          };
        };
      };

      if (payload.errors?.length) {
        this.logger.warn(`GraphQL errors: ${JSON.stringify(payload.errors)}`);
      }

      return (
        payload.data?.user?.contributionsCollection?.contributionCalendar
          ?.totalContributions ?? 0
      );
    } catch (error) {
      this.logger.warn(`GraphQL contributions failed: ${String(error)}`);
      return 0;
    }
  }

  private async fetchRecentEvents(): Promise<GitHubActivityItem[]> {
    try {
      const res = await fetch(
        `https://api.github.com/users/${this.username}/events/public?per_page=8`,
        { headers: this.headers() },
      );
      if (!res.ok) {
        this.logger.warn(`Events fetch failed: HTTP ${res.status}`);
        return [];
      }
      const events = (await res.json()) as Array<{
        type: string;
        created_at: string;
        repo?: { name?: string };
      }>;
      return events.map((event) => ({
        type: event.type.replace('Event', ''),
        repo: event.repo?.name ?? '—',
        createdAt: event.created_at,
      }));
    } catch (error) {
      this.logger.warn(`Events fetch error: ${String(error)}`);
      return [];
    }
  }

  private headers(): Record<string, string> {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'brayan-pallango-portfolio',
      'X-GitHub-Api-Version': '2022-11-28',
    };
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }
    return headers;
  }
}
