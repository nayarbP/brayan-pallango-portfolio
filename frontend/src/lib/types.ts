export type SkillItem = { name: string; icon: string };
export type SkillCategory = { id: string; title: string; skills: SkillItem[] };
export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
};
export type ProjectItem = {
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  icon: string;
};
export type CertificationItem = { title: string; issuer: string };

export type PortfolioData = {
  profile: {
    name: string;
    title: string;
    location: string;
    email: string;
    linkedin: string;
    github: string;
    summary: string;
    languages: { name: string; level: string }[];
  };
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillCategory[];
  certifications: CertificationItem[];
  trainingAreas: string[];
  education: { degree: string; institution: string };
  resume: { fileName: string; downloadPath: string; label: string };
  nav: { id: string; label: string }[];
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
  recentActivity: { type: string; repo: string; createdAt: string }[];
  topLanguages: { name: string; count: number }[];
};
