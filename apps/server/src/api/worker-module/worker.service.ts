import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
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

      const worker = await this.databaseService.worker.upsert({
        where: { address: publicKey },
        update: { address: publicKey },
        create: { address: publicKey },
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
}
