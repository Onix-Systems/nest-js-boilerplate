import {
  IsNotEmpty,
  MinLength,
  IsString, IsEmail,
} from 'class-validator';
import { ObjectID } from 'typeorm';

export default class UserDto {
    id?: ObjectID;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    password: string;
}
