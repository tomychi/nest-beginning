import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from '../../constants/key-decorators';

// setMetadata devuelve una firma (key) y un value (true)
export const PublicAccess = () => SetMetadata(PUBLIC_KEY, true);
