import { IUser } from '../../../interfaces/IUser.interface';

export interface IUserAllResult {
  user: IUser;
}

export interface IUserName {
  email: string;
  profile: {
    first_name: string | null;
    last_name: string | null;
  };
}

export interface IUserNameResult {
  user: IUserName;
}

export type CreateUserResult = {
  createUser: IUser;
};

export type DeleteUserResult = {
  deleteUser: {
    affected: number;
  };
};

export type DeleteResult = {
  affected: number;
};
