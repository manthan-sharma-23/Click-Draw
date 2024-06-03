import { Module } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { SubmissionController } from './submission.controller';
import { DatabaseService } from 'src/engine/database/database.service';
import { AuthGuard } from 'src/engine/core/guards/Authorization.guard';
import { JwtService } from 'src/engine/core/services/Jwt.service';

@Module({
  providers: [SubmissionService, DatabaseService, AuthGuard, JwtService],
  controllers: [SubmissionController],
})
export class SubmissionModule {}
