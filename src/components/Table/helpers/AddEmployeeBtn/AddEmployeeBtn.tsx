import React from 'react';
import { UserRoles } from '../../../../constants/userRoles';
import { useUser } from '../../../../hooks/useUser';
import { ButtonAddEmployee } from './AddEmployeeBtn.styles';

export const AddEmployeeBtn = () => {
  const user = useUser();

  return (
    <>{user?.role === UserRoles.Admin && <ButtonAddEmployee>Add employee</ButtonAddEmployee>}</>
  );
};
