import { Response } from 'express';

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
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
    res.end();
  }
}

export default new AuthService();
