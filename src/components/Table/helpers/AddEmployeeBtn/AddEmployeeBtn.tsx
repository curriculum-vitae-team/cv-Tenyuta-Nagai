import React from 'react';
import { useUser } from '../../../../hooks/useUser';
import { ButtonAddEmployee } from './AddEmployeeBtn.styles';

export const AddEmployeeBtn = () => {
  const user = useUser();

  return (
    <>
      <ButtonAddEmployee disabled={user?.role == 'employee'}>Add employee</ButtonAddEmployee>
    </>
  );
};
