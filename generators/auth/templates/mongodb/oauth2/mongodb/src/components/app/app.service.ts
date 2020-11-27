import open from 'open';

import { Injectable } from '@nestjs/common';

@Injectable()
export default class AppService {
  getHelloMessage() {
    return 'Hello!';
  }

  async openSwagger(): Promise<void> {
    const url = 'http://localhost:3000/api';

    await open(url);
  }
}
