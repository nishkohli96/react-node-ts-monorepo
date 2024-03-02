import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  /**
   * The current config will start the NestJS application with
   * fastify adapter. To use the default express adapter, remove
   * the @nestjs/platform-fastify from package.json and uncomment
   * the line below...
   */
  // const app = await NestFactory.create(AppModule);

  /**
	 * Unfortunately NestJs prod build with fastify, works on local
   * machine, but it does not port map on docker...
	 *
	 * Soln link -
   * https://stackoverflow.com/questions/66086427/docker-container-with-nodejs-appnestjs-is-not-accessible-from-both-other-conta
	 */
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      ignoreTrailingSlash: true,
      caseSensitive: false,
    }),
  );
  await app.listen(4000, '0.0.0.0');
}

bootstrap();
