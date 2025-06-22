import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Включите CORS с правильными настройками
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Установите глобальный префикс
  app.setGlobalPrefix('api');

  await app.listen(3000);
  Logger.log('Server is running on http://localhost:3000', 'Bootstrap');
}
bootstrap();