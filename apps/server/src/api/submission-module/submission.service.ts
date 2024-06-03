import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { DatabaseService } from 'src/engine/database/database.service';
import { TaskStatus } from '@prisma/client';

@Injectable()
export class SubmissionService {
  constructor(private readonly databaseService: DatabaseService) {}

  async submitTaskByWorker(req: Request) {
    try {
      const { workerId, publicKey } = req.worker;
      const { taskId, optionId } = req.body;

      if (!workerId || !publicKey)
        throw new UnauthorizedException('Not a worker');

      if (!taskId || !optionId)
        throw new NotAcceptableException('Insufficient Information');

      const submission = await this.databaseService.$transaction(async (tx) => {
        const task = await tx.task.findUniqueOrThrow({
          where: {
            id: taskId,
          },
          include: {
            submissions: true,
          },
        });
        task.submissions.forEach((submit) => {
          if (submit.workerId === workerId)
            throw new ConflictException(
              'Same worker cannot submit same task more than once',
            );
        });
        const submission = await tx.submission.create({
          data: {
            workerId,
            taskId: task.id,
            optionId,
          },
        });

        const limit = task.worker - task.responses + 1;
        const status: TaskStatus = limit > 0 ? 'ACTIVE' : 'CLOSED';

        await tx.task.update({
          where: {
            id: task.id,
          },
          data: {
            responses: {
              increment: 1,
            },
            responseLimit: limit,
            status,
          },
        });

        return submission;
      });

      return submission;
    } catch (error) {
      console.log('ERROR :', error);
      throw new InternalServerErrorException(error);
    }
  }
}
