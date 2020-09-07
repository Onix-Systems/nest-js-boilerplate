import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';
import UserEntity from '@components/users/entities/user.entity';
import UserDto from '@components/users/dto/user.dto';
export default class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<UserEntity>);
    create(userDto: UserDto): Promise<UserEntity>;
    getVerifiedByEmail(email: string): Promise<UserEntity>;
    getById(id: ObjectID, verified?: boolean): Promise<UserEntity>;
}
