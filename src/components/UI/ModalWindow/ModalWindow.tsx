import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import React, { FC } from 'react';
import { Dialog } from '@mui/material';
import { IModalWindowProps } from './ModalWindow.types';
import * as Styled from './ModalWindow.styles';

export const ModalWindow: FC<IModalWindowProps> = ({ children, onClose, open, title }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {title}
        {onClose && (
          <Styled.IconButtonModalWindow aria-label="close" onClick={onClose}>
            <CloseIcon />
          </Styled.IconButtonModalWindow>
        )}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
