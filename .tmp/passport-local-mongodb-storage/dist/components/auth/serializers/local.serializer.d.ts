import { PassportSerializer } from '@nestjs/passport';
import UserDto from '@components/users/dto/user.dto';
import UsersService from '@components/users/users.service';
export default class LocalSerializer extends PassportSerializer {
    private readonly usersService;
    constructor(usersService: UsersService);
    serializeUser(user: any, done: CallableFunction): void;
    deserializeUser(user: UserDto, done: CallableFunction): Promise<any>;
}
