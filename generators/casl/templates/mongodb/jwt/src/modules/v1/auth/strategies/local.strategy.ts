import { Strategy } from 'passport-local';
import { validate } from 'class-validator';
import { Request as ExpressRequest } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { ValidationError, Injectable, UnauthorizedException } from '@nestjs/common';
import SignInDto from '../dto/sign-in.dto';
import { ValidateUserOutput } from '../interfaces/validate-user-output.interface';
import ValidationExceptions from '@exceptions/validation.exceptions';

import AuthService from '../auth.service';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(req: ExpressRequest, email: string, password: string): Promise<ValidateUserOutput> {
    const errors = await validate(new SignInDto(req.body)) as ValidationError[];

    if (errors.length > 0) {
      throw new ValidationExceptions(errors);
    }

    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
