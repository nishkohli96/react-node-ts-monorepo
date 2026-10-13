import { type Request } from 'express';
export interface UserLoginBody {
  email: string;
  password: string;
}

/* In Express 5, req.body is undefined unless a body parser matched the request. */
export type UserLoginRequest = Request<
  object,
  object,
  Partial<UserLoginBody> | undefined
>;
