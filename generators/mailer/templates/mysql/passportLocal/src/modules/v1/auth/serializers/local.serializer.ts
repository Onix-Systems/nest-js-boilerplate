import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import UsersService from '@v1/users/users.service';
import UserEntity from '@v1/users/entities/user.entity';

@Injectable()
export default class LocalSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  public serializeUser(user: UserEntity, done: CallableFunction) {
    done(null, user);
  }

  public async deserializeUser(user: UserEntity, done: CallableFunction) {
    const foundUser: UserEntity | undefined = await this.usersService.getById(
      user.id,
    );

    if (!foundUser) {
      return done(new UnauthorizedException('The user does not exist'));
    }

    return done(null, user);
  }
}
