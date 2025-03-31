import { type Router } from 'express';
import { authRouter } from './auth/controller';

type RouteInfo = {
  path: string;
	router: Router;
};

function generatePrefix(routeName: string) {
  return `/api${routeName}`;
}

const routesList: RouteInfo[] = [
  {
    path: generatePrefix('/auth'),
    router: authRouter
  }
];

export { routesList };
