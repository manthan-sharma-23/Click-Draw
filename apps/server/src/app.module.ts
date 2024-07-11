import { Module } from '@nestjs/common';
import { UserModule } from './api/user-module/user.module';
import { TasksModule } from './api/tasks-module/tasks.module';
import { WorkerModule } from './api/worker-module/worker.module';
import { SubmissionModule } from './api/submission-module/submission.module';
import { WalletModule } from './api/wallet-module/wallet.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    UserModule,
    TasksModule,
    WorkerModule,
    SubmissionModule,
    WalletModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist'),
      exclude: ['v1/*'],
    }),
  ],
})
export class AppModule {}
