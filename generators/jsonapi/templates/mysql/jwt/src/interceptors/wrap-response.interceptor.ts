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
        const serializeOptions: any = {};
        const { data, options, collectionName } = args[0];

        if (data && collectionName) {
          if (data.length) {
            serializeOptions.attributes = Object.keys(_.omit(data[0], ['_id', 'id']));
            data.forEach((item: any) => {
              // eslint-disable-next-line no-param-reassign
              item.id = item._id;
              // eslint-disable-next-line no-param-reassign
              delete item._id;
            });
          } else {
            serializeOptions.attributes = Object.keys(_.omit(data, ['_id', 'id']));
          }
          if (options) {
            serializeOptions.topLevelLinks = PaginationUtils.getPaginationLinks(
              options.location,
              options.paginationParams,
              options.totalCount,
            );
            serializeOptions.meta = { totalCount: options.totalCount };
          }

          return new Serializer(collectionName, serializeOptions).serialize(data);
        }

        return {
          data: args[0].data ?? args[0],
        };
      }),
    );
  }
}

