import { Role } from '../modules/user/entities/role.enum';

export type JwtUser = {
  userId: number;
  role: Role;
};
