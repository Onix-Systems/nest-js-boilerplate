import {
  Controller,
  Get,
  Render,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import AppUtils from '@components/app/app.utils';
import { UserEntity } from '@components/users/schemas/users.schema';
import IsLoggedGuard from '@guards/is-logged.guard';
import RequestUser from '@decorators/request-user.decorator';
import SuccessResponse from '@responses/success.response';

@Controller('home')
export default class HomeController {
  @ApiCookieAuth()
  @ApiOkResponse({
    type: AppUtils.DtoFactory.wrap(UserEntity),
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
