import { SetMetadata } from '@nestjs/common';
import { ADMIN_KEY } from '../../constants/key-decorators';
import { ROLES } from '../../constants/roles';

// setMetadata devuelve una firma (key) y un value (true)
export const AdminAccess = () => SetMetadata(ADMIN_KEY, ROLES.ADMIN);
