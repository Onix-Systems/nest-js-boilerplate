import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  NotFoundException,
  ForbiddenException,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import ServerErrorResponse from '@responses/server-error.response';
import ConflictResponse from '@responses/conflict.response';

@Catch()
export default class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const mongodbCodes = {
      bulkWriteError: 11000,
    };

    if (exception.code === mongodbCodes.bulkWriteError) {
      return res.status(HttpStatus.CONFLICT).json(new ConflictResponse());
    }

    if (
      exception instanceof NotFoundException
      || exception instanceof UnauthorizedException
      || exception instanceof BadRequestException
      || exception.code === 'ValidationException'
    ) {
      return res.redirect('/auth/sign-up'); // here you can specify rendering your page
    }
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new ServerErrorResponse());
  }
}
