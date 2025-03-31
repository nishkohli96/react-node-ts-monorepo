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
  const errorMessage = error instanceof Error
    ? error.message
    : JSON.stringify(error);

  winstonLogger.error(`⚠ ERROR - ${errorMessage}`);
  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    error: errorMessage,
  });
}
