import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import { UserEntity } from '@components/v1/users/schemas/users.schema';
import IsLoggedGuard from '@guards/is-logged.guard';
import RequestUser from '@decorators/request-user.decorator';

@ApiExtraModels(UserEntity)
@Controller()
export default class HomeController {
  @ApiCookieAuth()
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(UserEntity),
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
  public getIndex(@RequestUser() user: UserEntity): UserEntity {
    return user;
  }
}
