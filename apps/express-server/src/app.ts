import express, {
  type Express,
  type Request,
  type Response
} from 'express';
import cors from 'cors';
import { ENV_CONFIG } from '@/constants';
import { requestLogger } from '@/middleware';
import { routesList } from '@/routes';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(requestLogger);

app.get('/', (_: Request, response: Response) => {
  response.status(200).json({
    env: ENV_CONFIG.env,
    message: 'Api is up & running!!!'
  });
});

routesList.forEach(route => {
  app.use(route.path, route.router);
});

/* 404 Handler - To be written at last */
app.get('*', (req: Request, response: Response) => {
  const notFoundMsg = `Not Found - "${req.originalUrl}"`;
  response.status(404).send(notFoundMsg);
});

export default app;
