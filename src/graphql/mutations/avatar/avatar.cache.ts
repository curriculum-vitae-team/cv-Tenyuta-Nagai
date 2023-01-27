import { ApolloCache, NormalizedCacheObject } from '@apollo/client';
import { IAvatarReturn } from '../../../interfaces/IAvatar';
import { IUserAllResult } from '../../../interfaces/IUser.interface';
import { USER } from '../../queries/user';

export const updateUserCacheAfterAvatarMutation = (
  cache: ApolloCache<NormalizedCacheObject>,
  userId: string,
  data?: IAvatarReturn
) => {
  const dataUser = cache.readQuery<IUserAllResult>({
    query: USER,
    variables: {
      id: userId,
    },
  });

  cache.writeQuery({
    query: USER,
    data: {
      user: {
        ...dataUser?.user,
        profile: {
          ...dataUser?.user.profile,
          avatar: data ? data!.uploadAvatar : null,
        },
      },
    },
    variables: {
      id: userId,
    },
  });
};
