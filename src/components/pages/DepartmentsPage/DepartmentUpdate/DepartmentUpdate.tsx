import { useMutation } from '@apollo/client';
import React, { FC } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Spinner } from '../../../Spinner';
import { InputText } from '../../../UI/InputText';
import { ModalWindow } from '../../../UI/ModalWindow';
import { departmentsSchema } from '../../../../utils/validationSchema';
import { TError } from '../../../../types/errorTypes';
import { TFormSubmit } from '../../../../types/formTypes';
import { UPDATE_DEPARTMENT } from '../../../../graphql/mutations/departments';
import { FieldNameDepartmentsForm } from '../../../../constants/fieldNameDepartmentsForm';
import { DepartmentsInput } from '../../../../graphql/types/inputs/department';
import * as Styled from './DepartmentUpdate.styles';
import { IDepartmentUpdateModalProps } from './DepartmentUpdateModal.interface';

export const DepartmentUpdateModal: FC<IDepartmentUpdateModalProps> = ({
  open,
  onClose,
  department,
}) => {
  const [updateDepartment, { loading, error }] = useMutation(UPDATE_DEPARTMENT);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FieldValues>({
    defaultValues: {
      name: department.name,
    },
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
    updateDepartment({
      variables: {
        id: department.id,
        department: {
          name: inputs.name,
        },
      },
    })
      .catch(handleError)
      .finally(() => onClose());
  };

  return (
    <ModalWindow title={'Update department'} onClose={onClose} open={open}>
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
