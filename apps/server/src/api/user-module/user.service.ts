import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  NotImplementedException,
} from '@nestjs/common';
import { PublicKey } from '@solana/web3.js';
import { Request } from 'express';
import * as nacl from 'tweetnacl';
import { DatabaseService } from '../../engine/database/database.service';
import * as jwt from 'jsonwebtoken';
import { USER_SECRET_KEY } from 'src/engine/utils/config/env.config';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async singin(request: Request) {
    try {
      const { publicKey, signString, signature } = request.body;

      console.log(typeof publicKey);
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

      const user = await this.databaseService.user.upsert({
        where: { address: publicKey },
        update: { address: publicKey },
        create: { address: publicKey },
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
}
