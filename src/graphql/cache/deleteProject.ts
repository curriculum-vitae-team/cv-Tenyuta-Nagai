import { ApolloCache, NormalizedCacheObject } from '@apollo/client';

export const updateCacheAfterDeleteProject = (
  cache: ApolloCache<NormalizedCacheObject>,
  projectId: string
) => {
  const id = cache.identify({ id: projectId, __typename: 'Project' });
  cache.evict({ id });
  cache.gc();
};
