import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { GitHubStatsSection } from '@/components/GitHubStatsSection';
import { Hero } from '@/components/Hero';
import { Navbar } from '@/components/Navbar';
import { PortfolioSections } from '@/components/PortfolioSections';
import { ResumeSection } from '@/components/ResumeSection';
import { TechBackground } from '@/components/TechBackground';
import { portfolioData } from '@/data/portfolio.data';
import { getGitHubStats } from '@/lib/github-stats.server';

export async function PortfolioContent() {
  const data = portfolioData;

  let githubStats = null;
  try {
    githubStats = await getGitHubStats();
  } catch {
    githubStats = null;
  }

  return (
    <>
      <TechBackground />
      <Navbar links={data.nav} />
      <main>
        <Hero profile={data.profile} />
        <PortfolioSections data={data} />
        <GitHubStatsSection stats={githubStats} />
        <ResumeSection resume={data.resume} name={data.profile.name} />
        <ContactSection profile={data.profile} />
      </main>
      <Footer name={data.profile.name} />
    </>
  );
}
