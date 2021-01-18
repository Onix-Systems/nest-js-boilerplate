import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';

import UserEntity from '@components/users/entities/user.entity';
import IsLoggedGuard from '@guards/is-logged.guard';
import RequestUser from '@decorators/request-user.decorator';
import SuccessResponse from '@responses/success.response';

@ApiExtraModels(UserEntity)
@Controller('home')
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
    description: 'Returns the unauthorized error',
  })
  @UseGuards(IsLoggedGuard)
  @Get('/')
  @Render('home')
  public getIndex(@RequestUser() user: UserEntity): SuccessResponse {
    return new SuccessResponse(null, user);
  }
}
