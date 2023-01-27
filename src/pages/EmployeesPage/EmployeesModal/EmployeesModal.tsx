import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Spinner } from '../../../components/Spinner';
import { InputSelect } from '../../../components/UI/InputSelect';
import { InputText } from '../../../components/UI/InputText';
import { CREATE_USER } from '../../../graphql/mutations/createUser/createUser';

import { IUserAllResult } from '../../../interfaces/IUser.interface';
import { profileSchema } from '../../../utils/validationSchema';
import { ModalWindow } from '../../../components/UI/ModalWindow';
import { IProfileFormInput } from '../../EmployeesProfilePage/ProfileModal/ProfileModal.types';
import { FieldNameProfileForm } from '../../../constants/fieldNameProfileForm';
import { TFormSubmit } from '../../../types/formTypes';
import { useEmployeesFormData } from '../../../hooks/useEmployeesFormData';
import { TError } from '../../../types/errorTypes';
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
    resolver: yupResolver(profileSchema),
  });

  if (error) {
    onClose();
  }

  const onSubmit = (inputs: IProfileFormInput) => {
    createUser({
      variables: {
        user: {
          auth: {
            email: 'test@gm.com',
            password: ' ',
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
    })
      .catch((err) => console.error((err as TError).message))
      .finally(() => onClose());
  };

  return (
    <ModalWindow title={'Save user'} onClose={onClose} open={open}>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmit as TFormSubmit)} autoComplete="off">
          <InputText
            name="First name"
            registerName={FieldNameProfileForm.FIRST_NAME}
            register={register}
            error={!!errors.firstName}
          />

          <InputText
            name="Last name"
            registerName={FieldNameProfileForm.LAST_NAME}
            register={register}
            error={!!errors.lastName}
            helperText={errors.lastName?.message as string}
          />

          <InputSelect
            label={'Position'}
            registerName={FieldNameProfileForm.POSITION}
            register={register}
            defaultValue={''}
            data={positionsData!.positions}
          />

          <InputSelect
            label={'Department'}
            registerName={FieldNameProfileForm.DEPARTMENT}
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
