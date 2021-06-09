import { Routes } from 'nest-router';
import AuthModuleV1 from '@components/v1/auth/auth.module';
import UsersModuleV1 from '@components/v1/users/users.module';
import HomeModuleV1 from '@components/v1/home/home.module';

/*  Routes Template
export const appRoutes: Routes = [
  {
    path: '/v1',
    children: [
      {
        path: '/auth',
        module: AuthModule,
      },
      {
        path: '/users',
        module: UsersModule,
      },
    ],
  },
  {
    path: 'v2',
    children: [
      {
        path: '/auth',
        module: AuthModuleV2,
        children: [
          {
            path: '/google',
            module: GoogleModule,
          },
        ],
      },
      {
        path: '/users',
        module: UsersModule,
      },
    ],
  },
];
 */

export const appRoutes: Routes = [
  {
    path: '/v1',
    children: [
      {
        path: '/auth',
        module: AuthModuleV1,
      },
      {
        path: '/users',
        module: UsersModuleV1,
      },
      {
        path: '/home',
        module: HomeModuleV1,
      },
    ],
  },
];
