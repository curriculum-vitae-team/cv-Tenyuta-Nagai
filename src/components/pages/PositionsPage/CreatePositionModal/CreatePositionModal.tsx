import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { positionSchema } from '../../../../utils/validationSchema';
import { InputText } from '../../../UI/InputText';
import { CREATE_POSITION } from '../../../../graphql/mutations/position';
import { modalService } from '../../../../graphql/service/modalService';
import { IPositionCreateReturn } from '../../../../graphql/types/results/position';
import { updateCacheAfterCreatingPosition } from '../../../../graphql/cache/position';
import { TError } from '../../../../types/errorTypes';
import { ModalWindowButton } from '../../../UI/ModalWindowButton';
import { IFormCreatePosition } from './CreatePositionModal.types';

export const CreatePositionModal = () => {
  const [createPosition, { loading }] = useMutation<IPositionCreateReturn>(CREATE_POSITION, {
    update(cache, { data }) {
      updateCacheAfterCreatingPosition(cache, data!);
    },
  });
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<IFormCreatePosition>({
    resolver: yupResolver(positionSchema),
  });

  const onSubmit: SubmitHandler<IFormCreatePosition> = (inputs) => {
    createPosition({
      variables: {
        position: {
          name: inputs.name,
        },
      },
    })
      .catch((err: TError) => console.error(err.message))
      .finally(() => modalService.closeModal());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <InputText
        name={t('Name')}
        registerName={'name'}
        register={register}
        error={!!errors.name}
        helperText={t(errors.name?.message as string) || ''}
      />

      <ModalWindowButton loading={loading} isValid={!isSubmitted || isValid} />
    </form>
  );
};
