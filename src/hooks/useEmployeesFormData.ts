import { useQuery } from '@apollo/client';
import { DEPARTMENTS } from '../graphql/queries/departments';
import { POSITIONS } from '../graphql/queries/positions';
import { IDepartmentReturn } from '../interfaces/IDepartment.interface';
import { IPositionReturn } from '../interfaces/IPosition.interface';

export const useEmployeesFormData = () => {
  const { loading: departmentsLoading, error: departmentsError, data: departmentsData } = useQuery<
    IDepartmentReturn
  >(DEPARTMENTS);
  const { loading: positionsLoading, error: positionsError, data: positionsData } = useQuery<
    IPositionReturn
  >(POSITIONS);

  return {
    loading: departmentsLoading || positionsLoading,
    error: departmentsError || positionsError,
    departmentsData,
    positionsData,
  };
};
