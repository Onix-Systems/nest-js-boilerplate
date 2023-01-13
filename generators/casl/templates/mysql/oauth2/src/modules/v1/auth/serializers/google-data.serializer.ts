import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import UsersService from '@v1/users/users.service';
import UserEntity from '@v1/users/schemas/user.entity';

import { RolesEnum } from '@decorators/roles.decorator';

@Injectable()
export default class GoogleDataSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: UserEntity, done: CallableFunction) {
    done(null, user);
  }

  async deserializeUser(user: UserEntity, done: CallableFunction) {
    const foundUser = await this.usersService.getVerifiedUserByEmail(user.email);

    if (!foundUser) {
      return done(new UnauthorizedException());
    }

    const roles = foundUser.roles.map((role) => role.name as RolesEnum);

    return done(null, { ...user, roles, id: foundUser.id });
  }
}
