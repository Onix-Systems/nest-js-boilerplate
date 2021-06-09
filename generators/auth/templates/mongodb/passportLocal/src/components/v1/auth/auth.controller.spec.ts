import { Test, TestingModule } from '@nestjs/testing';

import AuthController from '@components/v1/auth/auth.controller';
import AuthService from '@components/v1/auth/auth.service';
import UsersService from '@components/v1/users/users.service';

describe('Auth Controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {},
        },
        {
          provide: UsersService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
