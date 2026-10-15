import { getGitHubStats } from '@/lib/github-stats.server';

export async function GET() {
  try {
    const stats = await getGitHubStats();
    return Response.json(stats);
  } catch {
    return Response.json({ error: 'Unable to load GitHub stats' }, { status: 500 });
  }
}
