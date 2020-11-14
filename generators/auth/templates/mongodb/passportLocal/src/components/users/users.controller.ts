import {
  Controller,
  Get,
  UseGuards,
  Render,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCookieAuth,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import IsLoggedGuard from '@guards/is-logged.guard';
import WrapResponseInterceptor from '@interceptors/wrap-response.interceptor';
import SuccessResponse from '@responses/success.response';
import AppUtils from '@components/app/app.utils';
import RequestUser from '@decorators/request-user.decorator';
import UsersService from './users.service';
import { UserEntity } from './schemas/users.schema';

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
  public getProfile(@RequestUser() user: UserEntity): SuccessResponse {
    return new SuccessResponse(null, user);
  }

  @ApiCookieAuth()
  @ApiOkResponse({
    type: AppUtils.DtoFactory.wrap([UserEntity]),
    description: 'Returns 200 if the template has been rendered successfully',
  })
  @Get()
  public async getAllUsers(): Promise<SuccessResponse> {
    const foundUsers = await this.usersService.getAll();

    return new SuccessResponse(null, foundUsers);
  }
}
