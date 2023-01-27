import { ApolloCache, NormalizedCacheObject } from '@apollo/client';
import { IUsersResult } from '../../../pages/EmployeesPage/EmployeesPage.interface';
import { GET_ALL_USERS } from '../../queries/users';
import { CreateUserResult } from './createUser.types';

export const updateCacheAfterCreatingUser = (
  cache: ApolloCache<NormalizedCacheObject>,
  data?: CreateUserResult
) => {
  const allUsers = cache.readQuery<IUsersResult>({ query: GET_ALL_USERS });

  if (allUsers) {
    cache.writeQuery({
      query: GET_ALL_USERS,
      data: {
        users: [data?.createUser.user, ...allUsers.users],
      },
    });
  }
};
