import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserDocument } from '@v1/users/schemas/users.schema';

import { JwtStrategyValidate } from '../interfaces/jwt-strategy-validate.interface';

@Injectable()
export default class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refreshToken') {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('REFRESH_TOKEN') || '<%= config.refreshTokenSecret %>',
    });
  }

  async validate(payload: UserDocument): Promise<JwtStrategyValidate> {
    return {
      _id: payload._id,
      email: payload.email,
      roles: payload.roles,
    };
  }
}
