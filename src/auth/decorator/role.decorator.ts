import { SetMetadata } from '@nestjs/common';
import { ERole } from '../dto';

export const RequiredRoles = (...roles: ERole[]) => SetMetadata('roles', roles);
