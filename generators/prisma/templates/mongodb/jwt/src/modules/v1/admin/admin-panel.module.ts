import AdminJS, { ActionRequest, flat } from 'adminjs';
import { AdminModule as AdminPanel } from '@adminjs/nestjs';

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import UsersModule from '@v1/users/users.module';

import AdminService from '@v1/admin/admin.service';
import AdminModule from '@v1/admin/admin.module';
import { PrismaClient } from '@prisma/client';
import { Database, Resource } from '@adminjs/prisma';
import { DMMFClass } from '@prisma/client/runtime';
import { RolesEnum } from '@decorators/roles.decorator';
import { validate } from 'class-validator';
import AdminValidationException from '@exceptions/admim-validation.exception';
import _ from 'lodash';
import passwordsFeature from '@adminjs/passwords';
import * as bcrypt from 'bcryptjs';
import CreateUserDto from './dto/create-user.dto';
import { ICreateUser } from './interfaces/user.interface';

AdminJS.registerAdapter({ Database, Resource });

const prisma = new PrismaClient();

const dmmf = ((prisma as any)._baseDmmf as DMMFClass);

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

@Module({
  imports: [
    AdminPanel.createAdminAsync({
      imports: [
        UsersModule,
        AdminModule,
      ],
      inject: [
        ConfigService,
        AdminService,
      ],
      useFactory: (cfg: ConfigService, adminService: AdminService) => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [{
            resource: { model: dmmf.modelMap.User, client: prisma },
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
          }],
        },
        auth: {
          authenticate: adminService.authAdmin.bind(adminService),
          cookieName: cfg.get('ADMIN_COOKIE_NAME') as string,
          cookiePassword: cfg.get('ADMIN_COOKIE_PASSWORD') as string,
        },
      }),
    }),
    UsersModule,
    AdminModule,
  ],
})
export default class AdminPanelModule {}
