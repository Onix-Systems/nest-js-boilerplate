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
import { Roles, RolesEnum } from '@decorators/roles.decorator';
import UsersService from './users.service';
import UserEntity from './entities/user.entity';
import PoliciesGuard from '@guards/casl-roles.guard';

@ApiTags('Users')
@UseInterceptors(WrapResponseInterceptor)
@ApiExtraModels(UserEntity)
@Controller()
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
  @UseGuards(PoliciesGuard)
  @Roles(RolesEnum.ADMIN)
  @Get()
  @Render('all-users')
  public async getAllVerified(@RequestUser() admin: UserEntity): Promise<any> {
    const foundUsers = await this.usersService.getAll();

    const users = foundUsers.map((user) => ({
      ...user,
      roles: user.roles.map((role) => role.name),
    }));

    return { admin, users };
  }
}
