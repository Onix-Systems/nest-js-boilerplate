import { Injectable } from '@nestjs/common';

@Injectable()
export default class AppService {
  getHelloMessage() {
    return 'Hello!';
  }
}
