import AppService from './app.service';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  CacheInterceptor, CacheKey, CacheTTL, Controller, Get, UseInterceptors,
} from '@nestjs/common';

@Controller()
export default class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse({ description: 'Returns you Hello world!' })
  @Get()
  sayHello(): string {
    return this.appService.getHello();
  }
}
