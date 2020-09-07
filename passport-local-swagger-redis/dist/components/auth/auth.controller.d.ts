import { Response } from 'express';
import AuthService from '@components/auth/auth.service';
import UsersService from '@components/users/users.service';
export default class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    index(req: any, res: Response): {
        message: string;
    };
    signup(req: any, res: Response): Promise<void>;
    create(params: any, req: any, res: Response): Promise<void>;
    logout(req: any, res: Response): void;
    login(req: any, res: Response): void;
}
