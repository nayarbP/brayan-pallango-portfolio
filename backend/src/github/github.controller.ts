import { Controller, Get } from '@nestjs/common';
import { GitHubService } from './github.service.js';

@Controller('github')
export class GitHubController {
  constructor(private readonly gitHubService: GitHubService) {}

  @Get('stats')
  getStats() {
    return this.gitHubService.getStats();
  }
}
