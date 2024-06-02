import { Module } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { JwtService } from 'src/engine/core/services/Jwt.service';
import { AuthGuard } from 'src/engine/core/guards/Authorization.guard';
import { DatabaseService } from 'src/engine/database/database.service';

@Module({
  providers: [WorkerService, JwtService, AuthGuard, DatabaseService],
  controllers: [WorkerController],
})
export class WorkerModule {}
