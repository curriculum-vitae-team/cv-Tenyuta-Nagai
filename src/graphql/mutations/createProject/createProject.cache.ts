import { ApolloCache, NormalizedCacheObject } from '@apollo/client';
import { GET_ALL_PROJECTS } from './../../queries/projects';
import { CreateProjectResult, IProjectsResult } from './createProject.types';

export const updateCacheAfterCreatingProject = (
  cache: ApolloCache<NormalizedCacheObject>,
  data?: CreateProjectResult
) => {
  const allProjects = cache.readQuery<IProjectsResult>({ query: GET_ALL_PROJECTS });

  const newProject = {
    ...data?.createProject,
  };

  if (allProjects) {
    cache.writeQuery({
      query: GET_ALL_PROJECTS,
      data: {
        projects: [newProject, ...allProjects.projects],
      },
    });
  }
};
