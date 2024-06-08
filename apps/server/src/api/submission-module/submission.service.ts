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
import { get_submission_by_id_input } from 'src/engine/types/zod.types';
import { SolanaService } from '../../engine/core/services/Solana.service';

@Injectable()
export class SubmissionService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly solanaService: SolanaService,
  ) {}

  async submitTaskByWorker(req: Request) {
    try {
      const { workerId, publicKey } = req.worker;
      const { taskId, optionId } = req.body;

      if (!workerId || !publicKey)
        throw new UnauthorizedException('Not a worker');

      if (!taskId || !optionId)
        throw new NotAcceptableException('Insufficient Information');

      const submission = await this.databaseService.$transaction(async (tx) => {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const submissionsCount = await tx.submission.count({
          where: {
            workerId,
            createdAt: {
              gte: startOfDay,
              lte: endOfDay,
            },
          },
        });

        if (submissionsCount >= 10) {
          throw new ConflictException('Submission limit reached for today');
        }

        const task = await tx.task.findUniqueOrThrow({
          where: {
            id: taskId,
          },
          include: {
            submissions: true,
          },
        });

        task.submissions.forEach((submit) => {
          if (submit.workerId === workerId) {
            throw new ConflictException(
              'Same worker cannot submit same task more than once',
            );
          }
        });

        const worker_pay = this.solanaService.coin_modal.worker_work_fee;
        const commission_pay_to_app = 0.15 * worker_pay;
        const add_to_worker_wallet = worker_pay - commission_pay_to_app;

        const wallet = await tx.wallet.update({
          where: {
            workerId,
          },
          data: {
            currentAmount: {
              increment: add_to_worker_wallet,
            },
          },
        });

        const tx_description = `${add_to_worker_wallet} lamports credited for poll submission`;

        const createTransaction = await tx.transaction.create({
          data: {
            amount: add_to_worker_wallet,
            walletId: wallet.id,
            status: 'SUCCESS',
            transaction_type: 'DEPOSIT',
            description: tx_description,
            from: 'click_draw_poll_submission',
            to: 'Wallet',
            post_balance: wallet.currentAmount,
          },
        });

        const submission = await tx.submission.create({
          data: {
            workerId,
            taskId: task.id,
            optionId,
            transactionId: createTransaction.id,
          },
          include: {
            Worker: true,
            option: true,
            task: true,
          },
        });

        const limit = task.worker - (task.responses + 1);
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

  async getWorkerSubmissions(req: Request) {
    try {
      const { workerId } = req.worker;

      if (!workerId)
        throw new UnauthorizedException(
          'Not a worker, please Signin / Authorize',
        );

      const submissions = await this.databaseService.$transaction(
        async (tx) => {
          const startOfDay = new Date();
          startOfDay.setHours(0, 0, 0, 0);
          const submissions = await tx.submission.findMany({
            where: {
              workerId,
            },
            include: {
              Worker: true,
              option: true,
              task: {
                include: {
                  user: true,
                  options: true,
                },
              },
              transaction: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
          });

          const submissionCountForToday = await tx.submission.count({
            where: {
              AND: [
                {
                  workerId,
                },
                {
                  createdAt: {
                    gte: startOfDay,
                  },
                },
              ],
            },
            orderBy: {
              createdAt: 'desc',
            },
          });
          const submissionCountByWorker = await tx.submission.count({
            where: {
              AND: [
                {
                  workerId,
                },
              ],
            },
          });

          return {
            submissions,
            submissionCountForDay: submissionCountForToday,
            submissionCountAllTime: submissionCountByWorker,
          };
        },
      );

      return submissions || [];
    } catch (error) {
      console.log('Error :', error);
      throw new InternalServerErrorException(error);
    }
  }

  async getSubmissionById(submissionId: string) {
    try {
      const submission =
        await this.databaseService.submission.findUniqueOrThrow({
          where: {
            id: submissionId,
          },
          include: {
            Worker: true,
            option: true,
            transaction: true,
            task: {
              include: {
                user: true,
                options: true,
              },
            },
          },
        });

      return submission;
    } catch (error) {
      console.log('ERROR :', error);
      throw new InternalServerErrorException(error);
    }
  }
  async getSubmissionsPerDay(req: Request) {
    try {
      const { workerId } = req.worker;

      const submissions = await this.databaseService.submission.findMany({
        where: {
          workerId,
        },
        include: {
          task: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      const submissionsPerDayByUser = submissions.reduce(
        (acc, submission) => {
          const date = new Date(submission.createdAt.toDateString()); // Ensure date is a Date object
          const existingEntry = acc.find(
            (entry) => entry.date.getTime() === date.getTime(),
          );
          if (existingEntry) {
            existingEntry.submissionCount++;
          } else {
            acc.push({ date, submissionCount: 1 });
          }
          return acc;
        },
        [] as { date: Date; submissionCount: number }[],
      );

      return submissionsPerDayByUser;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
