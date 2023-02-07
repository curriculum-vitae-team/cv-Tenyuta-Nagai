import { useReactiveVar } from '@apollo/client';
import React, { useEffect } from 'react';
import { modalService } from '../../graphql/service/modalService';
import { ModalWindow } from '../UI/ModalWindow';

export const Modal = () => {
  const ModalComponent = useReactiveVar(modalService.ModalComponent$);
  const open = useReactiveVar(modalService.open$);

  const onClose = () => {
    modalService.closeModal();
  };

  return (
    <ModalWindow title={'hello'} open={open} onClose={onClose}>
      <ModalComponent />
    </ModalWindow>
  );
};
