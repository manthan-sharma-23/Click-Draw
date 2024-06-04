import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseService } from 'src/engine/database/database.service';
import { AuthGuard } from 'src/engine/core/guards/Authorization.guard';
import { JwtService } from 'src/engine/core/services/Jwt.service';
import { TaskStatisticsService } from 'src/engine/core/services/Statistics.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    DatabaseService,
    TaskStatisticsService,
    AuthGuard,
    JwtService,
  ],
})
export class UserModule {}
