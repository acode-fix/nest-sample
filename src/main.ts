import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    //transform: true,
    //forbidNonWhitelisted:true
  }));
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
     prefix: '/uploads/',
   });
   // useContainer(app.select(AppModule), {fallbackOnErrors: true})
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
