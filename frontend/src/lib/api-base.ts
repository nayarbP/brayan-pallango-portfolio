export function getApiBase(): string {
  const external = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (external) return external.replace(/\/$/, '');

  if (typeof window !== 'undefined') {
    return '/api';
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    const host = vercelUrl.startsWith('http')
      ? vercelUrl
      : `https://${vercelUrl}`;
    return `${host.replace(/\/$/, '')}/api`;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (siteUrl) {
    return `${siteUrl.replace(/\/$/, '')}/api`;
  }

  const port = process.env.PORT ?? '3000';
  return `http://127.0.0.1:${port}/api`;
}
