import {
  IsNotEmpty,
  MinLength,
  IsString,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectID } from 'mongodb';

export default class UserDto {
    @ApiProperty({
      type: () => ObjectID,
    })
    _id?: ObjectID;

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
