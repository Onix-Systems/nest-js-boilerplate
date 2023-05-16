import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import _ from 'lodash';
import { getSerializeType } from '@decorators/serialization.decorator';

const getSerializer = (entity: any) => (data: any) => Object.assign(entity, data);

@Injectable()
export default class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((args) => {
        const SerializeType = getSerializeType(context.getHandler());
        const serializer = getSerializer(new SerializeType());

        if (_.isArray(args)) {
          if (args && args[0] && args[0].toJSON) {
            return serializer({ data: args.map((doc) => doc.toJSON()) });
          }

          return serializer({ data: args });
        }

        if (args && args.toJSON) {
          return serializer(args.toJSON());
        }

        return serializer(args);
      }),
    );
  }
}
