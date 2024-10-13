import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app  = await NestFactory.create(AppModule);
  const logger = new Logger();
  app.setGlobalPrefix('/api/v1')
  app.enableCors();
  await app.listen(5000);
  logger.debug(`server run on port ${await app.getUrl()}`)
}
bootstrap();
