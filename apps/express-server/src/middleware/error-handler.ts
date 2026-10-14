import { STATUS_CODES } from 'node:http';
import type { Request, Response, NextFunction } from 'express';
import { winstonLogger } from './winston-logger';

/**
 * body-parser and other http-errors carry the status to respond
 * with, eg. 400 for a malformed JSON body. Anything else is an
 * unexpected error.
 */
function getStatusCode(error: unknown) {
  const status = (error as { status?: unknown } | null)?.status;
  return typeof status === 'number' && status >= 400 && status < 600
    ? status
    : 500;
}

/**
 * Express recognises an error handler by its 4 arguments, so `next`
 * must stay even though it is only used once headers are sent.
 * Must be registered after all routes.
 */
export function errorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  next: NextFunction
) {
  if (response.headersSent) {
    return next(error);
  }

  const statusCode = getStatusCode(error);
  const message = STATUS_CODES[statusCode] ?? 'Error';

  if (statusCode >= 500) {
    winstonLogger.error(
      `⚠ ERROR - ${error instanceof Error ? (error.stack ?? error.message) : String(error)}`
    );
    /* Never expose the details of an unexpected error to the client */
    return response.status(statusCode).json({
      success: false,
      status: statusCode,
      message,
      error: message,
    });
  }

  const errorMessage = error instanceof Error ? error.message : message;
  winstonLogger.warn(`⚠ ${statusCode} - ${errorMessage}`);
  return response.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    error: errorMessage,
  });
}
