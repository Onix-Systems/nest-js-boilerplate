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
    readonly _id?: ObjectID;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @IsEmail()
    readonly email: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    readonly picture: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    readonly firstName: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    readonly lastName?: string;
}
