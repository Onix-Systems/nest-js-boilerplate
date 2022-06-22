import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import JwtAccessGuard from '@guards/jwt-access.guard';
import RolesGuard from '@guards/roles.guard';
import { RolesAuthType } from '@decorators/roles.decorator';

export default function Auth(roles: RolesAuthType) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAccessGuard, RolesGuard),
  );
}
