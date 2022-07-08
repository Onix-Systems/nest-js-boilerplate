import { Module } from '@nestjs/common';

import AdminService from '@v1/admin/admin.service';
import UsersModule from '@v1/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [AdminService],
  exports: [AdminService],
})
export default class AdminModule {}
