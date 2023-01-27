import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Spinner } from '../../../components/Spinner';
import { InputSelect } from '../../../components/UI/InputSelect';
import { InputText } from '../../../components/UI/InputText';
import { CREATE_USER } from '../../../graphql/mutations/createUser/createUser';
import { IUserAllResult } from '../../../interfaces/IUser.interface';
import { employeesSchema } from '../../../utils/validationSchema';
import { ModalWindow } from '../../../components/UI/ModalWindow';
import { TFormSubmit } from '../../../types/formTypes';
import { useEmployeesFormData } from '../../../hooks/useEmployeesFormData';
import { TError } from '../../../types/errorTypes';
import { CreateUserResult } from '../../../graphql/mutations/createUser/createUser.types';
import { updateCacheAfterCreatingUser } from '../../../graphql/mutations/createUser/createUserUpdateCache';
import { FieldNameEmployeesForm } from '../../../constants/FieldNameEmployeesForm';
import { IEmployeesFormInput, IEmployeesModalProps } from './EmployeesModal.interface';
import * as Styled from './EmployeesModal.styles';

export const EmployeesModal: FC<IEmployeesModalProps> = ({ open, onClose }) => {
  const { loading, error, positionsData, departmentsData } = useEmployeesFormData();
  const [createUser, { loading: updateLoading }] = useMutation<IUserAllResult>(CREATE_USER);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(employeesSchema),
  });

  if (error) {
    onClose();
  }

  const onSubmit = (inputs: IEmployeesFormInput) => {
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
          role: 'employee',
        },
      },
      update(cache, { data }) {
        updateCacheAfterCreatingUser(cache, (data as unknown) as CreateUserResult);
      },
    })
      .catch((err) => console.error((err as TError).message))
      .finally(() => onClose());
  };

  return (
    <ModalWindow title={'Create new user'} onClose={onClose} open={open}>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmit as TFormSubmit)} autoComplete="off">
          <InputText
            name="Email"
            registerName={FieldNameEmployeesForm.EMAIL}
            register={register}
            error={!!errors.email}
            helperText={errors.email?.message as string}
          />

          <InputText
            name="Password"
            type="password"
            registerName={FieldNameEmployeesForm.PASSWORD}
            register={register}
            error={!!errors.password?.message}
            helperText={errors.password?.message as string}
          />

          <InputText
            name="First name"
            registerName={FieldNameEmployeesForm.FIRST_NAME}
            register={register}
            error={!!errors.firstName}
            helperText={errors.firstName?.message as string}
          />

          <InputText
            name="Last name"
            registerName={FieldNameEmployeesForm.LAST_NAME}
            register={register}
            error={!!errors.lastName}
            helperText={errors.lastName?.message as string}
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

          <Styled.ButtonSubmit
            loading={updateLoading}
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
