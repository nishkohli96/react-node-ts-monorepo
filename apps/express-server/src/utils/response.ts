import { winstonLogger } from '@/middleware';
import type { Response } from 'express';

type ErrorResponseOptions = {
  error: unknown;
  message?: string;
  statusCode?: number;
};

export function sendErrorResponse(
  res: Response,
  {
    error,
    message = 'Internal Server Error',
    statusCode = 500,
  }: ErrorResponseOptions
) {
  /* JSON.stringify would wrap a plain string in an extra pair of quotes */
  let errorMessage = String(error);
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'object' && error !== null) {
    errorMessage = JSON.stringify(error);
  }

  winstonLogger.error(`⚠ ERROR - ${errorMessage}`);
  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    error: errorMessage,
  });
}
