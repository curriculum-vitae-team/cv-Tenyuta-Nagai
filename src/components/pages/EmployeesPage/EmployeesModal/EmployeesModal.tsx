import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FieldNameEmployeesForm } from '../../../../constants/FieldNameEmployeesForm';
import { CREATE_USER } from '../../../../graphql/mutations/createUser';
import { updateCacheAfterCreatingUser } from '../../../../graphql/cache/createUser';
import { useEmployeesFormData } from '../../../../hooks/useEmployeesFormData';
import { TError } from '../../../../types/errorTypes';
import { employeesSchema } from '../../../../utils/validationSchema';
import { Spinner } from '../../../Spinner';
import { InputSelect } from '../../../UI/InputSelect';
import { InputText } from '../../../UI/InputText';
import { CreateUserResult, IUserAllResult } from '../../../../graphql/types/results/user';
import { modalService } from '../../../../graphql/service/modalService';
import { ModalWindowButton } from '../../../UI/ModalWindowButton';
import { GET_ALL_USERS } from '../../../../graphql/queries/users';
import { IEmployeesFormInput } from './EmployeesModal.interface';

export const EmployeesModal = () => {
  const { loading, positionsData, departmentsData, rolesData } = useEmployeesFormData();
  const [createUser, { loading: updateLoading }] = useMutation<IUserAllResult>(CREATE_USER, {
    refetchQueries: [{ query: GET_ALL_USERS }, 'getUsers'],
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEmployeesFormInput>({
    resolver: yupResolver(employeesSchema),
  });

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
        updateCacheAfterCreatingUser(cache, inputs.role, (data as unknown) as CreateUserResult);
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
            name="Email"
            registerName={FieldNameEmployeesForm.EMAIL}
            register={register}
            error={!!errors.email}
            helperText={errors.email?.message || ''}
          />

          <InputText
            name="Password"
            type="password"
            registerName={FieldNameEmployeesForm.PASSWORD}
            register={register}
            error={!!errors.password?.message}
            helperText={errors.password?.message || ''}
          />

          <InputText
            name="First name"
            registerName={FieldNameEmployeesForm.FIRST_NAME}
            register={register}
            error={!!errors.firstName}
            helperText={errors.firstName?.message || ''}
          />

          <InputText
            name="Last name"
            registerName={FieldNameEmployeesForm.LAST_NAME}
            register={register}
            error={!!errors.lastName}
            helperText={errors.lastName?.message || ''}
          />

          <InputSelect
            label={'Position'}
            registerName={FieldNameEmployeesForm.POSITION}
            register={register}
            defaultValue={''}
            data={positionsData!.positions}
          />

          <InputSelect
            label={'Department'}
            registerName={FieldNameEmployeesForm.DEPARTMENT}
            register={register}
            defaultValue={''}
            data={departmentsData!.departments}
          />

          <InputSelect
            label={'User role'}
            registerName={FieldNameEmployeesForm.ROLE}
            register={register}
            defaultValue={'employee'}
            data={rolesData}
          />

          <ModalWindowButton loading={updateLoading} />
        </form>
      )}
    </>
  );
};
