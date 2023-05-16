import _ from 'lodash';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { JwtDecodeResponse } from '@interfaces/jwt-decode-response.interface';
import { RolesEnum } from '@decorators/roles.decorator';

@Injectable()
export default class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<RolesEnum[]>('roles', context.getHandler());

    if (_.isEmpty(roles)) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();

    const tokenData = (await this.jwtService
      .decode(request.headers.authorization?.split('Bearer')[1].trim() as string) as JwtDecodeResponse | null);

    return roles.some((role) => tokenData?.roles.includes(role));
  }
}
