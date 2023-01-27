import _ from 'lodash';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { RolesEnum } from '@decorators/roles.decorator';

@Injectable()
export default class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<RolesEnum[]>('roles', context.getHandler());

    if (_.isEmpty(roles)) {
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
