import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';

@Catch()
export default class WsExceptionsFilter extends BaseWsExceptionFilter {
  catch(exception: any, host: ArgumentsHost ) {
    const client = host.switchToWs().getClient();

    if (exception.response?.message === 'Unauthorized') {
      client.emit('on-error', {
        message: exception.response.message,
        statusCode: exception.response.statusCode,
      });
      return;
    }

    super.catch(exception, host);
  }
}