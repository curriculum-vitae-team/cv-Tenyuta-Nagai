import { IUser } from '../IUser.interface';

export interface AuthResult {
  user: IUser;
  access_token: string;
}

export interface LoginResult {
  login: AuthResult;
}

export interface SignupResult {
  signup: AuthResult;
}
