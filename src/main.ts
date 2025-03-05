import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  const prefix = '/api/v1';
  app.setGlobalPrefix(prefix);

  const config = new DocumentBuilder()
    .setTitle('HSK Demo API')
    .setDescription('API for testing HSK')
    .setVersion('1.0')
    .addServer(prefix)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, { ignoreGlobalPrefix: true });
  SwaggerModule.setup('swagger/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(process.env.PORT ?? 9999);
}

void bootstrap();
