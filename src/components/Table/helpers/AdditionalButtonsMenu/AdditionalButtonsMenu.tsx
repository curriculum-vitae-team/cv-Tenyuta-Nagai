import { Menu } from '@mui/material';
import React, { FC } from 'react';
import { IAdditionalButtonsMenu } from './AdditionalButtonsMenu.types';
import * as Styled from './AdditionalButtonsMenu.styles';

export const AdditionalButtonsMenu: FC<IAdditionalButtonsMenu> = ({
  children,
  onClose,
  open,
  anchorEl,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={onClose}
      onClick={onClose}
      PaperProps={{
        elevation: 0,
        sx: Styled.ActionsMenuRowProps,
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {children}
    </Menu>
  );
};
