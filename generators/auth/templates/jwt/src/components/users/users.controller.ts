import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import JwtAuthGuard from '@guards/jwtAuth.guard';
import ParseObjectIdPipe from '@pipes/parseObjectId.pipe';
import UsersService from './users.service';
import UserEntity from './entities/user.entity';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    type: UserEntity,
    description: '200. Success. Returns a user',
  })
  @ApiNotFoundResponse({
    description: '404. NotFoundException. User was not found',
  })
  @ApiUnauthorizedResponse({
    description: '401. UnauthorizedException.',
  })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getById(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<UserEntity | never> {
    const foundUser = await this.usersService.getById(id);

    if (!foundUser) {
      throw new NotFoundException('The user does not exist');
    }

    return foundUser;
  }

  @ApiOkResponse({
    type: [UserEntity],
    description: '200. Success. Returns all users',
  })
  @ApiUnauthorizedResponse({
    description: '401. UnauthorizedException.',
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllVerifiedUsers(): Promise<UserEntity[] | []> {
    const foundUsers = await this.usersService.getAll(true);

    return foundUsers;
  }
}
