import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user)
      throw new InternalServerErrorException(
        'Error User not found (AuthGuard) not found user in request',
      );
    return request.user;
  },
);
