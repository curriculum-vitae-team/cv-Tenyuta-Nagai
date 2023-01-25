import { yupResolver } from '@hookform/resolvers/yup';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types';
import { ModalWindow } from '../../../components/UI/ModalWindow';
import { CreateCvSchema } from '../../../utils/validationSchema';
import { ICvModalProps } from './CvModal.types';

export const CvModal: FC<ICvModalProps> = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FieldValues>({
    mode: 'onChange',
    resolver: yupResolver(CreateCvSchema),
  });
  return (
    <ModalWindow title={'Create CV'} onClose={onClose} open={open}>
      <form></form>
    </ModalWindow>
  );
};
