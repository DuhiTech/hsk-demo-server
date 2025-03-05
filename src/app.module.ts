import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ExamsModule } from './exams/exams.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, ExamsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
