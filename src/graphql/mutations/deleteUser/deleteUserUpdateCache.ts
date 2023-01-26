import { ApolloCache, NormalizedCacheObject } from '@apollo/client';
import { IUsersResult } from '../../../pages/EmployeesPage/EmployeesPage.interface';
import { GET_ALL_USERS } from '../../queries/users';
import { DeleteUserResult } from './deleteUser.types';

export const updateCacheAfterDeleteUser = (
  cache: ApolloCache<NormalizedCacheObject>,
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
