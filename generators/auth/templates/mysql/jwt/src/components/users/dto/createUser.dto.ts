import {
  IsNotEmpty,
  MinLength,
  IsString,
  IsEmail,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateUserDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  readonly password: string;
}
