import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export default class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    if (req.isUnauthenticated()) {
      throw new UnauthorizedException('Login please');
    }

    if (Array.isArray(roles)) {
      return roles.some((role) => req.user.roles.includes(role));
    }

    return req.user.roles.includes(roles);
  }
}
