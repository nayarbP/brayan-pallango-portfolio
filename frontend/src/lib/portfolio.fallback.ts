import type { PortfolioData } from './types';

/** Local fallback when the Nest API is unavailable. */
export const portfolioFallback: PortfolioData = {
  profile: {
    name: 'Brayan Rubén Pallango Plasencia',
    title: 'Full Stack Developer | Software Engineering',
    location: 'Latacunga, Ecuador',
    email: 'pallangoruben2021@gmail.com',
    linkedin: 'https://linkedin.com/in/brayan-pallango-45550a160',
    github: 'https://github.com/nayarbP',
    summary:
      'Full Stack Developer building web, mobile, and desktop software for financial and institutional environments.',
    languages: [
      { name: 'Spanish', level: 'Native' },
      { name: 'English', level: 'Intermediate' },
    ],
  },
  nav: [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'education', label: 'Education' },
    { id: 'github', label: 'GitHub' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' },
  ],
  experience: [],
  projects: [],
  skills: [],
  certifications: [],
  trainingAreas: [],
  education: {
    degree: 'Software Engineering',
    institution: 'Universidad de las Fuerzas Armadas ESPE',
  },
  resume: {
    fileName: 'Brayan_Pallango_CV.pdf',
    downloadPath: '/cv/Brayan_Pallango_CV.pdf',
    label: 'Download CV (PDF)',
  },
};
