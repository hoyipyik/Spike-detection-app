import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('/root/SNNYOLO/npy', {
    prefix: '/uploads',
  });
  app.useStaticAssets('/root/SNNYOLO/ourdata_output', {
    prefix: '/edited',
  });
  app.enableCors({
    origin: '*',
    methods: 'GET, PUT, POST, DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
  // app.useStaticAssets('/root/SNNYOLO/outputdata_output', {
  //   prefix: '/uploads/',
  // });
  await app.listen(7896);
}
bootstrap();
