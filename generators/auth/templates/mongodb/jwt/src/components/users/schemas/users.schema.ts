import { Schema } from 'mongoose';
import usersConstants from '../users-constants';

const UserSchema = new Schema({
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
    default: false,
    required: true,
  },
}, {
  versionKey: false,
  collection: usersConstants.models.users,
});

export default UserSchema;
