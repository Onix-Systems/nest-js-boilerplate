import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { RolesEnum } from '@decorators/roles.decorator';

@Schema()
export class User {
  @Prop({
    required: true,
    type: String,
  })
  picture: string = '';

  @Prop({
    required: true,
    type: String,
  })
  firstName: string = '';

  @Prop({
    required: true,
    type: String,
  })
  lastName: string = '';

  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  email: string = '';

  @Prop({
    type: Boolean,
  })
  verified: boolean = false;

  @Prop({
    type: [String],
    required: false,
    default: [RolesEnum.USER],
  })
  roles: RolesEnum[] = [];
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User).set('versionKey', false);

