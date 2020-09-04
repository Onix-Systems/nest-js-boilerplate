import { ICreatedResponse } from '@interfaces/responses/ICreatedResponse.interface';
import AuthService from '@components/auth/auth.service';
import UsersService from '@components/users/users.service';
import UserDto from '@components/users/dto/user.dto';
export default class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    login(req: any): Promise<{
        message: string;
    }>;
    register(userDto: UserDto): Promise<ICreatedResponse>;
    logout(req: any): Promise<boolean | never>;
}
