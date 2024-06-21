import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  NotImplementedException,
  NotFoundException,
} from '@nestjs/common';
import { PublicKey } from '@solana/web3.js';
import { Request } from 'express';
import * as nacl from 'tweetnacl';
import { DatabaseService } from '../../engine/database/database.service';
import * as jwt from 'jsonwebtoken';
import { USER_SECRET_KEY } from 'src/engine/utils/config/env.config';
import { TaskStatisticsService } from 'src/engine/core/services/Statistics.service';
import { Wallet } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService,
    private statsService: TaskStatisticsService,
  ) {}

  async singin(request: Request) {
    try {
      const { publicKey, signString, signature } = request.body;

      console.log('INformations', publicKey, signString, signature);

      if (!publicKey || typeof publicKey !== 'string') {
        throw new ConflictException('Public key is missing or not a string');
      }

      const encodeString = new TextEncoder().encode(signString);

      const result = nacl.sign.detached.verify(
        encodeString,
        new Uint8Array(signature.data),
        new PublicKey(publicKey).toBytes(),
      );

      if (!result) {
        throw new UnauthorizedException('Signature verification failed');
      }

      // this transaction creates user pannel and wallet for user
      const user = await this.databaseService.$transaction(async (tx) => {
        let user = await tx.user.findUnique({
          where: {
            address: publicKey,
          },
          include: {
            Worker: true,
          },
        });

        let wallet: Wallet;

        if (!user) {
          let worker = await tx.worker.findUnique({
            where: {
              address: publicKey,
            },
          });

          if (!worker) {
            worker = await tx.worker.create({
              data: {
                address: publicKey,
              },
            });

            wallet = await tx.wallet.create({
              data: {
                workerId: worker.id,
              },
            });
          }

          user = await tx.user.create({
            data: { address: worker.address, workerId: worker.id },
            include: {
              Worker: true,
            },
          });

          await tx.worker.update({
            where: {
              id: worker.id,
            },
            data: {
              userId: user.id,
              walletId: wallet.id,
            },
          });
        }

        return user;
      });

      if (!user) {
        throw new NotImplementedException('User creation/updation failed');
      }

      const token = jwt.sign({ userId: user.id, publicKey }, USER_SECRET_KEY);

      return { token };
    } catch (error) {
      console.error('ERROR:', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getUser(request: Request) {
    try {
      const user = request.user;
      if (!user.userId || !user.publicKey) throw new UnauthorizedException();

      const User = await this.databaseService.user.findUnique({
        where: {
          id: user.userId,
          address: user.publicKey,
        },
        include: {
          tasks: true,
          Worker: {
            include: {
              wallet: true,
            },
          },
        },
      });

      if (!User) throw new NotFoundException();
      return User;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async getLastTaskOfUserStats(req: Request) {
    try {
      const { userId, publicKey } = req.user;

      if (!userId || !publicKey) throw new NotFoundException('User not found');

      const transaction = await this.databaseService.task.findFirst({
        where: {
          userId,
        },
        include: {
          submissions: true,
          user: true,
          options: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      const stats = this.statsService.getEachOptionPercentage(transaction);

      return { task: transaction, result: stats };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
