import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Serializer } from 'jsonapi-serializer';
import * as _ from 'lodash';
import PaginationUtils from '../utils/pagination.utils';

@Injectable()
export default class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((...args) => {
        const options: any = {};
        if (args[0].data.length) {
          if (args[0].data[0]._doc) {
            options.attributes = Object.keys(_.omit(args[0].data[0]._doc, ['_id', 'id']));
          } else {
            options.attributes = Object.keys(_.omit(args[0].data[0], ['_id', 'id']));
          }

          args[0].data.forEach((item: any) => {
            item.id = item._id;
            delete item._id;
          });
        } else if (args[0].data._doc) {
          options.attributes = Object.keys(_.omit(args[0].data._doc, ['_id', 'id']));
        } else {
          options.attributes = Object.keys(_.omit(args[0].data, ['_id', 'id']));
        }
        if (args[0].options) {
          options.topLevelLinks = PaginationUtils.getPaginationLinks(
            args[0].options.location,
            args[0].options.paginationParams,
            args[0].options.totalCount,
          );
          options.meta = { totalCount: args[0].options.totalCount };
        }

        return new Serializer(args[0].collectionName, options).serialize(args[0].data);
      }),
    );
  }
}
