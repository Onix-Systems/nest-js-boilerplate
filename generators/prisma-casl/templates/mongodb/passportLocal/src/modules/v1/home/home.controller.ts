import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import IsLoggedGuard from '@guards/is-logged.guard';
import RequestUser from '@decorators/request-user.decorator';
import { UserResponseEntity } from '@v1/users/entities/user-response.entity';

@ApiExtraModels(UserResponseEntity)
@Controller()
export default class HomeController {
  @ApiCookieAuth()
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(UserResponseEntity),
        },
      },
    },
    description: 'Returns the logged user',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: 'Returns the unauthorized error',
  })
  @UseGuards(IsLoggedGuard)
  @Get('/')
  @Render('home')
  public getIndex(@RequestUser() user: User): User {
    return user;
  }
}
