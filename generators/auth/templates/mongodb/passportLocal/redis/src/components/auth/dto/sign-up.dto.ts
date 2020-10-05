import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsString,
} from 'class-validator';

export default class SignUpDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string = '';

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  readonly password: string = '';
}
