import {
  HttpStatus,
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  NotFoundException,
  ForbiddenException,
  UnauthorizedException,
  BadRequestException, ValidationError,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { ExceptionResponse } from '@interfaces/exception-response.interface';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import BadRequestResponse from '../responses/bad-request.response';
import NotFoundResponse from '../responses/not-found.response';
import UnauthorizedResponse from '../responses/unauthorized.response';
import ForbiddenResponse from '../responses/forbidden.response';
import ServerErrorResponse from '../responses/server-error.response';
import ConflictResponse from '../responses/conflict.response';

@Catch()
export default class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const res = ctx.getResponse<ExpressResponse>();
    const exceptionMessage: string | null = exception.message || null;
    const exceptionResponse: null | ExceptionResponse = exception.getResponse
      ? exception.getResponse() as ExceptionResponse
      : null;
    const status: number = exception.getStatus
      ? exception.getStatus()
      : 500;

    const mongodbCodes = {
      bulkWriteError: 11000, // a duplicate error code in mongoose
    };

    if (exception.code === mongodbCodes.bulkWriteError) {
      return res.status(HttpStatus.CONFLICT).json(new ConflictResponse());
    }

    // ValidationException
    if (exception instanceof BadRequestException && exceptionResponse) {
      return res.status(status).json(new BadRequestResponse(
        exceptionMessage,
        exceptionResponse.message as ValidationError[],
      ));
    }
    if (exception instanceof NotFoundException) {
      return res.status(status).json(new NotFoundResponse(exceptionMessage));
    }
    if (exception instanceof UnauthorizedException) {
      return res.status(status).json(new UnauthorizedResponse(exceptionMessage));
    }
    if (exception instanceof ForbiddenException) {
      return res.status(status).json(new ForbiddenResponse(exceptionMessage));
    }

    return res.status(status).json(new ServerErrorResponse(exceptionMessage));
  }
}
