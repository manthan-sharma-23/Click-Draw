import { Module } from '@nestjs/common';
import { UserModule } from './api/user-module/user.module';
import { TasksModule } from './api/tasks-module/tasks.module';
import { WorkerModule } from './api/worker-module/worker.module';
import { SubmissionModule } from './api/submission-module/submission.module';

@Module({
  imports: [UserModule, TasksModule, WorkerModule, SubmissionModule],
})
export class AppModule {}
