import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import UsersService from '@v1/users/users.service';
import { User } from '@prisma/client';

@Injectable()
export default class GoogleDataSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    done(null, user);
  }

  async deserializeUser(user: User, done: CallableFunction) {
    const foundUser = await this.usersService.getVerifiedUserByEmail(user.email);
    if (!foundUser) {
      return done(new UnauthorizedException());
    }

    return done(null, { ...user, roles: foundUser.roles, _id: foundUser.id });
  }
}
