import type { Response } from 'express';

class AuthService {
  loginUser(res: Response, email: string, password: string) {
    try {
      res
        .status(200)
        .send({
          email,
          password
        })
        .end();
    } catch (error) {
      res.status(500).send(`Internal Server Error: ${JSON.stringify(error)}`);
    }
    res.end();
  }
}

export default new AuthService();
