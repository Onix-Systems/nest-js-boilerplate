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
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import IsLoggedGuard from '@guards/is-logged.guard';
import WrapResponseInterceptor from '@interceptors/wrap-response.interceptor';
import RequestUser from '@decorators/request-user.decorator';
import UsersService from './users.service';
import UserEntity from './entities/user.entity';

@ApiTags('Users')
@UseInterceptors(WrapResponseInterceptor)
@ApiExtraModels(UserEntity)
@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
    description: 'Returns 200 if the template has been rendered successfully',
  })
  @ApiInternalServerErrorResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
        details: {},
      },
    },
    description: 'Internal Server Error',
  })
  @UseGuards(IsLoggedGuard)
  @Get('/profile')
  @Render('profile')
  public getProfile(@RequestUser() user: UserEntity): UserEntity {
    return user;
  }

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
    description: 'Returns 200 if the template has been rendered successfully',
  })
  @Get()
  public async getAllVerified(): Promise<UserEntity[] | []> {
    return this.usersService.getAllVerified();
  }
}
