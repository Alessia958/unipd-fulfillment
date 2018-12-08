import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import * as express from 'express';
import 'dotenv/config';
import { join }  from 'path';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule, { cors: true });
  await app.listen(process.env.PORT || 3331);
}
bootstrap();
