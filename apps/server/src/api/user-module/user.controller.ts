import { Controller, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signin')
  async singin(@Req() request: Request) {
    return await this.userService.singin(request);
  }
}
