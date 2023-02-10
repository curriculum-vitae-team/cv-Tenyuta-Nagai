import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { positionSchema } from '../../../../utils/validationSchema';
import { InputText } from '../../../UI/InputText';
import { CREATE_POSITION } from '../../../../graphql/mutations/position';
import { modalService } from '../../../../graphql/service/modalService';
import { IPositionCreateReturn } from '../../../../graphql/types/results/position';
import { updateCacheAfterCreatingPosition } from '../../../../graphql/cache/position';
import { TError } from '../../../../types/errorTypes';
import { IFormCreatePosition } from './CreatePositionModal.types';
import * as Styled from './CreatePositionModal.style';

export const CreatePositionModal = () => {
  const [createPosition, { loading }] = useMutation<IPositionCreateReturn>(CREATE_POSITION, {
    update(cache, { data }) {
      updateCacheAfterCreatingPosition(cache, data!);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormCreatePosition>({
    mode: 'onChange',
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
        name="Name"
        registerName={'name'}
        register={register}
        error={!!errors.name}
        helperText={errors.name?.message || ''}
      />

      <Styled.ButtonSubmit
        loading={loading}
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={!isValid}
      >
        Save
      </Styled.ButtonSubmit>
    </form>
  );
};
