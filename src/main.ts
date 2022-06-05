import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import 'dotenv/config';

const PORT = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = {
    origin: [/^(.*)/],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders:
      'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for',
    exposedHeaders: 'X-HALABOOK-KEY,X-HALABOOK-KEY-EXPIRES',
  };

  const config = new DocumentBuilder()
    .setTitle('Halabook Api')
    .setDescription('This api will help clients to store their data.')
    .setVersion('1.0')
    .addTag('Halabook')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  app.use(helmet());
  app.use(cookieParser());
  app.enableCors(options);
  await app.listen(PORT);
  Logger.log(`Server running on http://localhost:${PORT}`, 'Bootstrap');
}
bootstrap();
