import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export default class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(({ details, data, message }) => {
      // if this an error response then return first object if no then second..
      return details ? {
        message,
        details,
      } : {
        message,
        data,
      };
    }));
  }
}
