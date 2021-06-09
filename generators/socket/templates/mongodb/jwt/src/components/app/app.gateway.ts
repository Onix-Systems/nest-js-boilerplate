import WsExceptionsFilter from '@filters/ws-exceptions.filter';
import JwtWSAccessGuard from '@guards/jwt-ws-access.guard';
import { UseFilters, UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

/**
 * The class implements working with sockets
 */
@UseFilters(WsExceptionsFilter)
@WebSocketGateway(3001)
export default class AppGateway {
  /**
   * Returns you Hello world!
   * @returns {string} Hello, World!
   */
  @UseGuards(JwtWSAccessGuard)
  @SubscribeMessage('event')
  handleEvent() {
    return 'Hello, World!';
  }
}
