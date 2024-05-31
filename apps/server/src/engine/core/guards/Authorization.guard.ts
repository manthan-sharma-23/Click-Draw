import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '../services/Jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    let token = request.headers.authorization as string;

    if (!token) throw new UnauthorizedException();

    if (token.startsWith('Bearer ')) token = token.split(' ')[1];
    const data = this.jwtService.decodeToken({ token });

    request.user = data;

    return true;
  }
}
