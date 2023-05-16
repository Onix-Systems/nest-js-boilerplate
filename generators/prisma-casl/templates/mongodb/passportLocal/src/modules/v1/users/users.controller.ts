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
import { User } from '@prisma/client';
import PoliciesGuard from '@guards/casl-roles.guard';
import UsersService from './users.service';
import { UserResponseEntity } from './entities/user-response.entity';

@ApiTags('Users')
@UseInterceptors(WrapResponseInterceptor)
@ApiExtraModels(UserResponseEntity)
@Controller()
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
  public getProfile(@RequestUser() user: User): User {
    return user;
  }

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
    description: 'Returns 200 if the template has been rendered successfully',
  })
  @UseGuards(PoliciesGuard)
  @Get()
  @Render('all-users')
  public async getAllUsers(@RequestUser() admin: User): Promise<any> {
    const foundUsers = await this.usersService.getAll();
    return { admin, users: foundUsers };
  }
}
