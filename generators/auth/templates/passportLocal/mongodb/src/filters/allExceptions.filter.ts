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

@Catch()
export default class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const mongodbCodes = {
      bulkWriteError: 11000,
    };

    if (exception.code === mongodbCodes.bulkWriteError) {
      return res.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        message: 'Entities Conflict',
      });
    }

    if (
      exception instanceof NotFoundException
      || exception instanceof ForbiddenException
      || exception instanceof UnauthorizedException
      || exception instanceof BadRequestException
      || exception instanceof ConflictException
      || exception.code === 'ValidationException'
    ) {
      res.redirect('/auth/login'); // here you can specify rendering your page
    }

    return res.status(500).json({
      statusCode: 500,
      message: 'InternalServerError',
    });
  }
}
