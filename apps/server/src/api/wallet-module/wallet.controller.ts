import { Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/engine/core/guards/Authorization.guard';
import { WalletService } from './wallet.service';

@Controller('v1/wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Get('transactions')
  @UseGuards(AuthGuard)
  async getWalletTransactions(@Req() req: Request) {
    return await this.walletService.getWalletTransactions(req);
  }

  @Put('pay-out')
  @UseGuards(AuthGuard)
  async PayoutWallet(@Req() req: Request) {
    return await this.walletService.PayoutWallet(req);
  }
}
