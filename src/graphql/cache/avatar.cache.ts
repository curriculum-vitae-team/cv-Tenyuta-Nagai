import { ApolloCache, NormalizedCacheObject } from '@apollo/client';
import { IAvatarReturn } from '../types/results/avatarTypeResult';
import { USER } from '../queries/user';
import { IUserAllResult } from '../types/results/userTypeResult';

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
