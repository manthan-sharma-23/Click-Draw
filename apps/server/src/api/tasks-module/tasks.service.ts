import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  PreconditionFailedException,
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

      //wallet trransact

      const wallet_tx = await this.databaseService.$transaction(async (tx) => {
        const address = user.publicKey;

        const worker = await tx.worker.findUnique({
          where: {
            address,
          },
        });

        const wallet = await tx.wallet.findUnique({
          where: {
            workerId: worker.id,
          },
        });

        const amount = data.funds;

        if (data.useWallet) {
          const walletAmount = wallet.currentAmount;
          let val = walletAmount - amount;

          if (val <= 0) {
            val = -1 * val;
            const wallet_use_description = `${wallet.currentAmount} lamports debited from  wallet for creating task`;
            const solana_mainnet_description = `${amount} lamports debited from solana net for creating task`;

            const afterUpdateWallet = await tx.wallet.update({
              where: {
                workerId: worker.id,
              },
              data: {
                currentAmount: 0,
              },
            });

            // wallet transaction
            await tx.transaction.create({
              data: {
                walletId: wallet.id,
                description: wallet_use_description,
                amount: walletAmount,
                status: 'SUCCESS',
                transaction_type: 'WITHDRAW',
                to: 'click_draw_task_creation',
                from: 'Wallet',
                post_balance: afterUpdateWallet.currentAmount,
              },
            });

            // solana mainnet tranasaction
            await tx.transaction.create({
              data: {
                walletId: wallet.id,
                description: solana_mainnet_description,
                amount: val,
                status: 'SUCCESS',
                transaction_type: 'WITHDRAW',
                to: 'click_draw_task_creation',
                from: 'Solana_Onchain',
                post_balance: afterUpdateWallet.currentAmount,
              },
            });
          } else {
            const wallet_use_description = `${amount} lamports debited for creating task through Wallet`;

            const afterWalletUpdate = await tx.wallet.update({
              where: {
                workerId: worker.id,
              },
              data: {
                currentAmount: val,
              },
            });

            await tx.transaction.create({
              data: {
                walletId: wallet.id,
                description: wallet_use_description,
                amount,
                status: 'SUCCESS',
                transaction_type: 'WITHDRAW',
                to: 'click_draw_task_creation',
                from: 'Wallet',
                post_balance: afterWalletUpdate.currentAmount,
              },
            });
          }
        }

        // const wallet = await tx.wallet.update({
        //   where: {
        //     workerId: worker.id,
        //   },
        // });
      });

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
          endAt: this.addDaysToDate(data.endAt || new Date(), 5),
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
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (!tasks) throw new NotFoundException();

      return tasks;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
  private addDaysToDate(date: Date, days: number) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  async getTaskResult(
    req: Request,
    taskId: number,
  ): Promise<{
    task: Task;
    result: OptionStatistics[];
  }> {
    try {
      const { userId } = req.user;
      const task = await this.databaseService.task.findUniqueOrThrow({
        where: { id: taskId },
        include: {
          submissions: {
            include: {
              option: true,
              Worker: true,
            },
          },
          user: true,
          options: true,
        },
      });
      if (task.userId !== userId) {
        throw new PreconditionFailedException(
          'You can only view tasks analytics created by you',
        );
      }

      const taskResult = this.statsService.getEachOptionPercentage(task);

      return { task, result: taskResult };
    } catch (error) {
      console.log('ERROR : ', error);
      throw new InternalServerErrorException(error);
    }
  }

  async getTaskById(id: number, req: Request) {
    try {
      const task = await this.databaseService.task.findFirstOrThrow({
        where: {
          id,
        },
        include: {
          options: true,
          user: true,
          submissions: {
            include: {
              option: true,
            },
          },
        },
      });

      return task;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
