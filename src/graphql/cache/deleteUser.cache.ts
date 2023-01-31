import { ApolloCache } from '@apollo/client';
import { IUser } from '../../interfaces/IUser.interface';

export const updateCacheAfterDeleteUser = (cache: ApolloCache<IUser>, userId: string) => {
  const id = cache.identify({ id: userId, __typename: 'User' });
  cache.evict({ id });
  cache.gc();
};
