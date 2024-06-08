import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { AuthGuard } from 'src/engine/core/guards/Authorization.guard';
import { Request } from 'express';

@Controller('v1/submission')
export class SubmissionController {
  constructor(private submissionService: SubmissionService) {}

  @Post('submit')
  @UseGuards(AuthGuard)
  async submitTaskByWorker(@Req() req: Request) {
    return await this.submissionService.submitTaskByWorker(req);
  }

  @Get('/')
  @UseGuards(AuthGuard)
  async getWorkerSubmissions(@Req() req: Request) {
    return await this.submissionService.getWorkerSubmissions(req);
  }

  @Get('/per-day')
  @UseGuards(AuthGuard)
  async getSubmissionsPerDay(@Req() req: Request) {
    return await this.submissionService.getSubmissionsPerDay(req);
  }
  
  @Get('/:submissionId')
  @UseGuards(AuthGuard)
  async getSubmissionById(@Param('submissionId') submissionId: string) {
    return await this.submissionService.getSubmissionById(submissionId);
  }
}
