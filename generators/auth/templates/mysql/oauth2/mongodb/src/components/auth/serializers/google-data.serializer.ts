import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import UsersService from '@components/users/users.service';
import UserEntity from '@components/users/entities/user.entity';

@Injectable()
export default class GoogleDataSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: UserEntity, done: CallableFunction) {
    done(null, user);
  }

  async deserializeUser(user: UserEntity, done: CallableFunction) {
    const foundUser = await this.usersService.getByEmail(user.email);

    if (!foundUser) {
      return done(new UnauthorizedException());
    }

    return done(null, user);
  }
}
