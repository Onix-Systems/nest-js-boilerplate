import * as bcrypt from 'bcrypt';

import { Injectable, NotFoundException } from '@nestjs/common';

import UsersService from '@components/users/users.service';
import { ValidateUserOutput } from './interfaces/validate-user-output.interface';

@Injectable()
export default class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<null | ValidateUserOutput> {
    const user = await this.usersService.getVerifiedByEmail(email);

    if (!user) {
      throw new NotFoundException('The item does not exist');
    }

    const passwordCompared = await bcrypt.compare(password, user.password);

    if (passwordCompared) {
      return {
        _id: user._id,
        email: user.email,
        verified: user.verified,
      };
    }

    return null;
  }
}
