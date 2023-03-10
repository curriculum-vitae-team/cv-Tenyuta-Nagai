import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TError } from '../../../../types/errorTypes';
import { departmentsSchema } from '../../../../utils/validationSchema';
import { InputText } from '../../../UI/InputText';
import { FieldNameDepartmentsForm } from '../../../../constants/fieldNameDepartmentsForm';
import { CreateDepartmentResult } from '../../../../graphql/types/results/department';
import { DepartmentsInput } from '../../../../graphql/types/inputs/department';
import { CREATE_DEPARTMENT } from '../../../../graphql/mutations/departments';
import { updateCacheAfterCreatingDepartment } from '../../../../graphql/cache/departments';
import { modalService } from '../../../../graphql/service/modalService';
import { ModalWindowButton } from '../../../UI/ModalWindowButton';

export const DepartmentsCreateModal = () => {
  const { t } = useTranslation();
  const [createDepartment, { loading }] = useMutation<CreateDepartmentResult>(CREATE_DEPARTMENT);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<DepartmentsInput>({
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
        updateCacheAfterCreatingDepartment(cache, data!);
      },
    })
      .catch((err: TError) => console.error(err.message))
      .finally(() => modalService.closeModal());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <InputText
        name={t('Department name')}
        registerName={FieldNameDepartmentsForm.NAME}
        register={register}
        error={!!errors.name}
        helperText={t(errors.name?.message as string) || ''}
      />

      <ModalWindowButton loading={loading} isValid={!isSubmitted || isValid} />
    </form>
  );
};
