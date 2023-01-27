import { Drawer, IconButton } from '@mui/material';
import React, { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { ItemMenu, ListMenu } from '../EmployeesCVsPage.styles';
import { ICvsMenuProps } from './CvsMenu.types';
import * as Styled from './CvsMenu.styles';

export const CvsMenu: FC<ICvsMenuProps> = ({ data, open, showCvData, onClose }) => {
  const setCvData = (id: string) => {
    return () => showCvData(id);
  };

  const handleClose = () => {
    onClose();
  };

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <Drawer open={open} anchor="left" onClick={handleClose}>
      <Styled.CardMenu onClick={handleStopPropagation}>
        <Styled.ToolbarMenu>
          <IconButton
            aria-label="close-menu"
            onClick={handleClose}
            sx={{
              color: 'secondary.main',
            }}
          >
            <CloseIcon />
          </IconButton>
        </Styled.ToolbarMenu>
        <ListMenu>
          {data?.user?.cvs?.map(({ id, name }) => (
            <ItemMenu key={id} onClick={setCvData(id)}>
              {name}
            </ItemMenu>
          ))}
        </ListMenu>
      </Styled.CardMenu>
    </Drawer>
  );
};
