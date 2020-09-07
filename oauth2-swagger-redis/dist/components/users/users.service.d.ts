import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import UserEntity from './entities/user.entity';
import UserDto from './dto/user.dto';
export default class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: MongoRepository<UserEntity>);
    create(user: UserDto): Promise<UserEntity>;
    getByEmail(email: string, verified?: boolean): Promise<UserEntity>;
    getById(id: ObjectID, verified?: boolean): Promise<UserEntity>;
    createIfDoesNotExist(user: UserDto): Promise<UserEntity>;
}
