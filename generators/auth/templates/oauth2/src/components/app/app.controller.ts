import { Get, Controller } from '@nestjs/common';
import AppService from './app.service';

@Controller('hello')
export default class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  index(): string {
    return this.appService.getHelloMessage();
  }
}
