import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export default class NewPasswordDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @ApiProperty({ type: String })
    readonly newPassword: string = '';

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: String })
    readonly resetToken: string = '';
}
