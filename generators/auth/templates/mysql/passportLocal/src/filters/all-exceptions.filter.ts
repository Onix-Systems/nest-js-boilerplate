import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  NotFoundException,
  UnauthorizedException,
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
        message:
          'Any message which should help the user to resolve the conflict',
      });
    }

    if (
      exception instanceof NotFoundException ||
      exception instanceof UnauthorizedException ||
      exception instanceof BadRequestException ||
      exception.code === 'ValidationException'
    ) {
      return res.redirect('/auth/sign-up'); // here you can specify rendering your page
    }
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: 'Something is broken' });
  }
}
