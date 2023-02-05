import { useMutation } from '@apollo/client';
import { Divider, MenuItem } from '@mui/material';
import { FC, useState } from 'react';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { IAdditionalButtonsProps } from '../../../Table/TableRows/TableRowComponent.types';
import { UserRoles } from '../../../../constants/userRoles';
import { useUser } from '../../../../hooks/useUser';
import { DELETE_DEPARTMENT } from '../../../../graphql/mutations/departments';
import { updateCacheAfterDeleteDepartment } from '../../../../graphql/cache/departments';
import { DepartmentUpdateModal } from '../DepartmentUpdate';
import * as Styled from './DepartmentsAdditionalBtns.styles';

export const DepartmentsAdditionalButtons: FC<IAdditionalButtonsProps> = ({ item }) => {
  const { id } = item;
  const user = useUser();
  const isAdmin = user?.role === UserRoles.Admin;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [deleteDepartment] = useMutation(DELETE_DEPARTMENT);

  const handleDepartmentDelete = () => {
    deleteDepartment({
      variables: { id: id },
      update(cache) {
        updateCacheAfterDeleteDepartment(cache, id as string);
      },
    });
  };

  const handleUpdate = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <MenuItem sx={Styled.ActionsMenuRowItemProps} onClick={handleUpdate}>
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

      {isOpenModal && (
        <DepartmentUpdateModal
          departmentData={item}
          open={isOpenModal}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
