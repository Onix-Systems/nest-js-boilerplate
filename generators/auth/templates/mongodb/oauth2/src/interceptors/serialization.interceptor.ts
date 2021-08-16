import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getSerializeType } from '@decorators/serialization.decorator';

@Injectable()
export default class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((args) => {
        const SerializeType = getSerializeType(context.getHandler());
        const entity = new SerializeType();
        return Object.assign(entity, args);
      }),
    );
  }
}
