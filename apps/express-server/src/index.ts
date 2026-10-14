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
import type { AddressInfo } from 'node:net';
import { ENV_VARS } from '@/constants';
import { winstonLogger } from '@/middleware';
import app from './app';

const hostName = os.hostname();
const { port, env } = ENV_VARS;

/* Max time to let in-flight requests finish after SIGTERM / SIGINT */
const SHUTDOWN_TIMEOUT_MS = 5000;

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
      `[⚡️ ${env}@${hostName} ⚡️] - Server running on port ${(server.address() as AddressInfo).port}`
    );
  });

  /* Stop accepting connections, let in-flight requests finish, then exit. */
  const shutdown = (signal: NodeJS.Signals) => {
    winstonLogger.info(`${signal} received, shutting down...`);
    server.close(() => process.exit(0));
    server.closeIdleConnections();
    setTimeout(() => process.exit(1), SHUTDOWN_TIMEOUT_MS).unref();
  };
  process.once('SIGTERM', shutdown);
  process.once('SIGINT', shutdown);
}

bootstrap();
