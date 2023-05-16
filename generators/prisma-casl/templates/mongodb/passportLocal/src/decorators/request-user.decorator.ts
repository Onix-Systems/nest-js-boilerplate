import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

const RequestUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as User;
  },
);

export default RequestUser;
