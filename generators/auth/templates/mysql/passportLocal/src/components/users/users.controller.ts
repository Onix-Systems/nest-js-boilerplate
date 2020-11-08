import {
  Controller,
  Get,
  UseGuards,
  Render,
  Res,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCookieAuth,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';

import IsLoggedGuard from '@guards/is-logged.guard';
import WrapResponseInterceptor from '@interceptors/wrap-response.interceptor';
import SuccessResponse from '@responses/success.response';
import AppUtils from '@components/app/app.utils';
import UsersService from './users.service';
import UserEntity from './entities/user.entity';

@ApiTags('Users')
@UseInterceptors(WrapResponseInterceptor)
@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCookieAuth()
  @ApiOkResponse({
    type: AppUtils.DtoFactory.wrap(UserEntity),
    description: 'Returns 200 if the template has been rendered successfully',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UseGuards(IsLoggedGuard)
  @Get('/profile')
  @Render('profile')
  getProfile(@Request() req: ExpressRequest, @Res() res: ExpressResponse): SuccessResponse {
    return new SuccessResponse(null, req.user as UserEntity);
  }

  @ApiCookieAuth()
  @ApiOkResponse({
    type: AppUtils.DtoFactory.wrap([UserEntity]),
    description: 'Returns 200 if the template has been rendered successfully',
  })
  @Get()
  async getAllUsers(): Promise<SuccessResponse> {
    const foundUsers = await this.usersService.getAll();

    return new SuccessResponse(null, {
      ...foundUsers,
    });
  }
}
