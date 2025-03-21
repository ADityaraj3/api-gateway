import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserModel } from 'src/models/public/users.model';
import * as encryption from 'src/shared/utils/encryption.util';

export const UserId = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const tokenFromHeader = request.headers?.authorization;
    const tokenFromCookie = request.cookies?.authorization;

    const token = tokenFromCookie || tokenFromHeader;

    if (!token) {
      return;
    }

    const decoded: any = encryption.findByToken(token);

    await UserModel.findOne({
      where: { user_id: decoded.id },
    })
      .then((user) => {
        if (user) {
          request.headers['user_id'] = decoded.id;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return request.headers.user_id;
  },
);
