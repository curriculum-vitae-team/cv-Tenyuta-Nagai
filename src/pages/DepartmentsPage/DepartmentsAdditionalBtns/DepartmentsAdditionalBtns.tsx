import { useMutation } from '@apollo/client';
import { Divider, MenuItem } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IAdditionalButtonsProps } from '../../../components/Table/TableRows/TableRowComponent.types';
import { RoutePath } from '../../../constants/routeVariables';
import { UserRoles } from '../../../constants/userRoles';
import { useUser } from '../../../hooks/useUser';
import * as Styled from './DepartmentsAdditionalBtns.styles';

export const DepartmentsAdditionalButtons: FC<IAdditionalButtonsProps> = ({ item }) => {
  const { id } = item;
  const user = useUser();
  const isAdmin = user?.role === UserRoles.Admin;
  const navigate = useNavigate();
  //const [deleteDepartment] = useMutation(DELETE_DEPARTMENT);

  const handleUserDelete = () => {
    console.log('delete');
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
