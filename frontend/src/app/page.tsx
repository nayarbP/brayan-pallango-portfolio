import { PortfolioContent } from '@/components/PortfolioContent';
import { PortfolioSkeleton } from '@/components/PortfolioSkeleton';
import { Suspense } from 'react';

export default function HomePage() {
  return (
    <Suspense fallback={<PortfolioSkeleton />}>
      <PortfolioContent />
    </Suspense>
  );
}
