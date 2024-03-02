import { Request, Response, NextFunction } from 'express';
import { winstonLogger } from './winston-logger';

export function requestLogger(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  winstonLogger.info(`${request.method} ${request.url}`);
  response.on('finish', () => {
    const isSuccess = response.statusCode < 400;
    winstonLogger.log(
      isSuccess ? 'info' : 'error',
      `${response.statusCode} ${response.statusMessage}`,
    );
  });
  next();
}

export function printSuccessMsg(msg: string): void {
  winstonLogger.info(`✅ SUCCESS - ${msg}`);
}

export function printError(error: unknown): void {
  winstonLogger.error(`⚠ ERROR - ${error}`);
}

export function errorLogger(res: Response, error: unknown) {
  const err = JSON.stringify(error);
  printError(error);
  res.status(500).send(err);
}
