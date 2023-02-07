import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { TError } from '../../../../types/errorTypes';
import { TFormSubmit } from '../../../../types/formTypes';
import { departmentsSchema } from '../../../../utils/validationSchema';
import { Spinner } from '../../../Spinner';
import { InputText } from '../../../UI/InputText';
import { ModalWindow } from '../../../UI/ModalWindow';
import { IModalForCreatingProps } from '../../../Table/template/templateTable.types';
import { FieldNameDepartmentsForm } from '../../../../constants/fieldNameDepartmentsForm';
import { CreateDepartmentResult } from '../../../../graphql/types/results/department';
import { DepartmentsInput } from '../../../../graphql/types/inputs/department';
import { CREATE_DEPARTMENT } from '../../../../graphql/mutations/departments';
import { updateCacheAfterCreatingDepartment } from '../../../../graphql/cache/departments';
import * as Styled from './DepartmentCreateModal.styles';

export const DepartmentsCreateModal: FC<IModalForCreatingProps> = ({ open, onClose }) => {
  const [createDepartment, { loading, error }] = useMutation(CREATE_DEPARTMENT);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(departmentsSchema),
  });

  if (error) {
    onClose();
  }

  const handleError = (err: TError) => {
    console.error(err.message);
    onClose();
  };

  const onSubmit = (inputs: DepartmentsInput) => {
    createDepartment({
      variables: {
        department: {
          name: inputs.name,
        },
      },
      update(cache, { data }) {
        updateCacheAfterCreatingDepartment(cache, (data as unknown) as CreateDepartmentResult);
      },
    })
      .catch(handleError)
      .finally(() => onClose());
  };

  return (
    <ModalWindow title={'Create department'} onClose={onClose} open={open}>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmit as TFormSubmit)} autoComplete="off">
          <InputText
            name="Department name"
            registerName={FieldNameDepartmentsForm.NAME}
            register={register}
            error={!!errors.name}
            helperText={errors.name?.message as string}
          />

          <Styled.ButtonSubmit
            loading={loading}
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={!isValid}
          >
            {'Save'}
          </Styled.ButtonSubmit>
        </form>
      )}
    </ModalWindow>
  );
};
