import { ApolloCache, NormalizedCacheObject } from '@apollo/client';
import { ICvsCreateResult, ICvsResult, ICvUnbindResult } from '../../../interfaces/ICv.interface';
import { IUserAllResult } from '../../../interfaces/IUser.interface';
import { CVS } from '../../queries/cvs';
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

export const updateCvsCacheAfterCvCreateMutation = (
  cache: ApolloCache<NormalizedCacheObject>,
  data: ICvsCreateResult,
  userData: IUserAllResult
) => {
  const oldSvs = cache.readQuery<ICvsResult>({
    query: CVS,
  });

  const newCv = {
    ...data?.createCv,
    user: {
      ...userData?.user,
    },
    projects: [], // TO-DO change it
  };

  if (oldSvs?.cvs) {
    cache.writeQuery({
      query: CVS,
      data: {
        cvs: [newCv, ...oldSvs!.cvs],
      },
    });
  }
};

export const updateCvsCacheAfterCvDeleteMutation = (
  cache: ApolloCache<NormalizedCacheObject>,
  cvId: string
) => {
  const id = cache.identify({ id: cvId, __typename: 'Cv' });
  cache.evict({ id });
  cache.gc();
};
