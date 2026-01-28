import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173', // cambiar cuando use docker
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('API de ejemplo') // Título de la API
    .setDescription('Descripción de la API') // Descripción de la API
    .setVersion('1.0') // Versión de la API
    .addTag('posts') // Etiqueta para agrupar rutas relacionadas (opcional)
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);


  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
