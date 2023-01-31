import { useQuery } from '@apollo/client';
import { DEPARTMENTS } from '../graphql/queries/departments';
import { POSITIONS } from '../graphql/queries/positions';
import { IDepartmentReturn } from '../graphql/types/results/department';
import { IPositionReturn } from '../graphql/types/results/position';
import { UserRoles } from './../constants/userRoles';

export const useEmployeesFormData = () => {
  const { loading: departmentsLoading, error: departmentsError, data: departmentsData } = useQuery<
    IDepartmentReturn
  >(DEPARTMENTS);
  const { loading: positionsLoading, error: positionsError, data: positionsData } = useQuery<
    IPositionReturn
  >(POSITIONS);
  const rolesData = [
    { id: UserRoles.Admin as string, name: UserRoles.Admin as string },
    { id: UserRoles.Employee as string, name: UserRoles.Employee as string },
  ];

  return {
    loading: departmentsLoading || positionsLoading,
    error: departmentsError || positionsError,
    departmentsData,
    positionsData,
    rolesData,
  };
};
