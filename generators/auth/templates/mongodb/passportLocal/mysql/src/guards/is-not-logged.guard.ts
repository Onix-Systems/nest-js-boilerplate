import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export default class IsNotLoggedGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const http = context.switchToHttp();

    const req = http.getRequest();
    const res = http.getResponse();

    if (req.isAuthenticated()) {
      return res.redirect('/home');
    }

    return true;
  }
}
