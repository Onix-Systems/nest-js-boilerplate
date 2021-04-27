import { Types } from 'mongoose';
import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param, Query,
  UseGuards,
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
import ParseObjectIdPipe from '@pipes/parse-object-id.pipe';
import { UserEntity } from '@components/users/schemas/users.schema';
import { Serializer } from 'jsonapi-serializer';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { PaginatedUsersEntityInterface } from '@interfaces/paginatedEntity.interface';
import UsersService from './users.service';
import PaginationUtil from '../../utils/pagination.util';

@ApiTags('Users')
@ApiBearerAuth()
@ApiExtraModels(UserEntity)
@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(UserEntity),
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
  async getById(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<UserEntity | never> {
    const foundUser = await this.usersService.getById(id);

    if (!foundUser) {
      throw new NotFoundException('The user does not exist');
    }

    return new Serializer('users', {
      attributes: ['email', 'role', 'verified'],
    }).serialize(foundUser);
  }

  @ApiOkResponse({
    description: '200. Success. Returns all users',
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(UserEntity),
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
  @UseGuards(JwtAccessGuard)
  async getAllVerifiedUsers(@Query() query: any): Promise<UserEntity[] | []> {
    const paginationParams: PaginationParamsInterface | false = PaginationUtil.normalizeParams(query.page);
    if (!paginationParams) {
      throw new BadRequestException('Invalid pagination parameters');
    }

    const paginatedUsers: PaginatedUsersEntityInterface = await this.usersService.getAll(true, paginationParams);

    return new Serializer('users', {
      attributes: ['email', 'role', 'verified'],
      topLevelLinks: PaginationUtil.getPaginationLinks('users', paginationParams, paginatedUsers.totalCount),
      meta: { totalCount: paginatedUsers.totalCount },
    }).serialize(paginatedUsers.paginatedResult);
  }
}
