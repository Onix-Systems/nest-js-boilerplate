import { Schema } from 'mongoose';
import { RolesEnum } from '@decorators/roles.decorator';

import usersConstants from '../users-constants';

const UserSchema = new Schema({
  picture: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  verified: {
    type: Boolean,
    default: true,
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

export default UserSchema;
