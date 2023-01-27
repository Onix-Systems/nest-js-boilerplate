import * as bcrypt from 'bcryptjs';

import { Injectable, NotFoundException } from '@nestjs/common';

import UsersService from '@v1/users/users.service';
import { User } from '@prisma/client';
import { ValidateUserOutput } from './interfaces/validate-user-output.interface';

@Injectable()
export default class AuthService {
  constructor(private readonly usersService: UsersService) { }

  async validateUser(
    email: string,
    password: string,
  ): Promise<any | ValidateUserOutput> {
    const user = await this.usersService.getVerifiedUserByEmail(email) as User;

    if (!user) {
      throw new NotFoundException('The item does not exist');
    }

    const passwordCompared = await bcrypt.compare(password, user.password);

    if (passwordCompared) {
      return {
        id: user.id,
        email: user.email,
        roles: user.roles,
        verified: user.verified,
      };
    }

    return null;
  }
}
