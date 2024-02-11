import { NestFactory } from '@nestjs/core';
// import {
//   FastifyAdapter,
//   NestFastifyApplication,
// } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const app = await NestFactory.create<NestFastifyApplication>(
  //   AppModule,
  //   new FastifyAdapter({
  //     ignoreTrailingSlash: true,
  //     caseSensitive: false,
  //   }),
  //   { logger: ['error', 'warn'] },
  // );
  await app.listen(4000);
}
bootstrap();
