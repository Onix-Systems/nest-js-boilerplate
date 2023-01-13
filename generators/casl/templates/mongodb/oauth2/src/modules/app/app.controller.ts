import { Get, Controller } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import AppService from './app.service';

@ApiTags('App')
@Controller('hello')
export default class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse({ description: 'Displays hello message' })
  @Get()
  index(): string {
    return this.appService.getHelloMessage();
  }
}
