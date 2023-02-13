import { ApolloCache, NormalizedCacheObject } from '@apollo/client';
import { IUsersResult } from '../../components/pages/EmployeesPage/EmployeesPage.interface';
import { GET_ALL_USERS } from '../queries/users';
import { CreateUserResult } from '../types/results/user';

export const updateCacheAfterCreatingUser = (
  cache: ApolloCache<NormalizedCacheObject>,
  role: string,
  data: CreateUserResult
) => {
  const allUsers = cache.readQuery<IUsersResult>({ query: GET_ALL_USERS });

  const newUser = {
    ...data?.createUser,
    profile: {
      ...data?.createUser.profile,
      created_at: new Date(),
    },
    role,
  };

  if (allUsers) {
    cache.writeQuery({
      query: GET_ALL_USERS,
      data: {
        users: [newUser, ...allUsers.users],
      },
    });
  }
};
