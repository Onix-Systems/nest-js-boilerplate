import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '@prisma/client';

const RequestUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserEntity;
  },
);

export default RequestUser;
