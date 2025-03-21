import { Request } from 'express';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import * as encryption from '../utils/encryption.util';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from 'src/models/public/users.model';

@Injectable()
export class UserAuthGuard extends AuthGuard('Authorization') {
  constructor(
  ) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const tokenFromHeader = request.headers?.authorization;
    const tokenFromCookie = request.cookies?.authorization;

    const token = tokenFromCookie || tokenFromHeader;

    if (!token) {
      return false; // No token provided
    }

    try {
      const decoded: any = encryption.findByToken(token);
      const user = await UserModel.findOne({
        where: { user_id: decoded.id },
      });

      if (!user) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }
}
