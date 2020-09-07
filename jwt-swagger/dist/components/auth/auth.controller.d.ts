import { JwtService } from '@nestjs/jwt';
import { IAuthLoginOutput } from '@components/auth/interfaces/IAuthLoginOutput.interface';
import { ICreatedResponse } from '@interfaces/responses/ICreatedResponse.interface';
import { IVerbUnauthorized } from '@interfaces/responses/IVerbUnauthorized.interface';
import AuthService from '@components/auth/auth.service';
import UsersService from '@components/users/users.service';
import UserDto from '@components/users/dto/user.dto';
import RefreshTokenDto from '@components/auth/dto/refreshToken.dto';
export default class AuthController {
    private readonly authService;
    private readonly jwtService;
    private readonly usersService;
    constructor(authService: AuthService, jwtService: JwtService, usersService: UsersService);
    login(req: any): Promise<IAuthLoginOutput>;
    register(userDto: UserDto): Promise<ICreatedResponse>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<IAuthLoginOutput | IVerbUnauthorized>;
    logout(token: string): Promise<boolean | never>;
    logoutAll(): Promise<boolean>;
}
