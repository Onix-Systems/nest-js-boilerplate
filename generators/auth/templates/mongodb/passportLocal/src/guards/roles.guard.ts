import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
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

    const http = context.switchToHttp();
    const req = http.getRequest();
    const res = http.getResponse();
    if (req.isUnauthenticated()) {
      return res.redirect('/auth/login');
    }

    const haveAccess: boolean = roles.some((role) => role === req?.user?.role);
    if (!haveAccess) {
      return res.redirect('/home');
    }

    return true;
  }
}
