import { Router, type Response } from 'express';
import { sendErrorResponse } from '@/utils';
import authService from './service';
import type * as AuthTypes from './types';

const authRouter = Router();

authRouter.get('/test', function printHello(_, res: Response) {
  return res.status(200).send('Hello World !!').end();
});

/* Login user */
authRouter.post(
  '/login',
  function loginUser(
    req: AuthTypes.UserLoginRequest,
    res: Response
  ) {
    const { email, password }: Partial<AuthTypes.UserLoginBody> = req.body ?? {};
    const hasEmail = typeof email === 'string' && email.trim() !== '';
    const hasPassword = typeof password === 'string' && password !== '';
    if (!hasEmail || !hasPassword) {
      return sendErrorResponse(res, {
        statusCode: 400,
        message: 'Bad Request',
        error: 'email and password are required',
      });
    }
    return authService.loginUser(res, email, password);
  }
);

export { authRouter };
