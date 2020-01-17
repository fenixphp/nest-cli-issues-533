import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

/* Get application info. */
const  { 
  name,
  version,
  description
} = require('../../../package.json');

/* CLI app bootstrap. */
async function bootstrap() {
  /* Create app instant. */
  const app = await NestFactory
  .createApplicationContext(ApplicationModule, { logger: false });
  
  /* End app. */
  await app.close();
}

/* Run app. */
bootstrap();
