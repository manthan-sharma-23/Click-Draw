import { Module } from '@nestjs/common';
import { UserModule } from './api/user-module/user.module';

@Module({
  imports: [UserModule],
})
export class AppModule {}
