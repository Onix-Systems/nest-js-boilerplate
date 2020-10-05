import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import UserProfileDto from '@components/users/dto/user-profile.dto';
import { UserGooglePayload } from '@components/auth/interfaces/user-google-payload.interface';

@Injectable()
export default class GoogleStrategy extends PassportStrategy(
  Strategy,
  'google',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('OAUTH2_GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('OAUTH2_GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('OAUTH2_GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: unknown,
    done: (err: null | Error, data: object | UserGooglePayload) => void,
  ) {
    const { name, emails, photos } = profile as UserProfileDto;

    const user: UserGooglePayload = {
      accessToken,
      refreshToken,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
    };

    done(null, user);
  }
}
