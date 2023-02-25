import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FieldNameEmployeesForm } from '../../../../constants/FieldNameEmployeesForm';
import { CREATE_USER } from '../../../../graphql/mutations/createUser';
import { updateCacheAfterCreatingUser } from '../../../../graphql/cache/createUser';
import { useEmployeesFormData } from '../../../../hooks/useEmployeesFormData';
import { TError } from '../../../../types/errorTypes';
import { employeesSchema } from '../../../../utils/validationSchema';
import { Spinner } from '../../../Spinner';
import { InputSelect } from '../../../UI/InputSelect';
import { InputText } from '../../../UI/InputText';
import { CreateUserResult } from '../../../../graphql/types/results/user';
import { modalService } from '../../../../graphql/service/modalService';
import { ModalWindowButton } from '../../../UI/ModalWindowButton';
import { IEmployeesFormInput } from './EmployeesModal.interface';

export const EmployeesModal = () => {
  const { loading, positionsData, departmentsData, rolesData } = useEmployeesFormData();
  const [createUser, { loading: updateLoading }] = useMutation<CreateUserResult>(CREATE_USER);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<IEmployeesFormInput>({
    resolver: yupResolver(employeesSchema),
  });
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<IEmployeesFormInput> = (inputs) => {
    createUser({
      variables: {
        user: {
          auth: {
            email: inputs.email,
            password: inputs.password,
          },
          profile: {
            first_name: inputs.firstName,
            last_name: inputs.lastName,
            skills: [],
            languages: [],
          },
          departmentId: inputs.department,
          positionId: inputs.position,
          cvsIds: [],
          role: inputs.role,
        },
      },
      update(cache, { data }) {
        updateCacheAfterCreatingUser(cache, inputs.role, data!);
      },
    })
      .catch((err) => console.error((err as TError).message))
      .finally(() => modalService.closeModal());
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <InputText
            name={t('Email')}
            registerName={FieldNameEmployeesForm.EMAIL}
            register={register}
            error={!!errors.email}
            helperText={t(errors.email?.message as string) || ''}
          />

          <InputText
            name={t('Password')}
            type="password"
            registerName={FieldNameEmployeesForm.PASSWORD}
            register={register}
            error={!!errors.password?.message}
            helperText={t(errors.password?.message as string) || ''}
          />

          <InputText
            name={t('First name')}
            registerName={FieldNameEmployeesForm.FIRST_NAME}
            register={register}
            error={!!errors.firstName}
            helperText={t(errors.firstName?.message as string) || ''}
          />

          <InputText
            name={t('Last name')}
            registerName={FieldNameEmployeesForm.LAST_NAME}
            register={register}
            error={!!errors.lastName}
            helperText={t(errors.lastName?.message as string) || ''}
          />

          <InputSelect
            label={t('Position')}
            registerName={FieldNameEmployeesForm.POSITION}
            register={register}
            defaultValue={''}
            data={positionsData!.positions}
          />

          <InputSelect
            label={t('Department')}
            registerName={FieldNameEmployeesForm.DEPARTMENT}
            register={register}
            defaultValue={''}
            data={departmentsData!.departments}
          />

          <InputSelect
            label={t('User role')}
            registerName={FieldNameEmployeesForm.ROLE}
            register={register}
            defaultValue={'employee'}
            data={rolesData}
          />

          <ModalWindowButton loading={updateLoading} isValid={!isSubmitted || isValid} />
        </form>
      )}
    </>
  );
};
