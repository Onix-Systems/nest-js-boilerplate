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
} from '@nestjs/swagger';
import UsersService from './users.service';
import JwtAuthGuard from '@guards/jwt-auth.guard';
import ParseObjectIdPipe from '@pipes/parseObjectId.pipe';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ description: '200. Success. Returns a user' })
  @ApiNotFoundResponse({
    description: '404. NotFoundException. User was not found',
  })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getById(@Param('id', ParseObjectIdPipe) id: string) {
    const foundUser = await this.usersService.getById(id);

    if (!foundUser) {
      throw new NotFoundException('The user does not exist');
    }

    return foundUser;
  }
}
