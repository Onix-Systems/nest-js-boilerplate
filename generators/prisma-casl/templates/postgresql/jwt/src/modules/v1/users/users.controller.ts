import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiParam,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import JwtAccessGuard from '@guards/jwt-access.guard';
import WrapResponseInterceptor from '@interceptors/wrap-response.interceptor';
import Serialize from '@decorators/serialization.decorator';
import { AllUsersResponseEntity, UserResponseEntity } from '@v1/users/entities/user-response.entity';
import UsersService from './users.service';
import { FoundUsers } from './interfaces/found-users.interface';

@ApiTags('Users')
@ApiBearerAuth()
@UseInterceptors(WrapResponseInterceptor)
@ApiExtraModels(UserResponseEntity)
@Controller()
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(UserResponseEntity),
        },
      },
    },
    description: '200. Success. Returns a user',
  })
  @ApiNotFoundResponse({
    description: '404. NotFoundException. User was not found',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '401. UnauthorizedException.',
  })
  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  @UseGuards(JwtAccessGuard)
  @Serialize(UserResponseEntity)
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<FoundUsers | never> {
    const foundUser = await this.usersService.getVerifiedUserById(id);

    if (!foundUser) {
      throw new NotFoundException('The user does not exist');
    }

    return foundUser;
  }

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(UserResponseEntity),
        },
      },
    },
    description: '200. Success. Returns all users',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '401. UnauthorizedException.',
  })
  @Get()
  @UseGuards(JwtAccessGuard)
  @Serialize(AllUsersResponseEntity)
  async getAllVerifiedUsers(): Promise<FoundUsers[] | []> {
    const foundUsers = await this.usersService.getVerifiedUsers();

    return foundUsers;
  }
}
