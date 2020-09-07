import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import ParseObjectIdPipe from '@pipes/parseObjectId.pipe';
import IsLoggedGuard from '@guards/isLogged.guard';
import UsersService from './users.service';

@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
