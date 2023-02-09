import { useMutation, useReactiveVar } from '@apollo/client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Spinner } from '../../../Spinner';
import { InputText } from '../../../UI/InputText';
import { departmentsSchema } from '../../../../utils/validationSchema';
import { TError } from '../../../../types/errorTypes';
import { UPDATE_DEPARTMENT } from '../../../../graphql/mutations/departments';
import { FieldNameDepartmentsForm } from '../../../../constants/fieldNameDepartmentsForm';
import { DepartmentsInput } from '../../../../graphql/types/inputs/department';
import { modalService } from '../../../../graphql/service/modalService';
import * as Styled from './DepartmentUpdate.styles';
import { IDepartment } from './DepartmentUpdateModal.interface';

export const DepartmentUpdateModal = () => {
  const department: Pick<Partial<IDepartment>, keyof IDepartment> = useReactiveVar(
    modalService.modalData$
  );
  const [updateDepartment, { loading }] = useMutation(UPDATE_DEPARTMENT);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<DepartmentsInput>({
    defaultValues: {
      name: department.name,
    },
    mode: 'onChange',
    resolver: yupResolver(departmentsSchema),
  });

  const onSubmit: SubmitHandler<DepartmentsInput> = (inputs) => {
    updateDepartment({
      variables: {
        id: department.id,
        department: {
          name: inputs.name,
        },
      },
    })
      .catch((err: TError) => {
        console.error(err.message);
      })
      .finally(() => modalService.closeModal());
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <InputText
            name="Department name"
            registerName={FieldNameDepartmentsForm.NAME}
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
            {'Save'}
          </Styled.ButtonSubmit>
        </form>
      )}
    </>
  );
};
