import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ERole, ProfileDto } from '../dto';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<ERole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    await super.canActivate(context);

    const request: Express.Request = context.switchToHttp().getRequest();
    const profile = request.user as ProfileDto;

    if (!profile) {
      throw new UnauthorizedException('Chưa đăng nhập');
    }

    if (!requiredRoles.length || requiredRoles.includes(profile.role)) {
      return true;
    }

    throw new ForbiddenException('Không có quyền truy cập');
  }
}
