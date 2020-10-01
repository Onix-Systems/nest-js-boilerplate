import { Document, Schema, Types } from 'mongoose';
import { ObjectId } from 'mongodb';

import { ApiProperty } from '@nestjs/swagger';

export default class UserEntity extends Document {
  @ApiProperty({ type: String })
  readonly _id: Types.ObjectId = new ObjectId();

  @ApiProperty({ type: String })
  readonly email: string = '';

  @ApiProperty({ type: String })
  readonly password: string = '';
}
