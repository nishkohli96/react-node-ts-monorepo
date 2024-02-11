import { Response } from 'express';

class AuthService {
  async loginUser(res: Response, email: string, password: string) {
    try {
      res.send({
        email,
        password,
      });
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
    res.end();
  }
}

export default new AuthService();
