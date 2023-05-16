import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import UsersService from '@v1/users/users.service';
import { UserDocument } from '@v1/users/schemas/users.schema';

@Injectable()
export default class GoogleDataSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: UserDocument, done: CallableFunction) {
    done(null, user);
  }

  async deserializeUser(user: UserDocument, done: CallableFunction) {
    const foundUser = await this.usersService.getVerifiedUserByEmail(user.email);
    if (!foundUser) {
      return done(new UnauthorizedException());
    }

    return done(null, { ...user, roles: foundUser.roles, _id: foundUser._id });
  }
}
