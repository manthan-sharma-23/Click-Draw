import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from '../../engine/database/database.service';
import { Request } from 'express';
import { create_tasks_input } from 'src/engine/types/tasks.types';
import { CloudFrontService } from '../../engine/core/services/CloudFront.service';
import { S3Service } from 'src/engine/core/services/S3.service';
import axios from 'axios';

@Injectable()
export class TasksService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly cfService: CloudFrontService,
    private s3Service: S3Service,
  ) {}

  async createTask(request: Request) {
    try {
      const { user, body } = request;

      const data = create_tasks_input.parse(body);

      if (!user) throw new UnauthorizedException();

      if (!data) throw new ConflictException();

      const task = await this.databaseService.$transaction(async (tx) => {
        const task = await tx.task.create({
          data: {
            title: data.title,
            description: data.description,
            funds: data.funds,
            userId: user.userId,
          },
        });

        tx.option.createMany({
          data: await Promise.all(
            data.options.map(async (img, index) => {
              const { url, key } = await this.s3Service.generate_presigned_url({
                userId: user.userId,
                taskId: task.id,
              });

              await axios.put(url, img);

              const uploadedUrl = this.cfService.get_cf_image_url({
                imageKey: key,
              });

              return {
                image_url: uploadedUrl,
                taskId: task.id,
                serial_no: index,
              };
            }),
          ),
        });

        return task;
      });

      return task;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
