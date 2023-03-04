import { SetMetadata } from '@nestjs/common';
import { ACCESS_LEVEL_KEY } from '../../constants/key-decorators';

// setMetadata devuelve una firma (key) y un value (true)
export const AccessLevel = (level: number) =>
  SetMetadata(ACCESS_LEVEL_KEY, level);
