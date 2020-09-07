import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'nestjs-redis';
import { IAuthLoginInput } from '@components/auth/interfaces/IAuthLoginInput.interface';
import { IAuthValidateUserOutput } from '@components/auth/interfaces/IAuthValidateUserOutput.interface';
import { IAuthLoginOutput } from '@components/auth/interfaces/IAuthLoginOutput.interface';
import UsersService from '@components/users/users.service';
export default class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly redisService;
    private readonly redisClient;
    constructor(usersService: UsersService, jwtService: JwtService, redisService: RedisService);
    validateUser(email: string, password: string): Promise<null | IAuthValidateUserOutput>;
    login(data: IAuthLoginInput): Promise<IAuthLoginOutput>;
    getRefreshTokenByEmail(email: string): Promise<string>;
    deleteTokenByEmail(email: string): Promise<number>;
    deleteAllTokens(): Promise<string>;
}
