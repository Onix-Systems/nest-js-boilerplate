import { Types } from 'mongoose';
import {
  BadRequestException, Controller, Get, NotFoundException, Param, Query, UseGuards, UseInterceptors,
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
import JwtAccessGuard from '@guards/jwt-access.guard';
import ParseObjectIdPipe from '@pipes/parse-object-id.pipe';
import { UserEntity } from '@components/users/schemas/users.schema';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { PaginatedUsersInterface } from '@interfaces/paginatedEntity.interface';
import WrapResponseInterceptor from '@interceptors/wrap-response.interceptor';
import { SuccessResponseInterface } from '@interfaces/success-response.interface';
import UsersService from './users.service';
import PaginationUtils from '../../utils/pagination.utils';
import ResponseUtils from '../../utils/response.utils';

@ApiTags('Users')
@ApiBearerAuth()
@UseInterceptors(WrapResponseInterceptor)
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
  ): Promise<SuccessResponseInterface | never> {
    const foundUser = await this.usersService.getById(id);

    if (!foundUser) {
      throw new NotFoundException('The user does not exist');
    }

    return ResponseUtils.success(
      'users',
      foundUser,
    );
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
  async getAllVerifiedUsers(@Query() query: any): Promise<SuccessResponseInterface> {
    const paginationParams: PaginationParamsInterface | false = PaginationUtils.normalizeParams(query.page);
    if (!paginationParams) {
      throw new BadRequestException('Invalid pagination parameters');
    }

    const paginatedUsers: PaginatedUsersInterface = await this.usersService.getAllVerifiedWithPagination(paginationParams);

    return ResponseUtils.success(
      'users',
      paginatedUsers.paginatedResult,
      {
        location: 'users',
        paginationParams,
        totalCount: paginatedUsers.totalCount,
      },
    );
  }
}
