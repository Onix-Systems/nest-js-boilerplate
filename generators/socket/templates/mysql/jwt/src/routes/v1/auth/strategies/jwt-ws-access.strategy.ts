import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtStrategyValidate } from '../interfaces/jwt-strategy-validate.interface';
import authConstants from '../auth-constants';

@Injectable()
export default class JwtWSAccessStrategy extends PassportStrategy(Strategy, 'accessTokenWS') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (client: any) => {
          const bearerToken = client?.handshake?.headers?.authorization;
          return bearerToken ? bearerToken.split(' ')[1] : null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: this.configService.get<string>('ACCESS_TOKEN') || '<%= config.accessTokenSecret %>',
    });
  }
  async validate(payload: JwtStrategyValidate): Promise<JwtStrategyValidate> {
    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };
  }
}
