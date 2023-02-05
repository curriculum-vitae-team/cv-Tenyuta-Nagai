import { useMutation } from '@apollo/client';
import { Divider, MenuItem } from '@mui/material';
import { FC } from 'react';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { IAdditionalButtonsProps } from '../../../Table/TableRows/TableRowComponent.types';
import { UserRoles } from '../../../../constants/userRoles';
import { useUser } from '../../../../hooks/useUser';
import * as Styled from './DepartmentsAdditionalBtns.styles';

export const DepartmentsAdditionalButtons: FC<IAdditionalButtonsProps> = ({ item }) => {
  const { id } = item;
  const user = useUser();
  const isAdmin = user?.role === UserRoles.Admin;
  //const [deleteDepartment] = useMutation(DELETE_DEPARTMENT);

  const handleDepartmentDelete = () => {
    console.log('delete');
  };

  const handleDepartmentUpdate = () => {
    console.log('update');
  };

  return (
    <>
      <MenuItem sx={Styled.ActionsMenuRowItemProps} onClick={handleDepartmentUpdate}>
        <UpdateIcon sx={Styled.ActionsMenuRowIconsProps} />
        Update
      </MenuItem>

      {isAdmin && <Divider />}

      {isAdmin && (
        <MenuItem
          onClick={handleDepartmentDelete}
          sx={Styled.ActionsMenuRowItemProps}
          disabled={user?.id === id && isAdmin}
        >
          <DeleteOutlineIcon sx={Styled.ActionsMenuRowIconsProps} />
          Delete
        </MenuItem>
      )}
    </>
  );
};
