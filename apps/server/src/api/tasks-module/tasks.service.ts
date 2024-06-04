import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from '../../engine/database/database.service';
import { Request } from 'express';
import {
  create_tasks_input,
  get_task_results_input,
} from 'src/engine/types/zod.types';
import { CloudFrontService } from '../../engine/core/services/CloudFront.service';
import { S3Service } from 'src/engine/core/services/S3.service';
import axios from 'axios';
import { Task } from '@prisma/client';
import { OptionStatistics } from 'src/engine/types/app.wide.types';
import { TaskStatisticsService } from '../../engine/core/services/Statistics.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly cfService: CloudFrontService,
    private s3Service: S3Service,
    private statsService: TaskStatisticsService,
  ) {}

  async createTask(request: Request, files: Array<Express.Multer.File>) {
    try {
      const { user, body } = request;
      const obj = JSON.parse(body.data);

      const data = create_tasks_input.parse(obj);

      if (!user) throw new UnauthorizedException();

      if (!data) throw new ConflictException();

      const uploads = await Promise.all(
        files.map(async (file) => {
          const { url, key } = await this.s3Service.generate_presigned_url({
            userId: user.userId,
          });

          await axios.put(url, file.buffer, {
            headers: {
              'Content-Type': file.mimetype,
            },
          });

          const uploadedUrl = this.cfService.get_cf_image_url({
            imageKey: key,
          });

          return {
            image_url: uploadedUrl,
          };
        }),
      );

      // Database Query
      const task = await this.databaseService.task.create({
        data: {
          title: data.title,
          description: data.description,
          funds: data.funds,
          userId: user.userId,
          signature: data.signature,
          worker: data.worker,
          responseLimit: data.worker,
          status: 'ACTIVE',
        },
      });
      uploads.forEach(async (u, index) => {
        await this.databaseService.option.create({
          data: {
            taskId: task.id,
            image_url: u.image_url,
            serial_no: index + 1,
          },
        });
      });

      return task;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async getTask(request: Request) {
    try {
      const user = request.user;

      if (!user.userId || !user.publicKey) throw new UnauthorizedException();

      const tasks = await this.databaseService.task.findMany({
        where: {
          userId: user.userId,
        },
        include: {
          options: true,
          submissions: true,
        },
      });

      if (!tasks) throw new NotFoundException();

      return tasks;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async getTaskResult(req: Request): Promise<{
    task: Task;
    result: OptionStatistics[];
  }> {
    try {
      const data = get_task_results_input.parse(req.body);

      const task = await this.databaseService.task.findUniqueOrThrow({
        where: { id: data.taskId },
        include: {
          submissions: true,
          options: true,
        },
      });

      const taskResult = this.statsService.getEachOptionPercentage(task);

      return { task, result: taskResult };
    } catch (error) {
      console.log('ERROR : ', error);
      throw new InternalServerErrorException(error);
    }
  }

  async getTaskById(id: number) {
    try {
      const task = await this.databaseService.task.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          options: true,
          user: true,
          submissions: true,
        },
      });

      return task;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
