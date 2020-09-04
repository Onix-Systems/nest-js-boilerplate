import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import UserDto from '@components/users/dto/user.dto';
import UsersService from '@components/users/users.service';

@Injectable()
export default class AuthDataSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user, done: CallableFunction) {
    done(null, user);
  }

  async deserializeUser(user: UserDto, done: CallableFunction) {
    const foundUser = await this.usersService.getByEmail(user.email);

    if (!foundUser) {
      return done(new UnauthorizedException('The user does not exist'));
    }

    return done(null, user);
  }
}
