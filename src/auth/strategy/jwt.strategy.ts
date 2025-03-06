import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ProfileDto } from '../dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('SUPABASE_JWT_SECRET') ?? '',
    });
  }

  async validate(payload: { sub: string }): Promise<ProfileDto | null> {
    const profile = await this.prisma.profiles.findUnique({ where: { id: payload.sub } });

    if (!profile) {
      return null;
    }

    return profile as unknown as ProfileDto;
  }
}
