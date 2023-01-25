import { IUser } from '../../../interfaces/IUser.interface';

export function getAllUsers(users: IUser[]) {
  return users?.map((user) => ({
    id: user?.id,
    name: user?.profile.first_name || '',
    lastName: user?.profile.last_name || '',
    avatar: user?.profile.avatar || '',
    email: user?.email,
    department: user?.department_name || '',
    position: user?.position_name || '',
  }));
}
