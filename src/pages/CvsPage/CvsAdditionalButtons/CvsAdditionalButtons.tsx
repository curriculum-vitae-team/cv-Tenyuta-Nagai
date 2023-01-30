import { Divider, MenuItem } from '@mui/material';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useMutation } from '@apollo/client';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
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
import * as Styled from './CvsAdditionalButtons.styles';

export const CvsAdditionalButtons: FC<IAdditionalButtonsProps> = ({ id }) => {
  const user = useUser();
  const isAdmin = user?.role === UserRoles.Admin;
  const navigate = useNavigate();
  const [deleteUser] = useMutation<DeleteUserResult, DeleteUserInput>(DELETE_USER);

  const handleDeleteCv = () => {
    console.log(id);
  };

  const handleGoToDetails = () => {
    console.log('details', id);
  };

  return (
    <>
      <MenuItem sx={Styled.ActionsMenuRowItemProps} onClick={handleGoToDetails}>
        <InfoOutlinedIcon sx={Styled.ActionsMenuRowIconsProps} />
        Details
      </MenuItem>

      <Divider />

      <MenuItem
        onClick={handleDeleteCv}
        sx={Styled.ActionsMenuRowItemProps}
        disabled={user?.id === id || isAdmin}
      >
        <DeleteOutlineIcon sx={Styled.ActionsMenuRowIconsProps} />
        Delete
      </MenuItem>
    </>
  );
};
