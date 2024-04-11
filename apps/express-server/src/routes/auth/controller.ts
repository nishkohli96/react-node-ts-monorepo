import { Router, Request, Response } from 'express';
import authService from './service';
import * as AuthTypes from './types';

const authRouter = Router();

authRouter.get('/test', function printHello(_, res: Response) {
  return res.status(200).send('Hello World !!')
    .end();
});

/* Login user */
authRouter.post(
  '/login',
  function loginUser(
    req: Request<object, object, AuthTypes.UserLoginBody>,
    res: Response
  ) {
    const { email, password } = req.body;
    return authService.loginUser(res, email, password);
  }
);

export { authRouter };
