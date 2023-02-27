import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from '../../constants/key-decorators';
import { Request } from 'express';
import { useToken } from '../../utils/use.token';
import { IUseToken } from '../interfaces/auth.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    // funcionalidades http
    const req = context.switchToHttp().getRequest<Request>();

    const token = req.headers['codrr_token'];

    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException('Invalid token');
    }

    const manageToken: IUseToken | string = useToken(token);

    if (typeof manageToken === 'string') {
      throw new UnauthorizedException(manageToken);
    }

    if (manageToken.isExpired) {
      throw new UnauthorizedException('Token expired');
    }

    const { sub } = manageToken;

    const user = await this.usersService.findUserById(sub);

    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }

    // inyeccion de informacion
    req.idUser = user.id;
    req.roleUser = user.role;

    return true;
  }
}
