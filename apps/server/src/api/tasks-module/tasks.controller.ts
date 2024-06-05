import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthGuard } from 'src/engine/core/guards/Authorization.guard';
import { TasksService } from './tasks.service';
import { Request } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('v1/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post('create-task')
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async createTask(
    @Req() req: Request,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return await this.tasksService.createTask(req, files);
  }

  @Get('list')
  @UseGuards(AuthGuard)
  async getTasks(@Req() req: Request) {
    return await this.tasksService.getTask(req);
  }

  @Get('result/:taskId')
  @UseGuards(AuthGuard)
  async getTaskResult(@Param('taskId') taskId: string, @Req() req: Request) {
    return await this.tasksService.getTaskResult(req, Number(taskId));
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getTaskById(@Param('id') id: string, @Req() req: Request) {
    return await this.tasksService.getTaskById(Number(id), req);
  }
}
