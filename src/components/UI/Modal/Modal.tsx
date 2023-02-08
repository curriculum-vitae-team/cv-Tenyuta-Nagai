import React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog } from '@mui/material';
import { useModal } from '../../../hooks/useModal';
import { modalService } from '../../../graphql/service/modalService';
import * as Styled from './Modal.styles';

export const Modal = () => {
  const { Component, open, title } = useModal();

  const onClose = () => {
    modalService.closeModal();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {title}
        <Styled.IconButtonModalWindow aria-label="close" onClick={onClose}>
          <CloseIcon />
        </Styled.IconButtonModalWindow>
      </DialogTitle>
      <DialogContent>{<Component />}</DialogContent>
    </Dialog>
  );
};
