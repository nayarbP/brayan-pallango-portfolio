import { Footer } from '@/components/Footer';
import { TechBackground } from '@/components/TechBackground';
import { Hero } from '@/components/Hero';
import { Navbar } from '@/components/Navbar';
import { GitHubStatsSection } from '@/components/GitHubStatsSection';
import { PortfolioSections } from '@/components/PortfolioSections';
import { ResumeSection } from '@/components/ResumeSection';
import { fetchGitHubStats, fetchPortfolio } from '@/lib/api';

export async function PortfolioContent() {
  const [data, githubStats] = await Promise.all([
    fetchPortfolio(),
    fetchGitHubStats(),
  ]);

  return (
    <>
      <TechBackground />
      <Navbar links={data.nav} />
      <main>
        <Hero profile={data.profile} />
        <PortfolioSections data={data} />
        {githubStats ? <GitHubStatsSection stats={githubStats} /> : null}
        <ResumeSection resume={data.resume} name={data.profile.name} />
      </main>
      <Footer name={data.profile.name} />
    </>
  );
}
