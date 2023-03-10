import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useReactiveVar } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { positionSchema } from '../../../../utils/validationSchema';
import { InputText } from '../../../UI/InputText';
import { UPDATE_POSITION } from '../../../../graphql/mutations/position';
import { modalService } from '../../../../graphql/service/modalService';
import { TError } from '../../../../types/errorTypes';
import { ModalWindowButton } from '../../../UI/ModalWindowButton';
import { checkDirtyFieldsForm } from '../../../../utils/checkDirtyFieldsForm';
import { IFormUpdatePosition, IUpdateModalData } from './UpdatePositionModal.types';

export const UpdatePositionModal = () => {
  const positionData: Pick<Partial<IUpdateModalData>, keyof IUpdateModalData> = useReactiveVar(
    modalService.modalData$
  );
  const [updatePosition, { loading }] = useMutation(UPDATE_POSITION);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
  } = useForm<IFormUpdatePosition>({
    mode: 'onChange',
    defaultValues: {
      name: positionData.name,
    },
    resolver: yupResolver(positionSchema),
  });

  const onSubmit: SubmitHandler<IFormUpdatePosition> = (inputs) => {
    updatePosition({
      variables: {
        id: positionData.id,
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

      <ModalWindowButton loading={loading} isValid={checkDirtyFieldsForm(dirtyFields) && isValid} />
    </form>
  );
};
