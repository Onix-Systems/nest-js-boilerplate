import * as bcrypt from 'bcryptjs';

import { Injectable, NotFoundException } from '@nestjs/common';

import { RolesEnum } from "@decorators/roles.decorator";

import UsersService from '@v1/users/users.service';
import { ValidateUserOutput } from './interfaces/validate-user-output.interface';

@Injectable()
export default class AuthService {
  constructor(private readonly usersService: UsersService) { }

  public async validateUser(
    email: string,
    password: string,
  ): Promise<null | ValidateUserOutput> {
    const user = await this.usersService.getVerifiedUserByEmail(email);

    if (!user) {
      throw new NotFoundException('The item does not exist');
    }

    const passwordCompared = await bcrypt.compare(password, user.password);

    if (passwordCompared) {
      const roles = user.roles.map((role) => role.name as RolesEnum);

      return {
        id: user.id,
        email: user.email,
        verified: user.verified,
        roles,
      };
    }

    return null;
  }
}
