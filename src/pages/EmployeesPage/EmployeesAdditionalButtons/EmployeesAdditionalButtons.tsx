import { Divider, MenuItem } from '@mui/material';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useMutation } from '@apollo/client';
import { RoutePath } from '../../../constants/routeVariables';
import { UserRoles } from '../../../constants/userRoles';
import { useUser } from '../../../hooks/useUser';
import { IAdditionalButtonsProps } from '../../../components/Table/TableRows/TableRowComponent.types';
import { updateCacheAfterDeleteUser } from '../../../graphql/mutations/deleteUser/deleteUserUpdateCache';
import { DELETE_USER } from '../../../graphql/mutations/deleteUser/deleteUser';
import {
  DeleteUserInput,
  DeleteUserResult,
} from '../../../graphql/mutations/deleteUser/deleteUser.types';
import * as Styled from './EmployeesAdditionalButtons.styles';

export const EmployeesAdditionalButtons: FC<IAdditionalButtonsProps> = ({ item }) => {
  const { id } = item;
  const user = useUser();
  const isAdmin = user?.role === UserRoles.Admin;
  const navigate = useNavigate();
  const [deleteUser] = useMutation<DeleteUserResult, DeleteUserInput>(DELETE_USER);

  const handleUserDelete = () => {
    deleteUser({
      variables: { id: id as string },
      update(cache) {
        updateCacheAfterDeleteUser(cache, id as string);
      },
    });
  };

  const handleGoToProfile = () => {
    navigate(`/${RoutePath.EMPLOYEES}/${id}/${RoutePath.PROFILE}`);
  };

  return (
    <>
      <MenuItem sx={Styled.ActionsMenuRowItemProps} onClick={handleGoToProfile}>
        <UpdateIcon sx={Styled.ActionsMenuRowIconsProps} />
        Update
      </MenuItem>

      {isAdmin && <Divider />}

      {isAdmin && (
        <MenuItem
          onClick={handleUserDelete}
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
