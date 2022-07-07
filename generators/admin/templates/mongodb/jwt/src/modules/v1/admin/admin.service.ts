import _ from 'lodash';
import * as bcrypt from 'bcryptjs';
import { validate } from 'class-validator';

import { Injectable } from '@nestjs/common';

import SignInDto from '@v1/auth/dto/sign-in.dto';
import UsersRepository from '@v1/users/users.repository';

@Injectable()
export default class AdminService {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) {}

  async authAdmin(email: string, password: string): Promise<{ email: string } | null> {
    const errors = await validate(new SignInDto({ email, password }));

    if (!_.isEmpty(errors)) {
      return null;
    }

    const admin = await this.isAdmin(email, password);

    if (admin) {
      return {
        email,
      };
    }

    return null;
  }

  async isAdmin(email: string, password: string) {
    const admin = await this.usersRepository.getVerifiedAdminByEmail(email);

    if (admin) {
      return bcrypt.compare(password, admin.password);
    }

    return null;
  }
}
