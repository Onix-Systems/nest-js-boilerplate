import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import UsersService from '@v1/users/users.service';
import { User, UserDocument } from '@v1/users/schemas/users.schema';

@Injectable()
export default class LocalSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    done(null, user);
  }

  async deserializeUser(user: UserDocument, done: CallableFunction) {
    const foundUser = await this.usersService.getById(user._id);

    if (!foundUser) {
      return done(new UnauthorizedException('The user does not exist'));
    }

    return done(null, user);
  }
}
