import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useReactiveVar } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useProfileFormData } from '../../../../hooks/useProfileFormData';
import { UPDATE_USER } from '../../../../graphql/mutations/updateUser';
import { profileSchema } from '../../../../utils/validationSchema';
import { TError } from '../../../../types/errorTypes';
import { Spinner } from '../../../Spinner';
import { InputText } from '../../../UI/InputText';
import { FieldNameProfileForm } from '../../../../constants/fieldNameProfileForm';
import { InputSelect } from '../../../UI/InputSelect';
import { IUserAllResult } from '../../../../graphql/types/results/user';
import { modalService } from '../../../../graphql/service/modalService';
import { ModalWindowButton } from '../../../UI/ModalWindowButton';
import { checkDirtyFieldsForm } from '../../../../utils/checkDirtyFieldsForm';
import { IProfileFormInput, IProfileModalUserId } from './ProfileModal.types';

export const ProfileModal = () => {
  const {
    id: userId,
  }: Pick<Partial<IProfileModalUserId>, keyof IProfileModalUserId> = useReactiveVar(
    modalService.modalData$
  );
  const { loading, userData, positionsData, departmentsData } = useProfileFormData(userId!);
  const [updateUser, { loading: updateLoading }] = useMutation<IUserAllResult>(UPDATE_USER);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
  } = useForm<IProfileFormInput>({
    defaultValues: {
      firstName: userData?.user.profile.first_name || '',
      lastName: userData?.user.profile.last_name || '',
      department: userData?.user.department?.id || '',
      position: userData?.user.position?.id || '',
    },
    mode: 'onChange',
    resolver: yupResolver(profileSchema),
  });

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
            name="First name"
            registerName={FieldNameProfileForm.FIRST_NAME}
            register={register}
            error={!!errors.firstName}
            helperText={errors.firstName?.message || ''}
          />

          <InputText
            name="Last name"
            registerName={FieldNameProfileForm.LAST_NAME}
            register={register}
            error={!!errors.lastName}
            helperText={errors.lastName?.message || ''}
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

          <ModalWindowButton
            loading={updateLoading}
            isValid={checkDirtyFieldsForm(dirtyFields) && isValid}
          />
        </form>
      )}
    </>
  );
};
