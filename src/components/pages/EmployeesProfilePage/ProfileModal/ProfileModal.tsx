import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useReactiveVar } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useProfileFormData } from '../../../../hooks/useProfileFormData';
import { UPDATE_USER } from '../../../../graphql/mutations/updateUser';
import { profileSchema } from '../../../../utils/validationSchema';
import { TError } from '../../../../types/errorTypes';
import { Spinner } from '../../../Spinner';
import { InputText } from '../../../UI/InputText';
import { FieldNameProfileForm } from '../../../../constants/fieldNameProfileForm';
import { InputSelect } from '../../../UI/InputSelect';
import { IUpdateUserResult } from '../../../../graphql/types/results/user';
import { modalService } from '../../../../graphql/service/modalService';
import { ModalWindowButton } from '../../../UI/ModalWindowButton';
import { authService } from '../../../../graphql/service/authentication/authService';
import { IProfileFormInput, IProfileModalUserId } from './ProfileModal.types';

export const ProfileModal = () => {
  const {
    id: userId,
  }: Pick<Partial<IProfileModalUserId>, keyof IProfileModalUserId> = useReactiveVar(
    modalService.modalData$
  );
  const { loading, userData, positionsData, departmentsData } = useProfileFormData(userId!);
  const [updateUser, { loading: updateLoading }] = useMutation<IUpdateUserResult>(UPDATE_USER);
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
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<IProfileFormInput> = (inputs) => {
    updateUser({
      variables: {
        id: userId,
        user: {
          profile: {
            first_name: inputs.firstName,
            last_name: inputs.lastName,
          },
          departmentId: inputs.department,
          positionId: inputs.position,
          cvsIds: userData?.user?.cvs?.map(({ id }) => id) || [],
        },
      },
    })
      .then((res) =>
        authService.writeUserFullName(res.data?.updateUser.profile.full_name || undefined)
      )
      .catch((err: TError) => console.error(err.message))
      .finally(() => modalService.closeModal());
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <InputText
            name={t('First name')}
            registerName={FieldNameProfileForm.FIRST_NAME}
            register={register}
            error={!!errors.firstName}
            helperText={t(errors.firstName?.message as string) || ''}
          />

          <InputText
            name={t('Last name')}
            registerName={FieldNameProfileForm.LAST_NAME}
            register={register}
            error={!!errors.lastName}
            helperText={t(errors.lastName?.message as string) || ''}
          />

          <InputSelect
            label={t('Position')}
            registerName={FieldNameProfileForm.POSITION}
            register={register}
            defaultValue={userData?.user.position?.id || ''}
            data={positionsData!.positions}
          />

          <InputSelect
            label={t('Department')}
            registerName={FieldNameProfileForm.DEPARTMENT}
            register={register}
            defaultValue={userData?.user.department?.id || ''}
            data={departmentsData!.departments}
          />

          <ModalWindowButton loading={updateLoading} isValid={isValid} />
        </form>
      )}
    </>
  );
};
