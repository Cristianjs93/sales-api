import { DocumentBuilder } from '@nestjs/swagger';

export const SwaggerConfig = new DocumentBuilder()
  .setTitle('Sales API')
  .setDescription('Sales Management')
  .setVersion('1.0.0')
  .build();
