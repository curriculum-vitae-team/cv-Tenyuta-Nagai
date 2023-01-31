import { ApolloCache, NormalizedCacheObject } from '@apollo/client';
import { USER } from '../queries/user';
import { ICvUnbindResult } from '../types/results/cvTypeResult';
import { IUserAllResult } from '../types/results/userTypeResult';

export const updateUserCacheAfterCvUnbindMutation = (
  cache: ApolloCache<NormalizedCacheObject>,
  userId: string,
  data?: ICvUnbindResult
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
        cvs: dataUser?.user.cvs?.filter((cv) => cv.id !== data?.unbindCv?.id),
      },
    },
    variables: {
      id: userId,
    },
  });
};
