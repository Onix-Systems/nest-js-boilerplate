import { Module } from '@nestjs/common';
import { Routes, RouterModule } from '@nestjs/core';

import AuthModule from './auth/auth.module';
import UsersModule from './users/users.module';
import HomeModule from './home/home.module';
import AdminPanelModule from './admin/admin-panel.module';

const routes: Routes = [
  {
    path: '/v1',
    children: [
      { path: '/auth', module: AuthModule },
      { path: '/users', module: UsersModule },
      { path: '/home', module: HomeModule },
    ],
  },
];

@Module({
  imports: [
    RouterModule.register(routes),
    AuthModule,
    UsersModule,
    HomeModule,
    AdminPanelModule,
  ],
})
export default class V1Module {}
