import { useQuery } from '@apollo/client';
import { DEPARTMENTS } from '../graphql/queries/departments';
import { POSITIONS } from '../graphql/queries/positions';
import { USER } from '../graphql/queries/user';
import { IDepartmentReturn } from '../graphql/types/results/department';
import { IPositionReturn } from '../graphql/types/results/position';
import { IUserAllResult } from '../graphql/types/results/user';

export const useProfileFormData = (id: string) => {
  const { loading: loadingUser, error: errorUser, data: userData } = useQuery<IUserAllResult>(
    USER,
    {
      variables: { id },
    }
  );
  const { loading: departmentsLoading, error: departmentsError, data: departmentsData } = useQuery<
    IDepartmentReturn
  >(DEPARTMENTS);
  const { loading: positionsLoading, error: positionsError, data: positionsData } = useQuery<
    IPositionReturn
  >(POSITIONS);

  return {
    loading: loadingUser || departmentsLoading || positionsLoading,
    error: errorUser || departmentsError || positionsError,
    userData,
    departmentsData,
    positionsData,
  };
};
