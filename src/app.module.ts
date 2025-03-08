import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ExamsModule } from './exams/exams.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guard';
import { SectionsModule } from './sections/sections.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, ExamsModule, AuthModule, SectionsModule],
  controllers: [AppController],
  providers: [AppService, { provide: 'APP_GUARD', useClass: JwtAuthGuard }],
})
export class AppModule {}
