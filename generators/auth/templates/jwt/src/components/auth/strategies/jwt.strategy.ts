import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import UserDto from '@components/users/dto/user.dto';
import jwtConstants from '../constants';

import { IJwtStrategyValidate } from '../interfaces/IJwtStrategyValidate.interface';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: UserDto): Promise<IJwtStrategyValidate> {
    return {
      id: payload._id,
      email: payload.email,
    };
  }
}
