import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export default class IsLoggedGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const http = context.switchToHttp();

    const req = http.getRequest();
    const res = http.getResponse();

    if (req.isUnauthenticated()) {
      return res.redirect('/auth/login');
    }

    return true;
  }
}
