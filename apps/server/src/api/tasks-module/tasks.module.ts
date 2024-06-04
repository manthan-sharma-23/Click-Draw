import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { DatabaseService } from 'src/engine/database/database.service';
import { JwtService } from 'src/engine/core/services/Jwt.service';
import { AuthGuard } from 'src/engine/core/guards/Authorization.guard';
import { S3Service } from 'src/engine/core/services/S3.service';
import { CloudFrontService } from 'src/engine/core/services/CloudFront.service';
import { TaskStatisticsService } from 'src/engine/core/services/Statistics.service';

@Module({
  providers: [
    TasksService,
    DatabaseService,
    JwtService,
    AuthGuard,
    S3Service,
    CloudFrontService,
    TaskStatisticsService,
  ],
  controllers: [TasksController],
})
export class TasksModule {}
