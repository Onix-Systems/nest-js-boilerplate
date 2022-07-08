import _ from 'lodash';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { ActionRequest, flat } from 'adminjs';
import { validate } from 'class-validator';
import passwordsFeature from '@adminjs/passwords';

import { ICreateUser } from '@v1/admin/interfaces/user.interface';
import { User } from '@v1/users/schemas/users.schema';
import CreateUserDto from '@v1/admin/dto/create-user.dto';

import AdminValidationException from '@exceptions/admim-validation.exception';
import { RolesEnum } from '@decorators/roles.decorator';

const beforeCreateUser = async (request: ActionRequest) => {
  const payload = new CreateUserDto(flat.unflatten(request.payload) as ICreateUser);

  if (!payload.verified) {
    Reflect.set(payload, 'verified', false);
  }

  const errors = await validate(payload);

  if (!_.isEmpty(errors)) {
    throw new AdminValidationException(errors);
  }

  Reflect.set(request, 'payload', flat.flatten(payload));

  return request;
};

export default (userModel: Model<User>) => ({
  resource: userModel,
  options: {
    properties: {
      password: {
        isVisible: false,
      },
      setPassword: {
        isVisible: {
          list: false,
          edit: true,
          filter: false,
          show: false,
        },
      },
      verified: {
        isRequired: false,
      },
      roles: {
        availableValues: Object.values(RolesEnum).map((role) => ({
          label: role,
          value: role,
        })),
      },
    },
    actions: {
      new: {
        before: beforeCreateUser,
      },
      edit: {
        before: beforeCreateUser,
      },
    },
  },
  features: [passwordsFeature({
    properties: {
      password: 'setPassword',
      encryptedPassword: 'password',
    },
    hash: (password) => bcrypt.hash(password, 10),
  })],
});
