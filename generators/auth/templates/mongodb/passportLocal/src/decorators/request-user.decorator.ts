import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@v1/users/schemas/users.schema';

const RequestUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as User;
  },
);

export default RequestUser;
