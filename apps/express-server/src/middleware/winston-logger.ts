import { createLogger, addColors, format, transports } from 'winston';
import { ENV_VARS } from '@/app-constants';

const { combine, timestamp, printf } = format;

/**
 * https://github.com/winstonjs/winston?tab=readme-ov-file#using-custom-logging-levels
 */
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    success: 4
  },
  colors: {
    error: 'bold red blackBG',
    warn: 'italic yellow',
    info: 'blue',
    http: 'magenta',
    success: 'green'
  }
};

const myFormat = printf(
  ({ level, message, timestamp }) => `[ ${level} ]:: ${timestamp} - ${message}`
);

/**
 * https://github.com/winstonjs/winston?tab=readme-ov-file
 *
 * Winston has seven levels (ordered from the most to least important)
 * - error, warn, info, verbose, debug, and silly.
 */
const winstonLogger = createLogger({
  levels: customLevels.levels,

  /*
   * Either format.simple() or format.json() or your
   * custom format is required, otherwise undefined
   * will be logged.
   */
  format: combine(
    timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    format.splat(),

    /* Aligns in a tabular format */
    // format.align(),
    myFormat
  ),
  //   defaultMeta: { service: 'log-service' },
  transports: [
    /*
     * - Write all logs with importance level of `error` or less to `error.log`
     * - Write all logs with importance level of `info` or less to `info-warning.log`
     */
    new transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }),
    new transports.File({ filename: 'logs/info-warning.log' })
  ]
});

addColors(customLevels.colors);

/**
 * If we're not in production then log to the `console` with the format:
 * `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
 */

if (ENV_VARS.env !== 'production') {
  winstonLogger.add(
    new transports.Console({ format: format.colorize({ all: true }) })
  );
}

export { winstonLogger };
