import { portfolioData } from '@/data/portfolio.data';

export function GET() {
  return Response.json(portfolioData);
}
