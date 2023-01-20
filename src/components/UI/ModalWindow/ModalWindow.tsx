import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import React, { FC } from 'react';
import { Dialog } from '@mui/material';
import { IModalWindowProps } from './ModalWindow.types';
import * as Styled from './ModalWindow.styles';

export const ModalWindow: FC<IModalWindowProps> = ({ children, onClose, open, title }) => {
  const handleStopPropagation = (
    e: React.MouseEvent<HTMLSpanElement | HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  return (
    <Dialog open={open} onClick={onClose} disableEscapeKeyDown>
      <DialogTitle sx={{ m: 0, p: 2 }} onClick={handleStopPropagation}>
        {title}
        {onClose && (
          <Styled.IconButtonModalWindow aria-label="close" onClick={onClose}>
            <CloseIcon />
          </Styled.IconButtonModalWindow>
        )}
      </DialogTitle>
      <DialogContent sx={{ overflowX: 'hidden' }} onClick={handleStopPropagation}>
        {children}
      </DialogContent>
    </Dialog>
  );
};
