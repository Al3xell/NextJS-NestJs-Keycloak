import { NestFactory } from '@nestjs/core';
import { readFileSync } from 'fs';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const httpsOptions = {
  key: readFileSync(process.env.KEY_PATH, 'utf-8'),
  cert: readFileSync(process.env.CERT_PATH, 'utf-8'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
    logger: ['error', 'warn', 'fatal', 'log', 'debug'],
  });
  app.enableCors({
    origin: process.env.FRONT_URL,
  });

  app.setGlobalPrefix('RESTAPI');

  await app.listen(process.env.PORT_API);
  Logger.debug(`Api url: ${process.env.BASE_URL}`)
}
bootstrap();
