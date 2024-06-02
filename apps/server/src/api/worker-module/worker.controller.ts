import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { WorkerService } from './worker.service';

@Controller('v1/worker')
export class WorkerController {
  constructor(private workerService: WorkerService) {}
  @Post('signin')
  async signin(@Req() req: Request) {
    return await this.workerService.signin(req);
  }
}
