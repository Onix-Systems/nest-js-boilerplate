import { Response as ExpressResponse } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

import { ExceptionResponse } from '@interfaces/exception-response.interface';

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const res = ctx.getResponse<ExpressResponse>();

    const exceptionResponse: ExceptionResponse = exception.getResponse() as ExceptionResponse;

    const errorBody = {
      error: exception.name,
    };

    if (Array.isArray(exceptionResponse.message)) {
      Reflect.set(errorBody, 'messages', exceptionResponse.message);
    } else {
      Reflect.set(errorBody, 'message', exceptionResponse.message);
    }

    return res.status(HttpStatus.FORBIDDEN).json(errorBody);
  }
}
