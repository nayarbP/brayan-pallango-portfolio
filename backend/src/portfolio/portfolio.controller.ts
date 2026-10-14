import { Controller, Get } from '@nestjs/common';
import { PortfolioService } from './portfolio.service.js';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  getAll() {
    return this.portfolioService.getAll();
  }

  @Get('profile')
  getProfile() {
    return this.portfolioService.getProfile();
  }

  @Get('experience')
  getExperience() {
    return this.portfolioService.getExperience();
  }

  @Get('projects')
  getProjects() {
    return this.portfolioService.getProjects();
  }

  @Get('skills')
  getSkills() {
    return this.portfolioService.getSkills();
  }

  @Get('certifications')
  getCertifications() {
    return this.portfolioService.getCertifications();
  }

  @Get('education')
  getEducation() {
    return this.portfolioService.getEducation();
  }
}
