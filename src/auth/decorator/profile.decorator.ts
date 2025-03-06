import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Profile = createParamDecorator((data: string | undefined, ctx: ExecutionContext): unknown => {
  const request: Express.Request = ctx.switchToHttp().getRequest();
  return data ? request.user?.[data] : request.user;
});
