import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtStrategyValidate } from '../interfaces/jwt-strategy-validate.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class JwtWSAccessStrategy extends PassportStrategy(Strategy, 'accessTokenWS') {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (client: any) => {
          const bearerToken = client?.handshake?.headers?.authorization;
          return bearerToken ? bearerToken.split(' ')[1] : null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('ACCESS_TOKEN') || '<%= config.accessTokenSecret %>',
    });
  }
  async validate(payload: JwtStrategyValidate): Promise<JwtStrategyValidate> {
    return {
      _id: payload._id,
      email: payload.email,
      roles: payload.roles,
    };
  }
}
