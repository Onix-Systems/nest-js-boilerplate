import {
  IsNotEmpty,
  MinLength,
  IsString,
  IsEmail,
} from 'class-validator';
import { ObjectID } from 'typeorm';

export default class UserDto {
    readonly _id?: ObjectID;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    readonly picture: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    readonly firstName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    readonly lastName?: string;
}
