import { ExceptionFilter, Catch, NotFoundException, ArgumentsHost } from '@nestjs/common';

@Catch(NotFoundException)
export default class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const http = host.switchToHttp();

    const res = http.getResponse();

    return res.status(404).redirect('/auth/login');
  }
}
