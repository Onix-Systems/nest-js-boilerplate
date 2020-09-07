import { ICreatedResponse } from '@interfaces/responses/ICreatedResponse.interface';
import UsersService from '@components/users/users.service';
import AuthService from './auth.service';
export default class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    googleAuth(req: any): Promise<void>;
    googleAuthRedirect(req: any): Promise<ICreatedResponse | never>;
    logout(req: any): Promise<boolean | never>;
}
