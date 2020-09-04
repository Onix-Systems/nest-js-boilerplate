import UsersService from './users.service';
export default class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getById(id: string): Promise<import("./entities/user.entity").default>;
}
