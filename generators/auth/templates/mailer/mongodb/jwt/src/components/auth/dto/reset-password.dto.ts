import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class ResetPasswordDto {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: String })
    readonly email: string = '';
}
