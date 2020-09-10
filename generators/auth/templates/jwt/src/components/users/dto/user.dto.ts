import {
  IsNotEmpty, MinLength, IsString, IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class UserDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  password: string;
}
