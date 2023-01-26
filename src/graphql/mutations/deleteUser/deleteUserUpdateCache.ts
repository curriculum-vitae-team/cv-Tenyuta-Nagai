import { ApolloCache } from '@apollo/client';
import { IUser } from '../../../interfaces/IUser.interface';
import { IUsersResult } from '../../../pages/EmployeesPage/EmployeesPage.interface';
import { GET_ALL_USERS } from '../../queries/users';
import { DeleteUserResult } from './deleteUser.types';

export const updateCacheAfterDeleteUser = (
  cache: ApolloCache<IUser>,
  id: string,
  data: DeleteUserResult
) => {
  const allUsers = cache.readQuery<IUsersResult>({ query: GET_ALL_USERS });

  if (allUsers && data?.deleteUser.affected) {
    cache.writeQuery({
      query: GET_ALL_USERS,
      data: {
        users: allUsers.users.filter((user) => user?.id !== id),
      },
    });
  }
};
