import { Divider, MenuItem } from '@mui/material';
import React, { FC } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useMutation } from '@apollo/client';
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
        <InfoOutlinedIcon sx={Styled.ActionsMenuRowIconsProps} />
        Update
      </MenuItem>

      <Divider />

      <MenuItem onClick={handleDeletePosition} sx={Styled.ActionsMenuRowItemProps}>
        <DeleteOutlineIcon sx={Styled.ActionsMenuRowIconsProps} />
        Delete
      </MenuItem>
    </>
  );
};
