import { useQuery } from '@apollo/client';
import { DEPARTMENTS } from '../graphql/queries/departments';
import { POSITIONS } from '../graphql/queries/positions';
import { IDepartmentReturn } from '../interfaces/IDepartment.interface';
import { IPositionReturn } from '../interfaces/IPosition.interface';
import { UserRoles } from './../constants/userRoles';

export const useEmployeesFormData = () => {
  const { loading: departmentsLoading, error: departmentsError, data: departmentsData } = useQuery<
    IDepartmentReturn
  >(DEPARTMENTS);
  const { loading: positionsLoading, error: positionsError, data: positionsData } = useQuery<
    IPositionReturn
  >(POSITIONS);
  const rolesData = [
    { id: UserRoles.Admin, nameRole: UserRoles.Admin },
    { id: UserRoles.Employee, nameRole: UserRoles.Employee },
  ];

  return {
    loading: departmentsLoading || positionsLoading,
    error: departmentsError || positionsError,
    departmentsData,
    positionsData,
    rolesData,
  };
};
