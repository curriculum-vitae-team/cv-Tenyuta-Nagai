import { IUser } from '../../interfaces/IUser.interface';

export interface IAuthResult {
  user: IUser;
  access_token: string;
}

export interface ILoginResult {
  login: IAuthResult;
}

export interface ISignupResult {
  signup: IAuthResult;
}

export interface IAuthInput {
  email: string;
  password: string;
}
