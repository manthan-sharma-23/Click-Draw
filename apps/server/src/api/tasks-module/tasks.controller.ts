import {
  Controller,
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
}
