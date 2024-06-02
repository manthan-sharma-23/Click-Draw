import { Module } from '@nestjs/common';
import { UserModule } from './api/user-module/user.module';
import { TasksModule } from './api/tasks-module/tasks.module';
import { WorkerModule } from './api/worker-module/worker.module';

@Module({
  imports: [UserModule, TasksModule, WorkerModule],
})
export class AppModule {}
