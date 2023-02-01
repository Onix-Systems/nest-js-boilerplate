import { Module } from '@nestjs/common';
import { Routes, RouterModule } from '@nestjs/core';
import AdminPanelModule from './admin/admin-panel.module';

import AuthModule from './auth/auth.module';
import UsersModule from './users/users.module';

const routes: Routes = [
  {
    path: '/v1',
    children: [
      { path: '/auth', module: AuthModule },
      { path: '/users', module: UsersModule },
      { path: '/admin', module: AdminPanelModule },
    ],
  },
];

@Module({
  imports: [
    RouterModule.register(routes),
    AuthModule,
    UsersModule,
    AdminPanelModule,
  ],
})
export default class V1Module {}
