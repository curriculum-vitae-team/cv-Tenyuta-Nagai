import { ApolloCache, NormalizedCacheObject } from '@apollo/client';
import { CreateDepartmentResult, IDepartmentReturn } from '../types/results/department';
import { IDepartment } from './../../interfaces/IDepartment.interface';
import { DEPARTMENTS } from './../queries/departments';

export const updateCacheAfterCreatingDepartment = (
  cache: ApolloCache<NormalizedCacheObject>,
  data: CreateDepartmentResult
) => {
  const allDepartments = cache.readQuery<IDepartmentReturn>({ query: DEPARTMENTS });

  if (allDepartments) {
    cache.writeQuery({
      query: DEPARTMENTS,
      data: {
        departments: [data?.createDepartment, ...allDepartments.departments],
      },
    });
  }
};

export const updateCacheAfterDeleteDepartment = (cache: ApolloCache<IDepartment>, Id: string) => {
  const id = cache.identify({ id: Id, __typename: 'Department' });
  cache.evict({ id });
  cache.gc();
};
