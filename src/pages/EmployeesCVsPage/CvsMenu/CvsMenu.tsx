import { Drawer, IconButton, MenuItem } from '@mui/material';
import React, { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
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
        <Styled.ListMenu>
          {data?.user.cvs?.map(({ id, name }) => (
            <MenuItem
              key={id}
              onClick={setCvData(id)}
              sx={{
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                wordBreak: 'break-word',
              }}
            >
              {name}
            </MenuItem>
          ))}
        </Styled.ListMenu>
      </Styled.CardMenu>
    </Drawer>
  );
};
