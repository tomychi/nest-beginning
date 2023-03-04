import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../../constants/key-decorators';
import { ROLES } from '../../constants/roles';

// setMetadata devuelve una firma (key) y un value (true)
export const Roles = (...roles: Array<keyof typeof ROLES>) =>
  SetMetadata(ROLES_KEY, roles);
