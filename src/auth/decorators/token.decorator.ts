import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.token)
      throw new InternalServerErrorException(
        'Token not found(AuthGuard) not found token in request',
      );
    return request.token;
  },
);
