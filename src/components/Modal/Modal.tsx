import { useReactiveVar } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog } from '@mui/material';
import { modalService } from '../../graphql/service/modalService';
import * as Styled from '../UI/ModalWindow/ModalWindow.styles';
import { Spinner } from '../Spinner';
import { ITestComponentProps } from './TestComponent/TestComponent.types';
import { useModal } from './useModal';

export const Modal = () => {
  const { ModalComponent, open, modalProps } = useModal();
  console.log(11111);

  const onClose = () => {
    modalService.closeModal();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {'title'}
        <Styled.IconButtonModalWindow aria-label="close" onClick={onClose}>
          <CloseIcon />
        </Styled.IconButtonModalWindow>
      </DialogTitle>
      <DialogContent>{<ModalComponent {...modalProps} />}</DialogContent>
    </Dialog>
  );
};
