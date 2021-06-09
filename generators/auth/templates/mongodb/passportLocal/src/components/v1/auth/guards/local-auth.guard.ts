import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean | never> {
    const can = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();

    await super.logIn(request);

    return can;
  }

  static getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }
}
