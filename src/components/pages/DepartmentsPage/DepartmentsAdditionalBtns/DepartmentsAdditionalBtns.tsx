import { useMutation } from '@apollo/client';
import { Divider, MenuItem } from '@mui/material';
import { FC } from 'react';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useTranslation } from 'react-i18next';
import { IAdditionalButtonsProps } from '../../../Table/TableRows/TableRowComponent.types';
import { DELETE_DEPARTMENT } from '../../../../graphql/mutations/departments';
import { updateCacheAfterDeleteDepartment } from '../../../../graphql/cache/departments';
import { modalService } from '../../../../graphql/service/modalService';
import { DepartmentUpdateModal } from '../DepartmentUpdate';
import * as Styled from './DepartmentsAdditionalBtns.styles';

export const DepartmentsAdditionalButtons: FC<IAdditionalButtonsProps> = ({ item }) => {
  const { id, name } = item;
  const [deleteDepartment] = useMutation(DELETE_DEPARTMENT);
  const { t } = useTranslation();
  const handleDepartmentDelete = () => {
    deleteDepartment({
      variables: { id: id },
      update(cache) {
        updateCacheAfterDeleteDepartment(cache, id as string);
      },
    });
  };

  const updateDepartment = () => {
    modalService.setModalData('Update department', DepartmentUpdateModal, {
      name: name as string,
      id: id as string,
    });
  };

  return (
    <>
      <MenuItem sx={Styled.ActionsMenuRowItemProps} onClick={updateDepartment}>
        <UpdateIcon sx={Styled.ActionsMenuRowIconsProps} />
        {t('Update')}
      </MenuItem>

      <Divider />

      <MenuItem onClick={handleDepartmentDelete} sx={Styled.ActionsMenuRowItemProps}>
        <DeleteOutlineIcon sx={Styled.ActionsMenuRowIconsProps} />
        {t('Delete')}
      </MenuItem>
    </>
  );
};
