import { ApolloCache, NormalizedCacheObject } from '@apollo/client';
import { CreateDepartmentResult, IDepartmentReturn } from '../types/results/department';
import { DEPARTMENTS } from './../queries/departments';

export const updateCacheAfterCreatingDepartment = (
  cache: ApolloCache<NormalizedCacheObject>,
  data?: CreateDepartmentResult
) => {
  const allDepartments = cache.readQuery<IDepartmentReturn>({ query: DEPARTMENTS });

  const newDepartment = {
    ...data?.createDepartment,

    created_at: new Date(),
  };

  if (allDepartments) {
    cache.writeQuery({
      query: DEPARTMENTS,
      data: {
        departments: [newDepartment, ...allDepartments.departments],
      },
    });
  }
};
