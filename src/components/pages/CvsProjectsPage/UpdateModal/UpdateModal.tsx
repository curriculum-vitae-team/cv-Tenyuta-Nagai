import React, { FC } from 'react';
import { IModalForCreatingProps } from '../../../Table/template/templateTable.types';
import { ModalWindow } from '../../../UI/ModalWindow';

export const UpdateModal: FC<IModalForCreatingProps> = ({ open, onClose }) => {
  return (
    <ModalWindow title={'Update CV'} onClose={onClose} open={open}>
      <form></form>
    </ModalWindow>
  );
};
