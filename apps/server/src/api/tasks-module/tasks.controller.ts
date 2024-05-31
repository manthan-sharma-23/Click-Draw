import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/engine/core/guards/Authorization.guard';
import { TasksService } from './tasks.service';

@Controller('v1/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post('create-task')
  @UseGuards(AuthGuard)
  async createTask(@Req() req: Request) {
    return await this.tasksService.createTask(req);
  }
}
