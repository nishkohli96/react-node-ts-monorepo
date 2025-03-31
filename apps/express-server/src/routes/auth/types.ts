import { type Request } from 'express';
export interface UserLoginBody {
  email: string;
  password: string;
}

export type UserLoginRequest = Request<object, object, UserLoginBody>;
