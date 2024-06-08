import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from '../../engine/database/database.service';
import { JwtService } from '../../engine/core/services/Jwt.service';
import { Request } from 'express';
import * as nacl from 'tweetnacl';
import * as jwt from 'jsonwebtoken';
import { PublicKey } from '@solana/web3.js';
import { WORKER_SECRET_KEY } from 'src/engine/utils/config/env.config';

@Injectable()
export class WorkerService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async signin(request: Request) {
    const { publicKey, signString, signature } = request.body;
    console.log(publicKey, signString, signature);
    try {
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
        throw new UnauthorizedException('Singature verification failed');
      }

      console.log('Result ', result);

      const worker = await this.databaseService.$transaction(async (tx) => {
        let worker = await tx.worker.findUnique({
          where: {
            address: publicKey,
          },
          include: {
            wallet: true,
          },
        });

        if (!worker) {
          const createWorker = await tx.worker.create({
            data: {
              address: publicKey,
            },
          });

          const wallet = await tx.wallet.create({
            data: {
              workerId: createWorker.id,
            },
          });

          worker = {
            ...createWorker,
            wallet: wallet,
          };
        }

        return worker;
      });

      if (!worker)
        throw new NotImplementedException(
          "Couldn't process worker database request",
        );

      const token = jwt.sign(
        { workerId: worker.id, publicKey: worker.address },
        WORKER_SECRET_KEY,
      );

      return { token };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message as string);
    }
  }

  async getWorker(req: Request) {
    try {
      const { workerId, publicKey } = req.worker;

      if (!workerId || !publicKey) throw new UnauthorizedException();

      const worker = await this.databaseService.worker.findUnique({
        where: {
          id: workerId,
          address: publicKey,
        },
        include: {
          wallet: true,
        },
      });

      if (!worker) throw new NotFoundException();

      return worker;
    } catch (error) {
      console.log('error ', error);
      throw new InternalServerErrorException();
    }
  }

  async getWorkerTasks(req: Request) {
    try {
      const { workerId, publicKey } = req.worker;

      if (!workerId || !publicKey) throw new UnauthorizedException();

      const transactions = await this.databaseService.task.findMany({
        where: {
          AND: [
            {
              responseLimit: {
                gt: 0,
              },
            },
            { status: 'ACTIVE' },
            {
              submissions: {
                none: {
                  workerId: workerId,
                },
              },
            },
          ],
        },
        include: {
          options: true,
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return transactions || [];
    } catch (error) {
      console.log('ERROR :', error);
      throw new InternalServerErrorException();
    }
  }

  async getNextTask(req: Request) {
    try {
      const { workerId, publicKey } = req.worker;

      if (!workerId || !publicKey) throw new UnauthorizedException();

      const nextTask = await this.databaseService.task.findFirstOrThrow({
        where: {
          AND: [
            {
              responseLimit: {
                gt: 0,
              },
            },
            { status: 'ACTIVE' },
            {
              submissions: {
                none: {
                  workerId: workerId,
                },
              },
            },
          ],
        },
        include: {
          options: true,
          user: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      return nextTask;
    } catch (error) {
      console.log('ERROR : ', error);
      throw new InternalServerErrorException(error);
    }
  }
}
