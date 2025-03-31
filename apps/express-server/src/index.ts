/**
 * In dev env ts-node will be using tsconfig-paths to
 * resolve alias imports.
 *
 * However when generating the build and running it,
 * tsc-alias will replace the alias imports with the
 * actual import path relative to each file.
 *
 * Sadly "node -r tsconfig-paths/register dist/index.js" is
 * not resolving the paths when running the build.
 *
 * "node -r ts-node/register/transpile-only -r tsconfig-paths/register dist/main.js"
 * works but not recommended to be used in production because
 * of the lack of type safety.
 */

import 'dotenv/config';
import os from 'os';
import { createServer } from 'node:http';
import { ENV_CONFIG } from '@/constants';
import { winstonLogger } from '@/middleware';
import app from './app';

const hostName = os.hostname();
const { port, env } = ENV_CONFIG;

function bootstrap() {

  /**
   * You can write any custom logic here, like connecting to the
   * database. Refer this snippet to connect to MongoDB, Postgres
   * or MySQL database.
   *
   * https://github.com/nishkohli96/client-server-libs/blob/main/apps/express-server/src/index.ts#L171
   */

  const server = createServer(app);
  server.listen(port, () => {
    winstonLogger.info(
      `[⚡️ ${hostName}@${env} ⚡️] - Server running on port ${port}`
    );
  });
}

bootstrap();
