import { IAuthValidateUserOutput } from '@components/auth/interfaces/IAuthValidateUserOutput.interface';
import UsersService from '@components/users/users.service';
export default class AuthService {
    private readonly usersService;
    constructor(usersService: UsersService);
    validateUser(email: string, password: string): Promise<null | IAuthValidateUserOutput>;
}
