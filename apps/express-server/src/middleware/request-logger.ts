import type { Request, Response, NextFunction } from 'express';
import { winstonLogger } from './winston-logger';

export function requestLogger(
  request: Request,
  response: Response,
  next: NextFunction
) {
  winstonLogger.info(`${request.method} ${request.url}`);
  response.on('finish', () => {
    const isSuccess = response.statusCode < 400;
    winstonLogger.log(
      isSuccess ? 'info' : 'error',
      `${response.statusCode} ${response.statusMessage}`
    );
  });
  next();
}
