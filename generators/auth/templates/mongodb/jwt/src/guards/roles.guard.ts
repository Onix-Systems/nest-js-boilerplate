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
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request: Request = context.switchToHttp().getRequest();
    const tokenData = (await this.jwtService
      .decode(request.headers.authorization?.split('Bearer')[1].trim() as string) as JwtDecodeResponse | null);
    if (tokenData?.role === RolesEnum.admin) {
      return true;
    }
    return !tokenData ? false : roles.includes(tokenData?.role);
  }
}
