import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useReactiveVar } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { InputText } from '../../../UI/InputText';
import { departmentsSchema } from '../../../../utils/validationSchema';
import { TError } from '../../../../types/errorTypes';
import { UPDATE_DEPARTMENT } from '../../../../graphql/mutations/departments';
import { FieldNameDepartmentsForm } from '../../../../constants/fieldNameDepartmentsForm';
import { DepartmentsInput } from '../../../../graphql/types/inputs/department';
import { modalService } from '../../../../graphql/service/modalService';
import { ModalWindowButton } from '../../../UI/ModalWindowButton';
import { checkDirtyFieldsForm } from '../../../../utils/checkDirtyFieldsForm';
import { IDepartment } from './DepartmentUpdateModal.interface';

export const DepartmentUpdateModal = () => {
  const department: Pick<Partial<IDepartment>, keyof IDepartment> = useReactiveVar(
    modalService.modalData$
  );
  const { t } = useTranslation();
  const [updateDepartment, { loading }] = useMutation(UPDATE_DEPARTMENT);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
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

      <ModalWindowButton loading={loading} isValid={checkDirtyFieldsForm(dirtyFields) && isValid} />
    </form>
  );
};
