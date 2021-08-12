import { Module } from '@nestjs/common';
import { Routes, RouterModule } from 'nest-router';

import AuthModule from './auth/auth.module';
import UsersModule from './users/users.module';
import HomeModule from './home/home.module';

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
    RouterModule.forRoutes(routes),
    AuthModule,
    UsersModule,
    HomeModule,
  ],
})
export default class V1Module {}
