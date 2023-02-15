import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useReactiveVar } from '@apollo/client';
import { useProfileFormData } from '../../../../hooks/useProfileFormData';
import { UPDATE_USER } from '../../../../graphql/mutations/updateUser';
import { TError } from '../../../../types/errorTypes';
import { Spinner } from '../../../Spinner';
import { modalService } from '../../../../graphql/service/modalService';
import { ModalWindowButton } from '../../../UI/ModalWindowButton';
import { FieldNameEmployeeSkillForm } from '../../../../constants/fieldNameEmployeeSkillForm';
import { createArrayForSkills } from '../../../../utils/createArrayForSkills';
import { InputSelectEmployeePage } from '../../../UI/InputSelectEmployee';
import { notificationService } from '../../../../graphql/service/notification/notificationService';
import { ISkillsFormInput, ISkillsModalUserId } from './SkillsModal.types';

export const SkillsModal = () => {
  const {
    id: userId,
  }: Pick<Partial<ISkillsModalUserId>, keyof ISkillsModalUserId> = useReactiveVar(
    modalService.modalData$
  );
  const { loading, userData, skillsData, skillMasteryData } = useProfileFormData(userId!);

  const [updateUser, { loading: updateLoading }] = useMutation(UPDATE_USER);
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<ISkillsFormInput>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ISkillsFormInput> = (inputs) => {
    if (
      createArrayForSkills(userData?.user.profile.skills)
        .map(({ skill_name }) => skill_name)
        .includes(inputs.skillName)
    ) {
      notificationService.openErrorAlert('Skill already exists');
      modalService.closeModal();
      return;
    }
    updateUser({
      variables: {
        id: userId,
        user: {
          profile: {
            first_name: userData?.user.profile.first_name || '',
            last_name: userData?.user.profile.last_name || '',
            skills: [
              { skill_name: inputs.skillName, mastery: inputs.mastery },
              ...createArrayForSkills(userData?.user.profile.skills),
            ],
          },
          departmentId: userData?.user?.department?.id || '',
          positionId: userData?.user?.position?.id || '',
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
          <InputSelectEmployeePage
            sx={{ minWidth: '150px' }}
            label={'Skill'}
            registerName={FieldNameEmployeeSkillForm.SKILL_NAME}
            register={register}
            data={skillsData!.skills}
            defaultValue={''}
          />

          <InputSelectEmployeePage
            sx={{ minWidth: '150px' }}
            label={'Mastery'}
            registerName={FieldNameEmployeeSkillForm.MASTERY}
            register={register}
            data={skillMasteryData}
            defaultValue={''}
          />

          <ModalWindowButton loading={updateLoading} isValid={isValid} />
        </form>
      )}
    </>
  );
};
