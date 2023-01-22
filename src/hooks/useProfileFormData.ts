import { useQuery } from '@apollo/client';
import { DEPARTMENTS } from '../graphql/queries/departments';
import { POSITIONS } from '../graphql/queries/positions';
import { USER } from '../graphql/queries/user';
import { IDepartmentReturn } from '../interfaces/IDepartment.interface';
import { IPositionReturn } from '../interfaces/IPosition.interface';
import { IUserAllResult } from '../interfaces/IUser.interface';

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
