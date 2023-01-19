import { IUser } from '../../../interfaces/IUser.interface';
import { IEmployeeTable } from '../EmployeesPage.interface';

export function getAllUsers(users: IUser[]): IEmployeeTable[] {
  return users?.map((user) => ({
    id: user?.id,
    name: user?.profile.first_name || ' ',
    lastName: user?.profile.last_name || '',
    email: user?.email,
    department: user?.department_name || '',
    position: user?.position_name || '',
  }));
}
