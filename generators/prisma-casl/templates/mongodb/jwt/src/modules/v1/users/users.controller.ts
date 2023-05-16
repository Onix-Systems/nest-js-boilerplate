import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import ParseObjectIdPipe from '@pipes/parse-object-id.pipe';
import { User } from '@prisma/client';
import UsersResponseDto, { UserResponseDto } from '@v1/users/dto/user-response.dto';
import Serialize from '@decorators/serialization.decorator';
import Auth from '@decorators/auth.decorator';
import WrapResponseInterceptor from '@interceptors/wrap-response.interceptor';
import UsersService from './users.service';

@ApiTags('Users')
@ApiBearerAuth()
@ApiExtraModels(UserResponseDto)
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(UserResponseDto),
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
  @Serialize(UserResponseDto)
  @Auth()
  async getById(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<User> {
    const foundUser = await this.usersService.getVerifiedUserById(id);

    if (!foundUser) {
      throw new NotFoundException('The user does not exist');
    }

    return foundUser;
  }

  @ApiOkResponse({
    description: '200. Success. Returns all users',
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(UserResponseDto),
        },
      },
    },
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
  @Serialize(UsersResponseDto)
  @Auth()
  async getAllVerifiedUsers() {
    const foundUsers = await this.usersService.getVerifiedUsers();

    return foundUsers;
  }
}
