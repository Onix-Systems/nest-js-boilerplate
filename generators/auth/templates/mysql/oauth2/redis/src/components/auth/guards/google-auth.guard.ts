import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class GoogleAuthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext): Promise<boolean | never> {
    const can = await super.canActivate(context);

    if (can) {
      const request = context.switchToHttp().getRequest();

      await super.logIn(request);
    }

    return true;
  }

  static getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }
}
