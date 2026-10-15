import type { GitHubStats } from '@/lib/types';

type RepoNode = {
  stargazers_count?: number;
  forks_count?: number;
  language?: string | null;
};

function username(): string {
  return process.env.GITHUB_USERNAME?.trim() || 'nayarbP';
}

function token(): string | undefined {
  return process.env.GITHUB_TOKEN?.trim() || undefined;
}

function headers(): Record<string, string> {
  const h: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'brayan-pallango-portfolio',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (token()) h.Authorization = `Bearer ${token()}`;
  return h;
}

export async function getGitHubStats(): Promise<GitHubStats> {
  const login = username();
  const [profile, repos, events, contributions] = await Promise.all([
    fetchUserProfile(login),
    fetchAllRepos(login),
    fetchRecentEvents(login),
    fetchContributionsThisYear(login),
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
    username: login,
    profileUrl: `https://github.com/${login}`,
    publicRepos: profile.public_repos,
    followers: profile.followers,
    following: profile.following,
    totalStars: repos.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0),
    totalForks: repos.reduce((sum, r) => sum + (r.forks_count ?? 0), 0),
    contributionsThisYear: contributions,
    recentActivity: events,
    topLanguages,
  };
}

async function fetchUserProfile(login: string) {
  const urls = [
    `https://api.github.com/users/${login}`,
    'https://api.github.com/user',
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url, { headers: headers(), cache: 'no-store' });
      if (!res.ok) continue;
      const data = (await res.json()) as {
        public_repos?: number;
        followers?: number;
        following?: number;
        login?: string;
      };
      if (url.endsWith('/user') && data.login && data.login !== login) continue;
      return {
        public_repos: data.public_repos ?? 0,
        followers: data.followers ?? 0,
        following: data.following ?? 0,
      };
    } catch {
      /* try next */
    }
  }
  return { public_repos: 0, followers: 0, following: 0 };
}

async function fetchAllRepos(login: string): Promise<RepoNode[]> {
  const repos: RepoNode[] = [];
  for (let page = 1; page <= 5; page += 1) {
    try {
      const res = await fetch(
        `https://api.github.com/users/${login}/repos?per_page=100&page=${page}&sort=updated`,
        { headers: headers(), cache: 'no-store' },
      );
      if (!res.ok) break;
      const batch = (await res.json()) as RepoNode[];
      if (!batch.length) break;
      repos.push(...batch);
      if (batch.length < 100) break;
    } catch {
      break;
    }
  }
  return repos;
}

async function fetchContributionsThisYear(login: string): Promise<number> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${login}`,
      { cache: 'no-store' },
    );
    if (!res.ok) throw new Error('contributions api');
    const data = (await res.json()) as {
      total?: number;
      contributions?: { date: string; count: number }[];
    };
    if (typeof data.total === 'number') return data.total;
    const year = new Date().getFullYear();
    return (data.contributions ?? [])
      .filter((item) => item.date.startsWith(String(year)))
      .reduce((sum, item) => sum + item.count, 0);
  } catch {
    return 0;
  }
}

async function fetchRecentEvents(login: string) {
  try {
    const res = await fetch(
      `https://api.github.com/users/${login}/events/public?per_page=8`,
      { headers: headers(), cache: 'no-store' },
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
  } catch {
    return [];
  }
}
