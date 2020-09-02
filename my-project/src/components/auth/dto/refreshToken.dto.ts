import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export default class RefreshTokenDto {
    @IsNotEmpty()
    @MinLength(32)
    @IsString()
    refreshToken: string;
}
