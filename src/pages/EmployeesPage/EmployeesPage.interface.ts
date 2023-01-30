import { IUser } from '../../interfaces/IUser.interface';

export interface IUsersResult {
  users: IUser[];
}

export interface IEmployeeTable {
  id: string;
  name: string;
  lastName: string;
  email: string;
  avatar: string;
  department: string;
  position: string;
}
