import React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import { useModal } from '../../../hooks/useModal';
import { modalService } from '../../../graphql/service/modalService';
import * as Styled from './ModalWindow.styles';

export const ModalWindow = () => {
  const { Component, open, title } = useModal();
  const { t } = useTranslation();

  const onClose = () => {
    modalService.closeModal();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Box sx={{ mr: 5 }}>{t(title)}</Box>
        <Styled.IconButtonModalWindow aria-label="close" onClick={onClose}>
          <CloseIcon />
        </Styled.IconButtonModalWindow>
      </DialogTitle>
      <DialogContent>{<Component />}</DialogContent>
    </Dialog>
  );
};
