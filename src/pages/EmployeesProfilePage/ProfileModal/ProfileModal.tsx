import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Spinner } from '../../../components/Spinner';
import { ModalWindow } from '../../../components/UI/ModalWindow';
import { FieldNameProfileForm } from '../../../constants/fieldNameProfileForm';
import { useProfileFormData } from '../../../hooks/useProfileFormData';
import { UPDATE_USER } from '../../../graphql/mutations/updateUser';
import { IUserAllResult } from '../../../interfaces/IUser.interface';
import { notificationService } from '../../../graphql/notification/notificationService';
import { profileSchema } from '../../../utils/validationSchema';
import { IProfileFormInput, IProfileModalProps } from './ProfileModal.types';
import * as Styled from './ProfileModal.styles';
import { InputText } from './InputText/InputText';
import { InputSelect } from './InputSelect/InputSelect';

export const ProfileModal: FC<IProfileModalProps> = ({ userId, open, onClose }) => {
  const { loading, error, userData, positionsData, departmentsData } = useProfileFormData(userId);
  const [updateUser, { loading: updateLoading }] = useMutation<IUserAllResult>(UPDATE_USER);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IProfileFormInput>({
    defaultValues: {
      firstName: userData?.user.profile.first_name || '',
      lastName: userData?.user.profile.last_name || '',
    },
    mode: 'onChange',
    resolver: yupResolver(profileSchema),
  });

  if (error) {
    onClose();
  }

  const onSubmit = async (inputs: IProfileFormInput) => {
    try {
      const res = await updateUser({
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
            cvsIds: [],
          },
        },
      });

      if (res) {
        notificationService.openSuccessAlert('Saved');
        onClose();
      }
    } catch (err) {
      console.log(err);
      onClose();
    }
  };

  return (
    <ModalWindow title={'Edit profile'} onClose={onClose} open={open}>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <InputText
            name="First name"
            registerName={FieldNameProfileForm.FIRST_NAME}
            register={register}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />

          <InputText
            name="Last name"
            registerName={FieldNameProfileForm.LAST_NAME}
            register={register}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
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