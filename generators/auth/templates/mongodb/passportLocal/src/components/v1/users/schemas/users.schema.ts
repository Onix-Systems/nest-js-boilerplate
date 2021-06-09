import { Document, Schema, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

import { RolesEnum } from '@decorators/roles.decorator';
import usersConstants from '../users-constants';

export class UserEntity extends Document {
  @ApiProperty({ type: String })
  readonly _id: Types.ObjectId = new ObjectId();

  @ApiProperty({ type: String })
  readonly email: string = '';

  @ApiProperty({ type: String })
  readonly password: string = '';

  @ApiProperty({ type: Boolean })
  readonly verified: boolean = true;

  @ApiProperty({ type: 'enum', enum: RolesEnum })
  readonly role: RolesEnum = RolesEnum.user;
}

export const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
  role: {
    type: RolesEnum,
    default: RolesEnum.user,
    required: false,
  },
}, {
  versionKey: false,
  collection: usersConstants.models.users,
});
