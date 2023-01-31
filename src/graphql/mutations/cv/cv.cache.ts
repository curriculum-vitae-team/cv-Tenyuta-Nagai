import { ApolloCache, NormalizedCacheObject } from '@apollo/client';
import { ICvUnbindResult } from '../../../interfaces/ICv.interface';
import { IUserAllResult } from '../../../interfaces/IUser.interface';
import { USER } from '../../queries/user';

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
