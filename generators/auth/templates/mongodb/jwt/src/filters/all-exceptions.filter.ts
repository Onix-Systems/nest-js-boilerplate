import {
  ArgumentsHost, Catch, ExceptionFilter, HttpStatus,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { ExceptionResponse } from '@interfaces/exception-response.interface';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Error } from 'jsonapi-serializer';

@Catch()
export default class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const res = ctx.getResponse<ExpressResponse>();
    const exceptionResponse: null | ExceptionResponse = exception.getResponse
      ? (exception.getResponse() as ExceptionResponse)
      : null;
    const status: number = exception.getStatus ? exception.getStatus() : 500;

    const mongodbCodes = {
      bulkWriteError: 11000, // a duplicate error code in mongoose
    };

    if (exception.code === mongodbCodes.bulkWriteError) {
      return res.status(HttpStatus.CONFLICT).json(
        new Error({
          source: { pointer: '/data/attributes/email' },
          title: 'Duplicate key',
          detail: exception.message,
        }),
      );
    }

    if (exception.response?.errorType === 'ValidationError') {
      return res.status(HttpStatus.BAD_REQUEST).json(
        new Error(exceptionResponse ? exceptionResponse.errors : {}),
      );
    }

    return res.status(status).json(new Error({
      title: exceptionResponse?.error,
      detail: exception?.message,
    }));
  }
}
