import { Response as ExpressResponse } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

import { ExceptionResponse } from '@interfaces/exception-response.interface';
import ValidationExceptions from '@exceptions/validation.exceptions';

@Catch(ValidationExceptions)
export class ValidationExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const res = ctx.getResponse<ExpressResponse>();

    const exceptionResponse: ExceptionResponse = exception.getResponse() as ExceptionResponse;

    return res.status(HttpStatus.BAD_REQUEST).json({
      error: exception.name,
      messages: exceptionResponse.messages,
    });
  }
}
