import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { DatabaseService } from 'src/engine/database/database.service';
import { JwtService } from 'src/engine/core/services/Jwt.service';
import { AuthGuard } from 'src/engine/core/guards/Authorization.guard';
import { SolanaService } from 'src/engine/core/services/Solana.service';

@Module({
  providers: [
    WalletService,
    DatabaseService,
    JwtService,
    AuthGuard,
    SolanaService,
  ],
  controllers: [WalletController],
})
export class WalletModule {}
