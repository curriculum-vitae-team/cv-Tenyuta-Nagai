import { ApolloCache, NormalizedCacheObject } from '@apollo/client';
import { CV } from '../queries/cv';
import { CVS } from '../queries/cvs';
import { USER } from '../queries/user';
import {
  ICvQueryResult,
  ICvResult,
  ICvsCreateResult,
  ICvsResult,
  ICvUnbindResult,
} from '../types/results/cv';
import { IProjectsResult } from '../types/results/projects';
import { IUserAllResult } from '../types/results/user';

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

export const updateCvsCacheAfterCvUpdateProjectsMutation = (
  cache: ApolloCache<NormalizedCacheObject>,
  data: ICvResult,
  allProjects: IProjectsResult,
  projectsIds: string[]
) => {
  const oldCv = cache.readQuery<ICvQueryResult>({
    query: CV,
    variables: {
      id: data?.updateCv.id,
    },
  });

  if (oldCv) {
    cache.writeQuery({
      query: CV,
      data: {
        ...oldCv,
        cv: {
          ...oldCv.cv,
          projects: allProjects.projects.filter((project) => projectsIds.includes(project.id)),
        },
      },
      variables: {
        id: data?.updateCv.id,
      },
    });
  }
};
