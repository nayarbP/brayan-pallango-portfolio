export type SkillItem = {
  name: string;
  icon: string;
};

export type SkillCategory = {
  id: string;
  title: string;
  skills: SkillItem[];
};

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

export type CertificationItem = {
  title: string;
  issuer: string;
};

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
  education: {
    degree: string;
    institution: string;
  };
  resume: {
    fileName: string;
    downloadPath: string;
    label: string;
  };
  nav: { id: string; label: string }[];
};

export const portfolioData: PortfolioData = {
  profile: {
    name: 'Brayan Rubén Pallango Plasencia',
    title: 'Full Stack Developer | Software Engineering',
    location: 'Latacunga, Ecuador',
    email: 'pallangoruben2021@gmail.com',
    linkedin: 'https://linkedin.com/in/brayan-pallango-45550a160',
    github: 'https://github.com/nayarbP',
    summary:
      'Full Stack Developer with hands-on experience building desktop, web, and mobile applications for financial, administrative, and institutional environments. At Cooperativa de Ahorro y Crédito Andina Ltda. (Latacunga head office), I develop credit bureau workflows, accounting processes, and member document management. Skilled in PHP, JavaScript, Flutter, Java (Spring Boot), C# .NET 8, WPF, Python (Django, FastAPI), PostgreSQL, Docker, Git, CI/CD, and deployments on internal IP-based infrastructure.',
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
  experience: [
    {
      role: 'Full Stack Developer',
      company: 'Cooperativa de Ahorro y Crédito Andina Ltda.',
      period: 'Sept 2025 – Aug 2026',
      location: 'Head Office | Latacunga, Ecuador',
      highlights: [
        'Built a member file management system for credit and investment folders, with an embedded PDF editor to insert, delete, and reorder pages using PHP libraries.',
        'Delivered frontend and backend features with PHP, HTML, CSS, JavaScript, Flutter, and Java/Spring Boot aligned with business operational rules.',
        'Contributed to requirements analysis, incident resolution, and continuous improvement of production modules at the head office.',
      ],
    },
  ],
  projects: [
    {
      title: 'Digital File and Records Management',
      subtitle: 'Member documentation platform',
      description:
        'Centralizes member documentation, credit folders, and investments while removing physical file handling. Includes a custom in-browser PDF editing module.',
      stack: ['PHP', 'JavaScript', 'FPDI/TCPDF', 'MySQL'],
      icon: 'folder',
    },
    {
      title: 'Interbank Transfer APIs',
      subtitle: 'Financial services',
      description:
        'Services orchestrating the full transfer lifecycle between institutions: destination account validation, payment message construction, accounting entries, and response/reversal handling.',
      stack: ['REST', 'Java/Spring Boot', 'PostgreSQL'],
      icon: 'bank',
    },
    {
      title: 'Institutional Website — Andina',
      subtitle: 'Public cooperative portal',
      description:
        'Public portal with savings, credit, and investment product catalogs, institutional information, simulators, and member contact channels with internal content management.',
      stack: ['PHP', 'HTML', 'CSS', 'JavaScript'],
      icon: 'globe',
    },
    {
      title: 'Urbano Sport Center',
      subtitle: 'Sports complex operations',
      description:
        'Web platform for tournament scheduling, court bookings, online payments, academy enrollment, and live match streaming.',
      stack: ['Web', 'Online payments', 'Streaming'],
      icon: 'sport',
    },
  ],
  skills: [
    {
      id: 'backend',
      title: 'Backend',
      skills: [
        { name: 'NestJS', icon: 'nestjs' },
        { name: 'Node.js', icon: 'nodedotjs' },
        { name: 'Laravel', icon: 'laravel' },
        { name: 'Django', icon: 'django' },
        { name: 'FastAPI', icon: 'fastapi' },
        { name: 'Spring Boot', icon: 'springboot' },
        { name: 'PHP 8', icon: 'php' },
        { name: '.NET 8', icon: 'dotnet' },
        { name: 'EF Core', icon: 'dotnet' },
        { name: 'REST', icon: 'openapiinitiative' },
        { name: 'GraphQL', icon: 'graphql' },
        { name: 'AWS Lambda', icon: 'awslambda' },
      ],
    },
    {
      id: 'frontend',
      title: 'Frontend / Web',
      skills: [
        { name: 'React', icon: 'react' },
        { name: 'Next.js', icon: 'nextdotjs' },
        { name: 'HTML', icon: 'html5' },
        { name: 'CSS', icon: 'css3' },
        { name: 'Tailwind CSS', icon: 'tailwindcss' },
        { name: 'PWA', icon: 'pwa' },
        { name: 'Flutter', icon: 'flutter' },
        { name: 'GraphQL Client', icon: 'graphql' },
      ],
    },
    {
      id: 'desktop',
      title: 'Desktop',
      skills: [
        { name: 'WPF', icon: 'dotnet' },
        { name: 'MVVM', icon: 'dotnet' },
        { name: 'MSIX', icon: 'microsoft' },
      ],
    },
    {
      id: 'languages',
      title: 'Languages',
      skills: [
        { name: 'TypeScript', icon: 'typescript' },
        { name: 'JavaScript', icon: 'javascript' },
        { name: 'Python', icon: 'python' },
        { name: 'Java', icon: 'openjdk' },
        { name: 'PHP', icon: 'php' },
        { name: 'C#', icon: 'csharp' },
        { name: 'Dart', icon: 'dart' },
        { name: 'SQL', icon: 'postgresql' },
      ],
    },
    {
      id: 'databases',
      title: 'Databases',
      skills: [
        { name: 'PostgreSQL', icon: 'postgresql' },
        { name: 'MySQL', icon: 'mysql' },
        { name: 'SQL Server', icon: 'microsoftsqlserver' },
        { name: 'SQLite', icon: 'sqlite' },
      ],
    },
    {
      id: 'ai',
      title: 'AI & Automation',
      skills: [
        { name: 'LLM Integration', icon: 'openai' },
        { name: 'Machine Learning', icon: 'tensorflow' },
        { name: 'Computer Vision', icon: 'opencv' },
        { name: 'n8n', icon: 'n8n' },
        { name: 'Face-API.js', icon: 'javascript' },
      ],
    },
    {
      id: 'devops',
      title: 'DevOps & Quality',
      skills: [
        { name: 'Docker', icon: 'docker' },
        { name: 'Git', icon: 'git' },
        { name: 'GitHub Actions', icon: 'githubactions' },
        { name: 'Linux', icon: 'linux' },
        { name: 'Render', icon: 'render' },
        { name: 'Scrum', icon: 'scrumalliance' },
      ],
    },
  ],
  certifications: [
    {
      title: 'Fundamentals of Cybersecurity',
      issuer: 'Universidad de las Fuerzas Armadas ESPE',
    },
    {
      title: 'Data Science and Machine Learning Applied to Cybersecurity',
      issuer: 'Universidad de las Fuerzas Armadas ESPE',
    },
    {
      title: 'Introduction to Convolutional Neural Networks',
      issuer: 'Professional training',
    },
    {
      title: 'Feria Investiga, Lidera e Impacta — Speaker',
      issuer: 'Presentation / presenter',
    },
  ],
  trainingAreas: [
    'Full-stack development',
    'Clean Architecture',
    'Generative AI',
    'Model training',
    'Machine Learning',
    'Computer Vision',
    'n8n automation',
    'CI/CD',
    'Scrum',
    'Secure coding',
  ],
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
