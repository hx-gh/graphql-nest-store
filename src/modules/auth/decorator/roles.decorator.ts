import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { Role } from '../../user/entities/role.enum';
import { GqlJwtGuard } from '../guard/gql-jwt.guard';
import { RolesGuard } from '../guard/roles.guard';

export const ROLES_KEY = 'roles';
export function AuthRoles(...roles: [Role, ...Role[]]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(GqlJwtGuard, RolesGuard),
  );
}
