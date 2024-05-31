import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from '../../engine/database/database.service';
import { Request } from 'express';
import { create_tasks_input } from 'src/engine/types/tasks.types';

@Injectable()
export class TasksService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createTask(request: Request) {
    try {
      const { user, body } = request;
      const data = create_tasks_input.parse(body);

      if (!user) throw new UnauthorizedException();

      if (!data) throw new ConflictException();

      const transaction = await this.databaseService.$transaction(
        async (tx) => {
          const response = await tx.task.create({
            data: {
              title: data.title,
              description: data.description,
              funds: data.funds,
              userId: user.userId,
            },
          });

          await tx.option.createMany({
            data: data.options.map((x) => ({
              image_url: x.image_url,
              serial_no: x.serial_no,
              taskId: response.id,
            })),
          });

          return response;
        },
      );

      return transaction;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
