import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { AppModule } from './app.module';

const httpsOptions = {
  key: readFileSync(process.env.KEY_PATH, 'utf-8'),
  cert: readFileSync(process.env.CERT_PATH, 'utf-8'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  const config = new DocumentBuilder()
    .setTitle('Forge')
    .setDescription('API de la forge')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apiSwagger', app, document);

  await app.listen(process.env.PORT);

}
bootstrap();
