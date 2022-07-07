import { Model } from 'mongoose';

import AdminJS from 'adminjs';
import { AdminModule as AdminPanel } from '@adminjs/nestjs';
import AdminJSMongoose from '@adminjs/mongoose';

import { getModelToken } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import UsersModule from '@v1/users/users.module';
import { User } from '@v1/users/schemas/users.schema';

import AdminService from '@v1/admin/admin.service';
import AdminModule from '@v1/admin/admin.module';
import userResource from '@v1/admin/resources/user.resource';

AdminJS.registerAdapter(AdminJSMongoose);

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
        getModelToken('User'),
      ],
      useFactory: (cfg: ConfigService, adminService: AdminService, userModel: Model<User>) => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [userResource(userModel)],
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
