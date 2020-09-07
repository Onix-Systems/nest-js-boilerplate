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
} from '@nestjs/swagger';
import ParseObjectIdPipe from '@pipes/parseObjectId.pipe';
import IsLoggedGuard from '@guards/isLogged.guard';
import UsersService from './users.service';

@ApiTags('users')
@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ description: 'Returns a found user' })
  @ApiNotFoundResponse({ description: '404...'})
  @Get(':id')
  @UseGuards(IsLoggedGuard)
  async getById(@Param('id', ParseObjectIdPipe) id: string) {
    const foundUser = await this.usersService.getById(id);

    if (!foundUser) {
      throw new NotFoundException('The user does not exist');
    }

    return foundUser;
  }
}
