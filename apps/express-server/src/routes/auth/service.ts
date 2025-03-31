import type { Response } from 'express';
import { sendErrorResponse } from '@/utils';

class AuthService {
  loginUser(res: Response, email: string, password: string) {
    try {
      return res
        .status(200)
        .send({
          email,
          password
        })
        .end();
    } catch (error) {
      return sendErrorResponse(res, { error });
    }
  }
}

const authService = new AuthService();
export default authService;
