import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues } from 'react-hook-form/dist/types';
import { useProfileFormData } from '../../../../hooks/useProfileFormData';
import { UPDATE_USER } from '../../../../graphql/mutations/updateUser';
import { profileSchema } from '../../../../utils/validationSchema';
import { TError } from '../../../../types/errorTypes';
import { ModalWindow } from '../../../UI/ModalWindow';
import { Spinner } from '../../../Spinner';
import { TFormSubmit } from '../../../../types/formTypes';
import { InputText } from '../../../UI/InputText';
import { FieldNameProfileForm } from '../../../../constants/fieldNameProfileForm';
import { InputSelect } from '../../../UI/InputSelect';
import { IUserAllResult } from '../../../../graphql/types/results/user';
import { IProfileFormInput, IProfileModalProps } from './ProfileModal.types';
import * as Styled from './ProfileModal.styles';

export const ProfileModal: FC<IProfileModalProps> = ({ userId, open, onClose }) => {
  const { loading, userData, positionsData, departmentsData } = useProfileFormData(userId);
  const [updateUser, { loading: updateLoading }] = useMutation<IUserAllResult>(UPDATE_USER);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FieldValues>({
    defaultValues: {
      firstName: userData?.user.profile.first_name || '',
      lastName: userData?.user.profile.last_name || '',
    },
    mode: 'onChange',
    resolver: yupResolver(profileSchema),
  });

  const onSubmit = async (inputs: IProfileFormInput) => {
    try {
      await updateUser({
        variables: {
          id: userId,
          user: {
            profile: {
              first_name: inputs.firstName,
              last_name: inputs.lastName,
              skills: userData?.user.profile.skills,
              languages: userData?.user.profile.languages,
            },
            departmentId: inputs.department,
            positionId: inputs.position,
            cvsIds: userData?.user?.cvs?.map(({ id }) => id) || [],
          },
        },
      });
    } catch (err) {
      console.error((err as TError).message);
    } finally {
      onClose();
    }
  };

  return (
    <ModalWindow title={'Edit profile'} onClose={onClose} open={open}>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmit as TFormSubmit)} autoComplete="off">
          <InputText
            name="First name"
            registerName={FieldNameProfileForm.FIRST_NAME}
            register={register}
            error={!!errors.firstName}
            helperText={errors.firstName?.message as string}
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
            defaultValue={userData?.user.position?.id || ''}
            data={positionsData!.positions}
          />

          <InputSelect
            label={'Department'}
            registerName={FieldNameProfileForm.DEPARTMENT}
            register={register}
            defaultValue={userData?.user.department?.id || ''}
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
