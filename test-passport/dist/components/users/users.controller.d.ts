import { Response } from 'express';
import UsersService from './users.service';
export default class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any, res: Response): {
        user: any;
    };
}
