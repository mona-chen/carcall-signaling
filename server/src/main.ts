import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*', // Specify allowed frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // credentials: true, // Allow sending cookies if needed
  });
  app.useWebSocketAdapter(new IoAdapter(app));

  await app.listen(3855, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().then();
