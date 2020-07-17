import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { UserDto } from '../../users/dto/user.dto';

import { IJwtStrategyValidate } from '../interfaces/IJwtStrategyValidate.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: UserDto): Promise<IJwtStrategyValidate> {
      return {
          id: payload.id,
          email: payload.email,
      };
  }
}
