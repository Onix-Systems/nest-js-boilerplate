import {IsNotEmpty, IsString, MinLength} from 'class-validator';

export class RefreshTokenDto {
    @IsNotEmpty()
    @MinLength(32)
    @IsString()
    refreshToken: string;
}
