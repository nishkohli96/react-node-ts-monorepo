import 'dotenv/config';
import os from 'os';
import { createServer } from 'node:http';
import { ENV_VARS } from 'app-constants';
import { winstonLogger } from 'middleware';
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
