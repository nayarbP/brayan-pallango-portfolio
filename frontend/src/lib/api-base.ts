export function getApiBase(): string {
  const external = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (external) return external.replace(/\/$/, '');
  return '/api';
}
