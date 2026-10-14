import { Injectable, Logger } from '@nestjs/common';

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

type GraphQlResponse = {
  data?: {
    user?: {
      repositories?: { totalCount: number; nodes: { stargazerCount: number; forkCount: number; primaryLanguage: { name: string } | null }[] };
      followers?: { totalCount: number };
      following?: { totalCount: number };
      contributionsCollection?: {
        contributionCalendar?: { totalContributions: number };
      };
    };
  };
};

@Injectable()
export class GitHubService {
  private readonly logger = new Logger(GitHubService.name);
  private readonly username =
    process.env.GITHUB_USERNAME?.trim() || 'nayarbP';
  private readonly token = process.env.GITHUB_TOKEN?.trim();

  async getStats(): Promise<GitHubStats> {
    const [graphql, events, userPublic] = await Promise.all([
      this.fetchGraphStats(),
      this.fetchRecentEvents(),
      this.fetchPublicUser(),
    ]);

    const languageMap = new Map<string, number>();
    for (const repo of graphql.repos) {
      const lang = repo.primaryLanguage?.name;
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
      publicRepos: userPublic.public_repos ?? graphql.publicRepos,
      followers: graphql.followers,
      following: graphql.following,
      totalStars: graphql.totalStars,
      totalForks: graphql.totalForks,
      contributionsThisYear: graphql.contributions,
      recentActivity: events,
      topLanguages,
    };
  }

  private async fetchPublicUser(): Promise<{ public_repos?: number }> {
    try {
      const res = await fetch(`https://api.github.com/users/${this.username}`, {
        headers: this.headers(),
      });
      if (!res.ok) return {};
      return (await res.json()) as { public_repos?: number };
    } catch (error) {
      this.logger.warn(`Public user fetch failed: ${String(error)}`);
      return {};
    }
  }

  private async fetchGraphStats(): Promise<{
    publicRepos: number;
    followers: number;
    following: number;
    totalStars: number;
    totalForks: number;
    contributions: number;
    repos: { stargazerCount: number; forkCount: number; primaryLanguage: { name: string } | null }[];
  }> {
    const query = `
      query ($login: String!) {
        user(login: $login) {
          followers { totalCount }
          following { totalCount }
          repositories(first: 100, ownerAffiliations: OWNER, orderBy: { field: UPDATED_AT, direction: DESC }) {
            totalCount
            nodes {
              stargazerCount
              forkCount
              primaryLanguage { name }
            }
          }
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

      if (!res.ok) {
        throw new Error(`GraphQL HTTP ${res.status}`);
      }

      const payload = (await res.json()) as GraphQlResponse;
      const user = payload.data?.user;
      const nodes = user?.repositories?.nodes ?? [];

      return {
        publicRepos: user?.repositories?.totalCount ?? 0,
        followers: user?.followers?.totalCount ?? 0,
        following: user?.following?.totalCount ?? 0,
        totalStars: nodes.reduce((sum, r) => sum + r.stargazerCount, 0),
        totalForks: nodes.reduce((sum, r) => sum + r.forkCount, 0),
        contributions:
          user?.contributionsCollection?.contributionCalendar
            ?.totalContributions ?? 0,
        repos: nodes,
      };
    } catch (error) {
      this.logger.warn(`GraphQL stats failed: ${String(error)}`);
      return {
        publicRepos: 0,
        followers: 0,
        following: 0,
        totalStars: 0,
        totalForks: 0,
        contributions: 0,
        repos: [],
      };
    }
  }

  private async fetchRecentEvents(): Promise<GitHubActivityItem[]> {
    try {
      const res = await fetch(
        `https://api.github.com/users/${this.username}/events/public?per_page=8`,
        { headers: this.headers() },
      );
      if (!res.ok) return [];
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
      this.logger.warn(`Events fetch failed: ${String(error)}`);
      return [];
    }
  }

  private headers(): Record<string, string> {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'brayan-pallango-portfolio',
    };
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }
    return headers;
  }
}
