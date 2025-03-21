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
import { ENV_VARS } from '@/app-constants';
import { winstonLogger } from '@/middleware';
import app from './app';

const hostName = os.hostname();
const port = ENV_VARS.port;

function bootstrap() {
  /* DB Connection Logic */
  // try {
  //   await mongoose.connect(db_connection_string, { autoIndex: true });
  //   console_log('Connected to DATABASE', `${db_name}@${db_url}`);
  // } catch (err) {
  //   console.log(chalk.red('⚠ Error connecting to the Database ⚠'));
  //   console.log(err);
  //   process.exit(1);
  // }

  const server = createServer(app);

  server.listen(port, () => {
    winstonLogger.info(
      `[ ⚡️ ${hostName} ⚡️ ] - Server running on port ${port}`
    );
  });
}

bootstrap();
