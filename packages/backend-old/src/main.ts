import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import compression from 'fastify-compress';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: {
        level: 'info',
        prettyPrint: true,
      },
      ignoreTrailingSlash: true,
      caseSensitive: false,
    }),
    {
      logger: ['error', 'warn'],
    },
  );

  app.register(compression, { encodings: ['gzip', 'deflate'] });
  
  await app.listen(4000);

}

bootstrap();
