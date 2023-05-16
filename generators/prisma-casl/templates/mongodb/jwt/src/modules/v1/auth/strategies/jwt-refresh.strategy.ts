import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from '@prisma/client';

import { JwtStrategyValidate } from '../interfaces/jwt-strategy-validate.interface';

@Injectable()
export default class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refreshToken') {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('REFRESH_TOKEN') || 'c15476aec025be7a094f97aac6eba4f69268e706e603f9e1ec4d815396318c86',
    });
  }

  async validate(payload: any): Promise<JwtStrategyValidate> {
    return {
      _id: payload._id,
      email: payload.email,
      roles: payload.roles,
    };
  }
}
