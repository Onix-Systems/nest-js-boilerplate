import {Controller, Get, NotFoundException, Param, UseGuards} from '@nestjs/common';
import UsersService from '@components/users/users.service';
import JwtAuthGuard from '@guards/jwt-auth.guard';
import ParseObjectIdPipe from '@pipes/parseObjectId.pipe';

@Controller('users')
export default class UsersController {
    constructor(private readonly usersService: UsersService) {}

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
