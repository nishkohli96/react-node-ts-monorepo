import express from 'express';
import cors from 'cors';
import { ENV_VARS } from '@/constants';
import { errorHandler, requestLogger } from '@/middleware';
import { routesList } from '@/routes';
import { sendErrorResponse } from '@/utils';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(requestLogger);

app.get('/', (_, response) => {
  response.status(200).json({
    env: ENV_VARS.env,
    message: 'Api is up & running!!!'
  });
});

routesList.forEach(route => app.use(route.path, route.router));

/* 404 Handler - To be written at last */
app.use((req, res) => {
  const notFoundError = `No route exists for this endpoint: "${req.originalUrl}"`;
  return sendErrorResponse(res, {
    statusCode: 404,
    message: '404 - Not Found',
    error: notFoundError,
  });
});

/* Error Handler - Must come after all the routes and the 404 handler */
app.use(errorHandler);

export default app;
