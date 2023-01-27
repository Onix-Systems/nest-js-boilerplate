import _ from 'lodash';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {RolesEnum} from "@decorators/roles.decorator";

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

    const http = context.switchToHttp();
    const req = http.getRequest();
    const res = http.getResponse();
    if (req.isUnauthenticated()) {
      return res.redirect('/v1/auth/login');
    }

    const haveAccess: boolean = this.getAccess(req.user.roles, roles);

    if (!haveAccess) {
      return res.redirect('/v1/home');
    }

    return true;
  }

  private getAccess(user: RolesEnum[], roles: RolesEnum[]) {
    return roles.some((role) => user.includes(role as RolesEnum));
  }
}
