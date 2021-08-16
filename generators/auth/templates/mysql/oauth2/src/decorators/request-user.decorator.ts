import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import UserEntity from '@v1/users/entities/user.entity';

const RequestUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserEntity;
  },
);

export default RequestUser;
