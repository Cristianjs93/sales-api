import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './config/swagger.config';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api');

  const document = SwaggerModule.createDocument(app, SwaggerConfig);
  SwaggerModule.setup('api/docs', app, document);
  writeFileSync('docs/swagger.json', JSON.stringify(document, null, 2));

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}/api`);
  console.log(`Documentation: ${await app.getUrl()}/api/docs`);
}
bootstrap();
