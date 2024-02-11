import { UserRole } from 'models/User';

export interface UserLoginBody {
  email: string;
  password: string;
}

export interface GenerateTokenPayload {
  _id: string;
  email: string;
  role: UserRole;
}

export interface DecodedTokenInfo extends GenerateTokenPayload {
  iat: number;
  exp: number;
}
