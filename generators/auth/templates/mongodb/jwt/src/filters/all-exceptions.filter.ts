import {
  HttpStatus,
  ExceptionFilter,
  Catch,
  ArgumentsHost,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { ExceptionResponse } from '@interfaces/exception-response.interface';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

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
      return res.status(HttpStatus.CONFLICT).json({
        message: exceptionResponse?.message,
        error: exceptionResponse?.error,
      });
    }

    return res.status(status).json({
      message: exceptionResponse?.message,
      error: exceptionResponse?.error,
    });
  }
}
