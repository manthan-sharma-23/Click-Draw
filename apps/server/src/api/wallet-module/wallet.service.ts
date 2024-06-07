import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Request } from 'express';
import { DatabaseService } from 'src/engine/database/database.service';

@Injectable()
export class WalletService {
  constructor(private databaseService: DatabaseService) {}
  async getWalletTransactions(req: Request) {
    try {
      let address = '';

      if (req.user) {
        address = req.user.publicKey;
      } else {
        address = req.worker.publicKey;
      }

      const worker = await this.databaseService.worker.findUnique({
        where: {
          address,
        },
        include: {
          wallet: {
            include: {
              transactions: {
                orderBy: {
                  createdAt: 'desc',
                },
              },
            },
          },
        },
      });

      const txs = worker.wallet.transactions;

      return txs;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
