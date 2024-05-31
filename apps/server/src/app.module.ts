import { Module } from '@nestjs/common';
import { UserModule } from './api/user-module/user.module';
import { TasksModule } from './api/tasks-module/tasks.module';

@Module({
  imports: [UserModule, TasksModule],
})
export class AppModule {}
