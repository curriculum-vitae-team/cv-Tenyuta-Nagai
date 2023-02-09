import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TError } from '../../../../types/errorTypes';
import { departmentsSchema } from '../../../../utils/validationSchema';
import { Spinner } from '../../../Spinner';
import { InputText } from '../../../UI/InputText';
import { FieldNameDepartmentsForm } from '../../../../constants/fieldNameDepartmentsForm';
import { CreateDepartmentResult } from '../../../../graphql/types/results/department';
import { DepartmentsInput } from '../../../../graphql/types/inputs/department';
import { CREATE_DEPARTMENT } from '../../../../graphql/mutations/departments';
import { updateCacheAfterCreatingDepartment } from '../../../../graphql/cache/departments';
import { modalService } from '../../../../graphql/service/modalService';
import * as Styled from './DepartmentCreateModal.styles';

export const DepartmentsCreateModal = () => {
  const [createDepartment, { loading }] = useMutation(CREATE_DEPARTMENT);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<DepartmentsInput>({
    mode: 'onChange',
    resolver: yupResolver(departmentsSchema),
  });

  const onSubmit: SubmitHandler<DepartmentsInput> = (inputs) => {
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
