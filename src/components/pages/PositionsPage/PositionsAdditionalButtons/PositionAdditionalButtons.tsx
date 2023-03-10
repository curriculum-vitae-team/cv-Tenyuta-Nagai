import { Divider, MenuItem } from '@mui/material';
import React, { FC } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useMutation } from '@apollo/client';
import UpdateIcon from '@mui/icons-material/Update';
import { useTranslation } from 'react-i18next';
import { IAdditionalButtonsProps } from '../../../Table/TableRows/TableRowComponent.types';
import { modalService } from '../../../../graphql/service/modalService';
import { UpdatePositionModal } from '../UpdatePositionModal/UpdatePositionModal';
import { DELETE_POSITION } from '../../../../graphql/mutations/position';
import { TError } from '../../../../types/errorTypes';
import { updateCacheAfterDeletePosition } from '../../../../graphql/cache/position';
import * as Styled from './PositionsAdditionalButtons.styles';

export const PositionsAdditionalButtons: FC<IAdditionalButtonsProps> = ({ item }) => {
  const { id, name } = item;
  const [deletePosition] = useMutation(DELETE_POSITION, {
    update(cache) {
      updateCacheAfterDeletePosition(cache, id as string);
    },
  });
  const { t } = useTranslation();

  const handleDeletePosition = () => {
    deletePosition({
      variables: { id },
    }).catch((err: TError) => console.error(err.message));
  };

  const handleUpdatePosition = () => {
    modalService.setModalData('Update Position', UpdatePositionModal, { id, name });
  };

  return (
    <>
      <MenuItem sx={Styled.ActionsMenuRowItemProps} onClick={handleUpdatePosition}>
        <UpdateIcon sx={Styled.ActionsMenuRowIconsProps} />
        {t('Update')}
      </MenuItem>

      <Divider />

      <MenuItem onClick={handleDeletePosition} sx={Styled.ActionsMenuRowItemProps}>
        <DeleteOutlineIcon sx={Styled.ActionsMenuRowIconsProps} />
        {t('Delete')}
      </MenuItem>
    </>
  );
};
