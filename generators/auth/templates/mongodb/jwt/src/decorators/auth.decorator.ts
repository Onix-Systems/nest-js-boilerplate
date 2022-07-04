import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import JwtAccessGuard from '@guards/jwt-access.guard';
import RolesGuard from '@guards/roles.guard';
import { RolesEnum } from '@decorators/roles.decorator';

export default function Auth(...roles: RolesEnum[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAccessGuard, RolesGuard),
  );
}
