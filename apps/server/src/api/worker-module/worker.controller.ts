import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { WorkerService } from './worker.service';
import { AuthGuard } from 'src/engine/core/guards/Authorization.guard';

@Controller('v1/worker')
export class WorkerController {
  constructor(private workerService: WorkerService) {}
  @Post('signin')
  async signin(@Req() req: Request) {
    return await this.workerService.signin(req);
  }

  @Get('/')
  @UseGuards(AuthGuard)
  async getWorker(@Req() req: Request) {
    return await this.workerService.getWorker(req);
  }
}
