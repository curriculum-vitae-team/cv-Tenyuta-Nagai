import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useReactiveVar } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useProfileFormData } from '../../../../hooks/useProfileFormData';
import { UPDATE_USER } from '../../../../graphql/mutations/updateUser';
import { profileSchema } from '../../../../utils/validationSchema';
import { TError } from '../../../../types/errorTypes';
import { Spinner } from '../../../Spinner';
import { InputSelect } from '../../../UI/InputSelect';
import { IUserAllResult } from '../../../../graphql/types/results/user';
import { modalService } from '../../../../graphql/service/modalService';
import { ModalWindowButton } from '../../../UI/ModalWindowButton';
import {
  IProfileFormInput,
  IProfileModalUserId,
} from '../../EmployeesProfilePage/ProfileModal/ProfileModal.types';
import { FieldNameEmployeeSkillForm } from '../../../../constants/fieldNameEmployeeSkillForm';

export const SkillsModal = () => {
  const {
    id: userId,
  }: Pick<Partial<IProfileModalUserId>, keyof IProfileModalUserId> = useReactiveVar(
    modalService.modalData$
  );
  const { loading, userData, skillsData } = useProfileFormData(userId!);
  const [updateUser, { loading: updateLoading }] = useMutation<IUserAllResult>(UPDATE_USER);
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<IProfileFormInput>({
    mode: 'onChange',
    resolver: yupResolver(profileSchema),
  });

  const onSubmit: SubmitHandler<IProfileFormInput> = async (inputs) => {
    try {
      await updateUser({
        variables: {
          id: userId,
          user: {
            profile: {
              first_name: userData?.user.profile.first_name || '',
              last_name: userData?.user.profile.last_name || '',
              skills: [
                userData?.user.profile.skills,
                { skill_name: inputs.skill_name, mastery: inputs.mastery },
              ],
              languages: userData?.user.profile.languages,
            },
            departmentId: userData?.user?.department?.id,
            positionId: userData?.user?.position?.id,
            cvsIds: userData?.user?.cvs?.map(({ id }) => id) || [],
          },
        },
      });
    } catch (err) {
      console.error((err as TError).message);
    } finally {
      modalService.closeModal();
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <InputSelect
            label={'Skills'}
            registerName={FieldNameEmployeeSkillForm.SKILL_NAME}
            register={register}
            data={skillsData!.skills}
          />

          <ModalWindowButton loading={updateLoading} isValid={isValid} />
        </form>
      )}
    </>
  );
};
