import { Injectable } from '@nestjs/common';

import UsersService from '@components/users/users.service';

@Injectable()
export default class AuthService {
  constructor(private readonly usersService: UsersService) {}
}
