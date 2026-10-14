import { Injectable } from '@nestjs/common';
import { portfolioData } from './portfolio.data.js';

@Injectable()
export class PortfolioService {
  getAll() {
    return portfolioData;
  }

  getProfile() {
    return portfolioData.profile;
  }

  getExperience() {
    return portfolioData.experience;
  }

  getProjects() {
    return portfolioData.projects;
  }

  getSkills() {
    return portfolioData.skills;
  }

  getCertifications() {
    return {
      certifications: portfolioData.certifications,
      trainingAreas: portfolioData.trainingAreas,
    };
  }

  getEducation() {
    return portfolioData.education;
  }
}
