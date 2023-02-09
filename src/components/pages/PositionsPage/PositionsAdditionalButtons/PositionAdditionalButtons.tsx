import { Divider, MenuItem } from '@mui/material';
import React, { FC } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { IAdditionalButtonsProps } from '../../../Table/TableRows/TableRowComponent.types';
import * as Styled from './PositionsAdditionalButtons.styles';

export const PositionsAdditionalButtons: FC<IAdditionalButtonsProps> = ({ item }) => {
  const { id, employee } = item;

  const handleDeletePosition = () => {};

  const handleUpdatePosition = () => {};

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
