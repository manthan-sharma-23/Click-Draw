import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { DatabaseService } from 'src/engine/database/database.service';
import { JwtService } from 'src/engine/core/services/Jwt.service';
import { AuthGuard } from 'src/engine/core/guards/Authorization.guard';

@Module({
  providers: [TasksService, DatabaseService, JwtService, AuthGuard],
  controllers: [TasksController],
})
export class TasksModule {}
