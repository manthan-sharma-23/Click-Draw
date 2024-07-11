import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { SolanaService } from 'src/engine/core/services/Solana.service';
import { DatabaseService } from 'src/engine/database/database.service';

@Injectable()
export class WalletService {
  constructor(
    private databaseService: DatabaseService,
    private solanaService: SolanaService,
  ) {}

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

  async PayoutWallet(req: Request) {
    const { publicKey, workerId } = req.worker;
    const { address: anotherKey } = req.body;

    if (!publicKey || !workerId) {
      throw new UnauthorizedException('Not auhtorized to this route');
    }
    
    console.log(publicKey, workerId, anotherKey);
    try {
      // First Database tx to lock amount
      const lockWallet = await this.databaseService.$transaction(async (tx) => {
        const findWallet = await tx.wallet.findUnique({
          where: {
            workerId,
          },
        });

        const amountToLock = findWallet.currentAmount;

        const lockWallet = await tx.wallet.update({
          where: {
            id: findWallet.id,
          },
          data: {
            currentAmount: 0,
            lockedAmount: amountToLock,
          },
        });

        return lockWallet;
      });

      // On chain transaction
      const onchain_solana_transaction =
        await this.solanaService.sendLamportsOnChain(
          anotherKey || publicKey,
          lockWallet.lockedAmount,
        );

      if (
        onchain_solana_transaction.success &&
        onchain_solana_transaction.signature
      ) {
        // If onchain transaciton success
        const unlockWallet = await this.databaseService.$transaction(
          async (tx) => {
            const unlockWallet = await tx.wallet.update({
              where: {
                id: lockWallet.id,
              },
              data: {
                currentAmount: 0,
                lockedAmount: 0,
              },
            });

            const tx_description = `${lockWallet.lockedAmount} lamports transferred to onchain Wallet`;
            const transactionLedging = await tx.transaction.create({
              data: {
                walletId: unlockWallet.id,
                from: 'click_draw_wallet',
                to: onchain_solana_transaction.to,
                amount: lockWallet.lockedAmount,
                description: tx_description,
                status: 'SUCCESS',
                transaction_type: 'WITHDRAW',
                signature: onchain_solana_transaction.signature,
                post_balance: unlockWallet.currentAmount,
              },
            });

            return transactionLedging;
          },
        );

        return {
          tx: unlockWallet,
          message: `${unlockWallet.amount} lamports cashed out :)`,
        };
      } else {
        // If onchain transaciton not success
        const unlockWallet = await this.databaseService.$transaction(
          async (tx) => {
            const unlockWallet = await tx.wallet.update({
              where: {
                id: lockWallet.id,
              },
              data: {
                currentAmount: lockWallet.lockedAmount,
                lockedAmount: 0,
              },
            });

            const tx_description = `${lockWallet.lockedAmount} lamports couldn't be transferred to mainnet`;
            const transactionLedging = await tx.transaction.create({
              data: {
                walletId: unlockWallet.id,
                from: 'click_draw_wallet',
                to: onchain_solana_transaction.to,
                amount: 0,
                description: tx_description,
                status: 'REVOKED',
                transaction_type: 'WITHDRAW',
                post_balance: unlockWallet.currentAmount,
              },
            });

            return transactionLedging;
          },
        );

        return {
          tx: unlockWallet,
          message: `${unlockWallet.amount} lamports cashed out :)`,
        };
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
