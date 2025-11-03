import { ValidationPipe } from '@nestjs/common'
import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';


async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  
  app.setGlobalPrefix("api")

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))

  app.useStaticAssets(join(__dirname, '..', 'fotosRecetas'), {
    prefix: '/fotosRecetas', 
  });

  app.enableCors({
  origin: '*',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
  