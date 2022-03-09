import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import authConstants from '../auth-constants';

import { JwtStrategyValidate } from '../interfaces/jwt-strategy-validate.interface';
import UsersEntity from '@v1/users/entity/user.entity';

@Injectable()
export default class JwtAccessStrategy extends PassportStrategy(Strategy, 'accessToken') {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('ACCESS_TOKEN') || '<%= config.accessTokenSecret %>',
    });
  }

  async validate(payload: UsersEntity): Promise<JwtStrategyValidate> {
    return {
      _id: payload._id,
      email: payload.email,
      role: payload.role,
    };
  }
}
